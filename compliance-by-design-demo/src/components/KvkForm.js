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
      kvkNumberEntered: false,
      derivedFacts: null,
    };
  }

  async fetchFactsFromApi(event) {
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
    derivedFacts["[SBI-code hoofdactiviteit onderneming]"] = "47192";

    const locatedInTheNetherlands =
      companyInfo.addresses.filter(
        (address) =>
          address.type === "vestigingsadres" && address.country === "Nederland"
      ).length > 0;

    derivedFacts[
      "[in Nederland gevestigde onderneming als bedoeld in artikel 5 van de Handelsregisterwet 2007]"
    ] = locatedInTheNetherlands;

    this.setState({
      kvkNumberEntered: true,
      derivedFacts,
    });
  }

  dontFetchFromApi() {
    const derivedFacts = {};
    // Default facts
    derivedFacts[
      "[verzoek tegemoetkoming in de schade geleden door de maatregelen ter bestrijding van de verdere verspreiding van COVID-19]"
    ] = true;

    derivedFacts[
      "[datum van inschrijving van onderneming in het KVK Handelsregister]"
    ] = "";
    derivedFacts["[datum van oprichting van onderneming]"] = "";

    derivedFacts[
      "[aantal personen dat werkt bij onderneming blijkend uit de inschrijving in het handelsregister op 15 maart 2020]"
    ] = 0;

    derivedFacts["[SBI-code hoofdactiviteit onderneming]"] = "";
    derivedFacts[
      "[in Nederland gevestigde onderneming als bedoeld in artikel 5 van de Handelsregisterwet 2007]"
    ] = false;

    this.setState({
      kvkNumberEntered: true,
      derivedFacts,
    });
  }

  handleChange(event) {
    this.setState({ kvkNumber: event.target.value });
  }

  handleFactUpdate(fact) {
    return function (event) {
      console.log(event.target);
      const newState = { derivedFacts: this.state.derivedFacts };
      const newValue = event.hasOwnProperty("target")
        ? event.target.value
        : event;

      console.log("Updating fact", fact, newValue);

      newState.derivedFacts[fact] = newValue;
      this.setState(newState);
    };
  }

  handleCheckUpdate(fact) {
    const handleUpdate = this.handleFactUpdate(fact).bind(this);
    return function (event) {
      handleUpdate(event.target.checked);
    };
  }

  returnDerivedFacts(event) {
    event.preventDefault();

    if (this.props.handleDerivedFacts) {
      this.props.handleDerivedFacts(this.state.derivedFacts);
    }
  }

  render() {
    if (this.state.kvkNumberEntered) {
      return (
        <Container>
          <Form onSubmit={this.returnDerivedFacts.bind(this)}>
            <h2>Controleer uw gegevens</h2>
            <p>
              We hebben de volgende gegevens voor uw bedrijf opgehaald.
              Controlleer ze goed en pas aan wat niet klopt.
            </p>
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

            <Form.Group controlId="datumInschrijving">
              <Form.Label>
                Uw bedrijf is ingeschreven bij de Kamer van Koophandel op
              </Form.Label>
              <DateControl
                value={
                  this.state.derivedFacts[
                    "[datum van inschrijving van onderneming in het KVK Handelsregister]"
                  ]
                }
                onChange={this.handleFactUpdate(
                  "[datum van inschrijving van onderneming in het KVK Handelsregister]"
                ).bind(this)}
              ></DateControl>
            </Form.Group>

            <Form.Group controlId="aantalWerknemers">
              <Form.Label>
                Op 15 maart 2020 waren het volgende aantal mensen werkzaam bij
                uw onderneming
              </Form.Label>
              <Form.Control
                type="number"
                value={
                  this.state.derivedFacts[
                    "[aantal personen dat werkt bij onderneming blijkend uit de inschrijving in het handelsregister op 15 maart 2020]"
                  ]
                }
                onChange={this.handleFactUpdate(
                  "[aantal personen dat werkt bij onderneming blijkend uit de inschrijving in het handelsregister op 15 maart 2020]"
                ).bind(this)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="sbiCode">
              <Form.Label>
                SBI-code van de hoofdactiviteit van uw onderneming
              </Form.Label>
              <Form.Control
                value={
                  this.state.derivedFacts[
                    "[SBI-code hoofdactiviteit onderneming]"
                  ]
                }
                onChange={this.handleFactUpdate(
                  "[SBI-code hoofdactiviteit onderneming]"
                ).bind(this)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="gevestigdInNederland">
              <Form.Check
                type="checkbox"
                label="Uw onderneming is gevestigd in Nederland"
                checked={
                  this.state.derivedFacts[
                    "[in Nederland gevestigde onderneming als bedoeld in artikel 5 van de Handelsregisterwet 2007]"
                  ]
                }
                onChange={this.handleCheckUpdate(
                  "[in Nederland gevestigde onderneming als bedoeld in artikel 5 van de Handelsregisterwet 2007]"
                ).bind(this)}
              />
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
        <Form onSubmit={this.fetchFactsFromApi.bind(this)}>
          <h2>KvK gegevens van uw bedrijf</h2>
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
          <Button
            variant="outline-secondary"
            onClick={this.dontFetchFromApi.bind(this)}
          >
            Zelf gegevens invullen
          </Button>
        </Form>
      </Container>
    );
  }
}

export default KvkForm;
