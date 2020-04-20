import React, { Component } from "react";

import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";

export default class FactChangeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
  }

  setValue(event) {
    this.setState({
      value: event.target.value,
    });
  }

  handleSave() {
    console.log("Saving", this.props.factName, this.state.value);
    if (this.props.handleSave) {
      if (typeof this.props.oldValue === "number") {
        this.props.handleSave(this.props.factName, Number(this.state.value));
      } else {
        this.props.handleSave(this.props.factName, this.state.value);
      }
    }
  }
  render() {
    return (
      <Modal show={this.props.factName != null} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Wijzig {this.props.factName}</Modal.Title>
        </Modal.Header>
        <InputGroup>
          <Modal.Body>
            <FormControl
              value={this.state.value}
              onChange={this.setValue.bind(this)}
              placeholder="Nieuwe waarde"
              aria-label="Nieuwe waarde"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleClose}>
              Terug
            </Button>
            <Button variant="primary" onClick={this.handleSave.bind(this)}>
              Wijzigen
            </Button>
          </Modal.Footer>
        </InputGroup>
      </Modal>
    );
  }
}
