import React, { Component } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import DateControl from "./DateControl";

// Facts that are always assumed to be true.
const INITIAL_FACTS = {
  "[verzoek tegemoetkoming in de schade geleden door de maatregelen ter bestrijding van de verdere verspreiding van COVID-19]": true,
  "[gemeente]": true,
  "[gedupeerde onderneming]": true,
  "[Minister van Economische Zaken en Klimaat]": true,
  "[verzoek om aanvullende uitkering voor levensonderhoud op grond van de Tozo]": true,
  "[verzoek om lening voor bedrijfskapitaal op grond van de Tozo]": true,
};

class KvkForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kvkNumberEntered: false,
      kvkNumber: "",
      businessName: "",
      derivedFacts: null,
    };
  }

  async fetchFactsFromApi(event) {
    event.preventDefault();
    const result = await fetch("/api/companies/" + this.state.kvkNumber);
    const data = await result.json();
    console.log(data);

    const derivedFacts = {
      ...INITIAL_FACTS,
      "[datum van inschrijving van onderneming in het KVK Handelsregister]":
        data.registrationDate,
      "[datum van oprichting van onderneming]": data.foundationDate,
      "[aantal personen dat werkt bij onderneming blijkend uit de inschrijving in het handelsregister op 15 maart 2020]":
        data.employees,
      "[SBI-code hoofdactiviteit onderneming]": data.mainSbi,
      "[in Nederland gevestigde onderneming als bedoeld in artikel 5 van de Handelsregisterwet 2007]":
        data.locatedInTheNetherlands,
    };

    this.setState({
      kvkNumberEntered: true,
      businessName: data.businessName,
      derivedFacts,
    });
  }

  dontFetchFromApi() {
    const derivedFacts = {
      ...INITIAL_FACTS,
      "[datum van inschrijving van onderneming in het KVK Handelsregister]": "",
      "[datum van oprichting van onderneming]": "",
      "[aantal personen dat werkt bij onderneming blijkend uit de inschrijving in het handelsregister op 15 maart 2020]": 0,
      "[SBI-code hoofdactiviteit onderneming]": "",
      "[in Nederland gevestigde onderneming als bedoeld in artikel 5 van de Handelsregisterwet 2007]": false,
    };

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

  handleBusinessNameUpdate(event) {
    this.setState({ businessName: event.target.value });
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
              Controleer ze goed en pas aan wat niet klopt.
            </p>
            <Form.Group controlId="bedrijfsNaam">
              <Form.Label>Naam van uw bedrijf</Form.Label>
              <Form.Control
                value={this.state.businessName}
                onChange={this.handleBusinessNameUpdate.bind(this)}
              ></Form.Control>
            </Form.Group>

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
