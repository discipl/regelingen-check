import React, { Component } from "react";

import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { FactData } from "../model/modelMetaData";

const EXPRESSIONS = {
  NOT: {
    negation: true,
    title: () => "Het onderstaande feit moet NIET gelden:",
  },
  AND: {
    title: ({ value }) => {
      let info;
      if (value === true) {
        info = "voldaan";
      } else if (value === false) {
        info = "niet voldaan";
      } else {
        info = "meer informatie nodig";
      }

      return `Alle onderstaande feiten moeten gelden (${info}):`;
    },
  },
  EQUAL: {
    title: () => "Onderstaande feiten moeten gelijk zijn:",
  },
  OR: {
    title: () => "Ten minste een van de onderstaande feiten moet gelden:",
  },
  LITERAL: { title: ({ value }) => value },
  LESS_THAN: { title: () => "Onderstaande feit moet kleiner zijn dan" },
};

export default class Explanation extends Component {
  static defaultProps = {
    root: true,
    negation: false,
  };

  renderFact() {
    if (this.props.explanation.fact) {
      const title =
        (FactData[this.props.explanation.fact] &&
          FactData[this.props.explanation.fact].question) ||
        this.props.explanation.fact;
      return (
        <p>
          <em>{title}</em> ({this.renderValue()})
        </p>
      );
    }
  }

  renderValue() {
    if (this.props.explanation.value === true) {
      return "voldaan";
    } else if (this.props.explanation.value) {
      return JSON.stringify(this.props.explanation.value);
    } else if (this.props.explanation.value === false) {
      return "niet voldaan";
    }

    return "meer informatie nodig";
  }

  renderExpression() {
    if (this.props.explanation.expression) {
      const options = EXPRESSIONS[this.props.explanation.expression];
      if (options && options.title) {
        return <p>{options.title(this.props.explanation)}</p>;
      }

      return <p>Expressie: {this.props.explanation.expression}</p>;
    }
  }

  renderTitle(explanation, index) {
    if (explanation.fact) {
      return String(index) + " " + explanation.fact;
    } else if (explanation.expression) {
      return String(index) + " " + explanation.expression;
    } else {
      return String(index);
    }
  }

  renderSubExplanations() {
    if (this.props.explanation.operandExplanations) {
      const children = this.props.explanation.operandExplanations
        // .filter(
        //   (operandExplanation) =>
        //     (operandExplanation.fact && operandExplanation.value !== null) ||
        //     operandExplanation.expression
        // )
        .map((operandExplanation, index) => (
          <li key={operandExplanation.fact}>
            <Explanation
              explanation={operandExplanation}
              title={this.renderTitle(operandExplanation, index)}
              root={false}
            />
          </li>
        ));

      return <ul>{children}</ul>;
    }
  }

  renderExplanation() {
    return (
      <div className="explanation">
        {this.renderFact()}
        {this.renderExpression()}
        {this.renderSubExplanations()}
      </div>
    );
  }

  render() {
    if (!this.props.explanation) {
      return null;
    }

    if (this.props.root) {
      return (
        <Accordion>
          <Card>
            <Card.Header className="text-center">
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                {this.props.title}
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body className="text-left">
                {this.renderExplanation()}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      );
    }

    return this.renderExplanation();
  }
}
