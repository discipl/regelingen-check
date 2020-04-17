import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button"

class FactsView extends Component {
    constructor(props) {
        super(props)
    }

    renderFacts() {
        return Object.entries(this.props.facts).map((keyValue) => {
            const factName = keyValue[0];
            const factValue = keyValue[1];

            return <div><p>{factName}: {JSON.stringify(factValue)}</p></div>
        })
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
                        <Card.Body>{this.renderFacts()}</Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        )
    }
}

export default FactsView;