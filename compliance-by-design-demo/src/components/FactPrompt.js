import React, { Component } from "react";
import "./FactPrompt.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class FactPrompt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      factValue: props.factValue || "",
      final: props.final || false,
    };
  }

  handleAffirm() {
    const result = this.state.factValue || true;
    this.setState({
      factValue: result,
      final: true,
    });
    this.props.handleResult(result, this.props.possibleCreatingActions);
  }

  handleDeny() {
    this.setState({
      factValue: false,
      final: true,
    });
    this.props.handleResult(false, this.props.possibleCreatingActions);
  }

  handleInput(event) {
    console.log(event.target.value);
    this.setState({
      factValue: event.target.value,
    });
  }

  isFinalBoolean() {
    return this.state.final && typeof this.state.factValue === "boolean";
  }

  hideTrue() {
    return this.state.final && this.state.factValue !== true;
  }

  hideFalse() {
    return this.state.final && this.state.factValue !== false;
  }

  renderOptions() {
    return this.props.possibleCreatingActions.map((possibleCreatingAction) => {
      const numberCandidates = this.props.previousActs
        .map((prevAct, index) => {
          return { index, ...prevAct };
        })
        .filter((prevAct) => prevAct.link === possibleCreatingAction);
      const number =
        numberCandidates.length > 0
          ? numberCandidates[0].index + 1
          : "Unknown act";
      return <option value={possibleCreatingAction}>{number}</option>;
    });
  }

  renderInput() {
    if (
      Array.isArray(this.props.possibleCreatingActions) &&
      this.props.possibleCreatingActions.length > 0
    ) {
      return (
        <Form.Control
          as="select"
          className="value"
          onChange={this.handleInput.bind(this)}
          value={this.state.factValue}
          disabled={this.state.final}
          hidden={this.isFinalBoolean()}
          custom
        >
          {this.renderOptions()}
        </Form.Control>
      );
    } else {
      return (
        <Form.Control
          className="value"
          placeholder="Waarde van feit"
          onChange={this.handleInput.bind(this)}
          value={this.state.factValue}
          disabled={this.state.final}
          hidden={this.isFinalBoolean()}
        />
      );
    }
  }

  formatFact() {
    let title = "";
    if (this.props.title) {
      title = this.props.title;
    } else {
      /** @type {string} */
      const fact = this.props.fact.replace(/^\[/, "").replace(/\]$/, "");
      title = `${fact.substr(0, 1).toLocaleUpperCase()}${fact.substr(1)}`;
    }
    return `${this.props.factIndex}. ${title}`;
  }

  render() {
    return (
      <Form className="factPromptForm text-center">
        <h2>{this.formatFact()}</h2>
        <Form.Group>{this.renderInput()}</Form.Group>
        <Button
          variant="primary"
          hidden={this.hideTrue()}
          disabled={this.state.final}
          onClick={this.handleAffirm.bind(this)}
        >
          Ja
        </Button>{" "}
        <Button
          variant="secondary"
          hidden={this.hideFalse()}
          disabled={this.state.factValue || this.state.final}
          onClick={this.handleDeny.bind(this)}
        >
          Nee
        </Button>
      </Form>
    );
  }
}

export default FactPrompt;
