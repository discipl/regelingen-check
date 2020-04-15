import React, { Component } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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

  returnDerivedFacts() {
    if (this.props.handleDerivedFacts) {
      this.props.handleDerivedFacts(this.state.derivedFacts);
    }
  }

  render() {
    if (this.state.derivedFacts) {
      return (
        <div>
          <p>{JSON.stringify(this.state.derivedFacts)}</p>
          <Button
            variant="primary"
            onClick={this.returnDerivedFacts.bind(this)}
          >
            Confirm
          </Button>
        </div>
      );
    }
    return (
      <Form onSubmit={this.query.bind(this)}>
        <Form.Group controlId="kvkNummer">
          <Form.Label>KvK Nummer</Form.Label>
          <Form.Control
            type="number"
            placeholder="Vul uw KVK Nummer in"
            value={this.state.kvkNumber}
            onChange={this.handleChange.bind(this)}
          ></Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Gegevens opsturen
        </Button>
      </Form>
    );
  }
}

export default KvkForm;
