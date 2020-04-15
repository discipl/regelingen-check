import React, { PureComponent } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./Jumbo.css";

export default class Jumbo extends PureComponent {
  render() {
    return (
      <Jumbotron className="jumbo-header text-center">
        <Container>
          <Row>
            <Col>
              <h1>Voor welke regelingen kom ik in aanmerking?</h1>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
    );
  }
}
