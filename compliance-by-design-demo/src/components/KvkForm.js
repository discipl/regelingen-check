import React, { Component } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import DateControl from "./DateControl";

class KvkForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kvkNumber: "69599084",
      derivedFacts: null,
    };
  }

  async query(event) {
    event.preventDefault();
    const result = await fetch(
      "/api/v2/testprofile/companies?kvkNumber=" + this.state.kvkNumber
    );
    const data = await result.json();
    console.log(data);

    const companyInfo = data.data.items[0];

    const derivedFacts = {};
    // Default facts
    derivedFacts[
      "[verzoek tegemoetkoming in de schade geleden door de maatregelen ter bestrijding van de verdere verspreiding van COVID-19]"
    ] = true;

    derivedFacts[
      "[datum van inschrijving van onderneming in het KVK Handelsregister]"
    ] = companyInfo.registrationDate;
    derivedFacts["[datum van oprichting van onderneming]"] =
      companyInfo.foundationDate;

    derivedFacts[
      "[aantal personen dat werkt bij onderneming blijkend uit de inschrijving in het handelsregister op 15 maart 2020]"
    ] = companyInfo.employees;

    // TODO: Check there is exactly one main activity SBI code
    const mainSbi = companyInfo.businessActivities
      .filter((activity) => activity.isMainSbi)
      .map((activity) => {
        const sbiWithoutDots = activity.sbiCode;
        if (sbiWithoutDots.length > 4) {
          return (
            sbiWithoutDots.substring(0, 2) +
            "." +
            sbiWithoutDots.substring(2, 4) +
            "." +
            sbiWithoutDots.substring(4)
          );
        }
        if (sbiWithoutDots.length > 2) {
          return (
            sbiWithoutDots.substring(0, 2) + "." + sbiWithoutDots.substring(2)
          );
        }

        return sbiWithoutDots;
      });

    // TODO: Remove hardcoded, because sample in API doesn't have right sbi code
    derivedFacts["[SBI-code hoofdactiviteit onderneming]"] = "47.19.2";

    const locatedInTheNetherlands =
      companyInfo.addresses.filter(
        (address) =>
          address.type === "vestigingsadres" && address.country === "Nederland"
      ).length > 0;

    derivedFacts[
      "[in Nederland gevestigde onderneming als bedoeld in artikel 5 van de Handelsregisterwet 2007]"
    ] = locatedInTheNetherlands;

    this.setState({
      derivedFacts: derivedFacts,
    });
  }

  handleChange(event) {
    this.setState({ kvkNumber: event.target.value });
  }

  handleFactUpdate(fact) {
    return function (event) {
      const newState = { derivedFacts: this.state.derivedFacts };
      const newValue = event.hasOwnProperty("target")
        ? event.target.value
        : event;

      console.log("Updating fact", fact, newValue);

      newState.derivedFacts[fact] = newValue;
      this.setState(newState);
    };
  }

  returnDerivedFacts() {
    if (this.props.handleDerivedFacts) {
      this.props.handleDerivedFacts(this.state.derivedFacts);
    }
  }

  render() {
    if (this.state.derivedFacts) {
      return (
        <Container>
          <Form onSubmit={this.returnDerivedFacts.bind(this)}>
            <p>
              We hebben de volgende gegevens voor uw bedrijf opgehaald.
              Controlleer ze goed en pas aan wat niet klopt.
            </p>
            <p>{JSON.stringify(this.state.derivedFacts)}</p>
            <Form.Group controlId="datumOprichting">
              <Form.Label>Uw bedrijf is opgericht op</Form.Label>
              <DateControl
                value={
                  this.state.derivedFacts[
                    "[datum van oprichting van onderneming]"
                  ]
                }
                onChange={this.handleFactUpdate(
                  "[datum van oprichting van onderneming]"
                ).bind(this)}
              ></DateControl>
            </Form.Group>
            <Button variant="primary" type="sumbit">
              Deze gegevens zijn correct
            </Button>
          </Form>
        </Container>
      );
    }
    return (
      <Container>
        <Form onSubmit={this.query.bind(this)}>
          <p>
            We hebben een aantal gegevens nodig over uw bedrijf om te kijken of
            u in aanmerking komt voor een van de steunregelingen van de
            overheid.
          </p>
          <p>
            Door uw KvK nummer in te vullen kunnen wij deze gegevens automatisch
            ophalen. Anders dient u ze zelf in te vullen.
          </p>
          <Form.Group controlId="kvkNummer">
            <Form.Label>Wat is uw KvK nummer?</Form.Label>
            <Form.Control
              type="number"
              placeholder="Vul uw KVK Nummer in"
              value={this.state.kvkNumber}
              onChange={this.handleChange.bind(this)}
            ></Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Gegevens ophalen
          </Button>{" "}
          <Button variant="outline-secondary">Zelf gegevens invullen</Button>
        </Form>
      </Container>
    );
  }
}

export default KvkForm;
