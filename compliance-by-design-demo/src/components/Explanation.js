import React, { Component } from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button"

export default class Explanation extends Component {

    renderFact() {
        if (this.props.explanation.fact) {
            return (
                <p>
                    Feit: {this.props.explanation.fact} 
                </p>
            )
        }
    }

    renderValue() {
        if (this.props.explanation.value) {
            return (
                <p>
                    Waarde: {String(this.props.explanation.value)} 
                </p>
            )
        }
    }

    renderExpression() {
        if (this.props.explanation.expression) {
            return (
                <p>
                    Expressie: {this.props.explanation.expression} 
                </p>
            )
        }
    }

    renderTitle(explanation, index) {
        if (explanation.fact) {
            return String(index) + " " + explanation.fact
        }
        else if (explanation.expression) {
            return String(index) + " " + explanation.expression;
        }
        else {
            return String(index)
        }
    }

    renderSubExplanations() {
        if (this.props.explanation.operandExplanations) {
            return this.props.explanation.operandExplanations.map((operandExplanation, index) => 
                <Explanation explanation={operandExplanation} title={this.renderTitle(operandExplanation, index)}/>
            )
        }
    }


    render() {
        return (
<Accordion>
        <Card>
          <Card.Header className="text-center">
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              {this.props.title}
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
                {this.renderValue()}
                {this.renderExpression()}
                {this.renderSubExplanations()}
                <p>{JSON.stringify(this.props.explanation, null, 2)}</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
        )
        
    }
}