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
      hasError: props.hasError || false,
    };
  }

  static defaultProps = {
    type: "boolean",
    submitPrompt: "Indienen",
    cancelPrompt: "Niet van toepassing",
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
    type: PropTypes.string,
    question: PropTypes.string,
    controlOptions: PropTypes.object,
    fact: PropTypes.string,
    factValue: PropTypes.any,
    final: PropTypes.bool,
    factIndex: PropTypes.number,
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

  handleSubmit() {
    if (!this.state.factValue) {
      this.setState({
        hasError: true,
      });
    } else {
      this.setState({
        hasError: false,
      });
      this.handleAffirm();
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
          onChange={this.handleInput.bind(this)}
          value={this.state.factValue}
          disabled={this.state.final}
          custom
          {...this.props.controlOptions}
        >
          {this.renderOptions()}
        </Form.Control>
      );
    } else {
      return (
        <>
          <Form.Control
            className="value"
            onChange={this.handleInput.bind(this)}
            value={this.state.factValue}
            disabled={this.state.final}
            {...this.props.controlOptions}
            required
            isInvalid={this.state.hasError}
          />
          <Form.Control.Feedback type="invalid">
            Dit veld is verplicht
          </Form.Control.Feedback>
        </>
      );
    }
  }

  formatFact() {
    let title = "";
    if (this.props.question) {
      title = this.props.question;
    } else {
      /** @type {string} */
      const fact = this.props.fact.replace(/^\[/, "").replace(/\]$/, "");
      title = `${fact.substr(0, 1).toLocaleUpperCase()}${fact.substr(1)}`;
    }
    return `${this.props.factIndex || 0}. ${title}`;
  }

  renderPrompt() {
    if (this.props.type === "boolean") {
      return (
        <>
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
        </>
      );
    } else {
      return (
        <>
          <Form.Group>{this.renderInput()}</Form.Group>
          <Button
            variant={this.affirmVariant()}
            disabled={this.state.final}
            onClick={this.handleSubmit.bind(this)}
          >
            {this.props.submitPrompt}
          </Button>{" "}
          <Button
            variant={this.denyVariant()}
            disabled={this.state.final}
            onClick={this.handleDeny.bind(this)}
          >
            {this.props.cancelPrompt}
          </Button>
        </>
      );
    }
  }

  render() {
    return (
      <Form className="factPromptForm text-center">
        <h3>{this.formatFact()}</h3>
        {this.renderPrompt()}
      </Form>
    );
  }
}

export default FactPrompt;
