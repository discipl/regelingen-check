import React, { Component } from "react";
import PropTypes from "prop-types";
import "./FactPrompt.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

/**
 * FactPrompt Component
 * @augments {Component<Props, State>}
 */
class FactPrompt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      factValue: props.factValue || "",
      final: props.final || false,
    };
  }

  static defaultProps = {
    affirmPrompt: "Ja",
    affirmVariant: "primary",
    notAffirmedVariant: "outline-primary",
    denyVariant: "secondary",
    notDeniedVariant: "outline-secondary",
    denyPrompt: "Nee",
  };

  static propTypes = {
    affirmVariant: PropTypes.string,
    notAffirmedVariant: PropTypes.string,
    affirmPrompt: PropTypes.string,
    denyVariant: PropTypes.string,
    notDeniedVariant: PropTypes.string,
    denyPrompt: PropTypes.string,
    fact: PropTypes.string,
    factValue: PropTypes.any,
    final: PropTypes.bool,
    factIndex: PropTypes.number,
    title: PropTypes.string,
    handleResult: PropTypes.func,
    possibleCreatingActions: PropTypes.array,
    previousActs: PropTypes.array,
  };

  handleAffirm() {
    const result = this.state.factValue || true;
    this.setState({
      factValue: result,
      final: true,
    });
    if (this.props.handleResult) {
      this.props.handleResult(result, this.props.possibleCreatingActions);
    }
  }

  handleDeny() {
    this.setState({
      factValue: false,
      final: true,
    });
    if (this.props.handleResult) {
      this.props.handleResult(false, this.props.possibleCreatingActions);
    }
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

  affirmVariant() {
    if (!this.state.final) {
      return this.props.affirmVariant;
    }
    return this.state.final && this.state.factValue !== true
      ? this.props.notAffirmedVariant
      : this.props.affirmVariant;
  }

  denyVariant() {
    if (!this.state.final) {
      return this.props.denyVariant;
    }
    return this.state.final && this.state.factValue !== false
      ? this.props.notDeniedVariant
      : this.props.denyVariant;
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
    return `${this.props.factIndex || 0}. ${title}`;
  }

  render() {
    return (
      <Form className="factPromptForm text-center">
        <h3>{this.formatFact()}</h3>
        <Form.Group>{this.renderInput()}</Form.Group>
        <Button
          variant={this.affirmVariant()}
          disabled={this.state.final}
          onClick={this.handleAffirm.bind(this)}
        >
          {this.props.affirmPrompt}
        </Button>{" "}
        <Button
          variant={this.denyVariant()}
          disabled={this.state.final}
          onClick={this.handleDeny.bind(this)}
        >
          {this.props.denyPrompt}
        </Button>
      </Form>
    );
  }
}

export default FactPrompt;
