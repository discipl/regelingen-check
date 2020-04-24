import React, { Component } from "react";

import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";

import { FactData } from "../model/modelMetaData";

function valueDefined(value, negated = false) {
  if (value) {
    return !negated ? "true" : "false";
  } else if (value === false) {
    return !negated ? "false" : "true";
  }

  return "undefined";
}

const EXPLANATION_COLORS = {
  true: "text-success",
  false: "text-danger",
  undefined: "",
};

const EXPRESSIONS = {
  NOT: {
    title: () => "Het onderstaande feit moet NIET gelden",
    negate: true,
  },
  AND: {
    title: () => {
      return `Alle onderstaande feiten moeten gelden`;
    },
  },
  EQUAL: {
    title: () => "Onderstaande feiten moeten gelijk zijn",
  },
  OR: {
    title: () => "Ten minste een van de onderstaande feiten moet gelden",
  },
  LITERAL: { title: ({ value }) => JSON.stringify(value), renderValue: false },
  LESS_THAN: { title: () => "Onderstaande feit moet kleiner zijn dan" },
};

export default class Explanation extends Component {
  static defaultProps = {
    root: true,
    negated: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  willNegate() {
    return (
      this.props.explanation &&
      this.props.explanation.expression &&
      EXPRESSIONS[this.props.explanation.expression] &&
      EXPRESSIONS[this.props.explanation.expression].negate
    );
  }

  toggleOpen() {
    console.log("In click handler");
    this.setState({
      open: !this.state.open,
    });
  }

  hasChildren() {
    return this.filteredOperands().length > 0;
  }

  renderChevron() {
    if (this.hasChildren()) {
      return this.state.open ? "▲ " : "▼ ";
    }

    return "";
  }

  renderFact() {
    if (this.props.explanation.fact) {
      const title =
        (FactData[this.props.explanation.fact] &&
          FactData[this.props.explanation.fact].question) ||
        this.props.explanation.fact;
      return (
        <p onClick={this.toggleOpen.bind(this)} className={this.color()}>
          {this.renderChevron()} <em>{title}</em> ({this.renderValue()})
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
      const options = EXPRESSIONS[this.props.explanation.expression] || {};
      const title = options.title
        ? options.title(this.props.explanation)
        : `Expressie: ${this.props.explanation.expression}`;

      const value =
        options.renderValue === false ? null : ` (${this.renderValue()})`;

      return (
        <p onClick={this.toggleOpen.bind(this)} className={this.color()}>
          {this.renderChevron()}
          {title}
          {value}
        </p>
      );
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

  filteredOperands() {
    if (!this.props.explanation.operandExplanations) {
      return [];
    }

    return this.props.explanation.operandExplanations.filter(
      (operandExplanation) =>
        (operandExplanation.fact && operandExplanation.fact !== "[]") ||
        operandExplanation.expression
    );
  }

  color() {
    if (this.props.explanation) {
      return EXPLANATION_COLORS[
        valueDefined(this.props.explanation.value, this.props.negated)
      ];
    }
  }

  renderSubExplanations() {
    const children = this.filteredOperands().map(
      (operandExplanation, index) => (
        <li key={operandExplanation.fact}>
          <Explanation
            explanation={operandExplanation}
            title={this.renderTitle(operandExplanation, index)}
            root={false}
            negated={
              this.willNegate() ? !this.props.negated : this.props.negated
            }
          />
        </li>
      )
    );

    if (children.length > 0) {
      return (
        <Collapse in={this.state.open}>
          <ul>{children}</ul>
        </Collapse>
      );
    }

    return null;
  }

  renderExplanation() {
    return (
      <div className="factExplanation">
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
        <Accordion className="explanation">
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
