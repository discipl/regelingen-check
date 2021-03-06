import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

import FactChangeModal from "./FactChangeModal";

import { FactData } from "../model/modelMetaData";

class FactsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changingFact: null,
    };
  }

  changeFact(factName) {
    if (this.props.onChangeFact) {
      const isNonboolean =
        FactData[factName] &&
        FactData[factName].type &&
        FactData[factName].type !== "boolean";

      console.log(`${factName} is nonboolean: ${isNonboolean}`);

      if (isNonboolean) {
        this.setState({
          changingFact: factName,
          oldValue: this.props.facts[factName],
        });
      } else {
        this.props.onChangeFact(factName, !this.props.facts[factName]);
      }
    }
  }

  handleModalSave(factName, factValue) {
    if (this.props.onChangeFact) {
      this.props.onChangeFact(factName, factValue);
    }
    this.handleModalClose();
  }

  handleModalClose() {
    this.setState({
      changingFact: null,
    });
  }

  renderFacts() {
    return Object.entries(this.props.facts).map(([factName, factValue]) => {
      let factTitle = FactData[factName] && FactData[factName].question;

      if (!factTitle) {
        factTitle = factName.replace(/^\[/, "").replace(/\]$/, "");
        factTitle = `${factTitle
          .substr(0, 1)
          .toLocaleUpperCase()}${factTitle.substr(1)}`;
      }

      const displayValue =
        typeof factValue === "boolean"
          ? factValue
            ? "Ja"
            : "Nee / n.v.t."
          : JSON.stringify(factValue);
      return (
        <tr>
          <td>{factTitle}</td>
          <td>{displayValue}</td>
          <td>
            <button
              className="btn btn-primary"
              onClick={this.changeFact.bind(this, factName)}
            >
              Wijzig
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <Accordion>
        <Card>
          <Card.Header className="text-center">
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Aangeleverde gegevens
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <Table striped hover>
                <thead>
                  <tr>
                    <th>Gegeven</th>
                    <th>Waarde</th>
                    <th>Wijzigen</th>
                  </tr>
                </thead>
                <tbody>{this.renderFacts()}</tbody>
              </Table>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <FactChangeModal
          factName={this.state.changingFact}
          oldValue={this.state.oldValue}
          handleSave={this.handleModalSave.bind(this)}
          handleClose={this.handleModalClose.bind(this)}
        />
      </Accordion>
    );
  }
}

export default FactsView;
