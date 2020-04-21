import React, { Component } from "react";

import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";

import { FactData } from "../model/modelMetaData";

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

  title() {
    if (!this.props.factName) {
      return;
    }

    let factTitle =
      FactData[this.props.factName] && FactData[this.props.factName].question;

    if (!factTitle) {
      factTitle = this.props.factName.replace(/^\[/, "").replace(/\]$/, "");
      factTitle = `${factTitle
        .substr(0, 1)
        .toLocaleUpperCase()}${factTitle.substr(1)}`;
    }

    return factTitle;
  }

  handleSave() {
    console.log("Saving", this.props.factName, this.state.value);
    if (this.props.handleSave) {
      if (typeof this.props.oldValue === "number") {
        this.props.handleSave(this.props.factName, Number(this.state.value));
      } else {
        const newValue = this.state.value || false;
        this.props.handleSave(this.props.factName, newValue);
      }
    }
  }
  render() {
    return (
      <Modal show={this.props.factName != null} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Wijzig <em>{this.title()}</em>
          </Modal.Title>
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
