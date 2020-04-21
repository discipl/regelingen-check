import React, { Component } from "react";
import PropTypes from "prop-types";

import Container from "react-bootstrap/Container";

import { SUBSIDY_TITLES } from "./ActButton";
import FactPrompt from "./FactPrompt";

import QuestionMap from "../model/questionMapping";

/**
 * ActView Component
 * @augments {Component<Props, State>}
 */
export default class ActView extends Component {
  static propTypes = {
    act: PropTypes.any,
    factPrompts: PropTypes.array,
    previousActs: PropTypes.array,
  };

  title() {
    return SUBSIDY_TITLES[this.props.act.act] || this.props.act.act;
  }

  renderFactPrompts() {
    return this.props.factPrompts.map((factPromptState, idx) => {
      return (
        <FactPrompt
          factIndex={idx + 1}
          key={factPromptState.fact}
          handleResult={factPromptState.resultCallback}
          final={factPromptState.final}
          factValue={factPromptState.factValue}
          fact={factPromptState.fact}
          possibleCreatingActions={factPromptState.possibleCreatingActions}
          previousActs={this.props.previousActs}
          {...QuestionMap[factPromptState.fact]}
        />
      );
    });
  }

  render() {
    return (
      <Container>
        <h2>{this.title()}</h2>
        <p>
          Beantwoord onderstaande vragen om te bepalen of u voor deze regeling
          in aanmerking komt.
        </p>
        {this.renderFactPrompts()}
      </Container>
    );
  }
}
