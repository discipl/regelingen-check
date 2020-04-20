import React, { Component } from "react";
import Form from "react-bootstrap/Form";

/**
 * @param {string} [string] - Date to convert.
 */
function convertToValue(string) {
  if (string) {
    return `${string.substr(0, 4)}-${string.substr(4, 2)}-${string.substr(
      6,
      2
    )}`;
  }
  return "";
}

/**
 * @param {string} [string] - String to convert.
 */
function convertFromValue(string) {
  if (string) {
    return `${string.substr(0, 4)}${string.substr(5, 2)}${string.substr(8, 2)}`;
  }
  return "";
}

export default class DateControl extends Component {
  onChange(event) {
    console.log(
      "Value changed",
      event.target.value,
      convertFromValue(event.target.value)
    );
    if (this.props.onChange) {
      this.props.onChange(convertFromValue(event.target.value));
    }
  }

  render() {
    return (
      <Form.Control
        {...this.props}
        type="date"
        onChange={this.onChange.bind(this)}
        value={convertToValue(this.props.value)}
      ></Form.Control>
    );
  }
}
