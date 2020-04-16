import React, { Component } from "react";
import PropTypes from "prop-types";

import Button from "react-bootstrap/Button";

export const SUBSIDY_TITLES = {
  "<<indienen aanvraag tegemoetkoming in de schade geleden door de maatregelen ter bestrijding van de verdere verspreiding van COVID-19>>":
    "Tegemoedkoming geleden schade ten gevolge van de Coronamaatregelen",
  "<<indienen verzoek om aanvullende uitkering voor levensonderhoud op grond van de Tozo>>":
    "Aanvullende uitkering voor levensonderhoud op grond van de Tozo",
  "<<indienen verzoek om lening voor bedrijfskapitaal op grond van de Tozo>>":
    "Lening voor bedrijfskapitaal op grond van de Tozo",
};

const STATUS_VARIANTS = {
  potential: "primary",
  available: "success",
  impossible: "danger",
};

export const STATUS_ICONS = {
  potential: (
    <svg
      className="bi bi-question-circle"
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z"
        clipRule="evenodd"
      />
      <path d="M5.25 6.033h1.32c0-.781.458-1.384 1.36-1.384.685 0 1.313.343 1.313 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.007.463h1.307v-.355c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.326 0-2.786.647-2.754 2.533zm1.562 5.516c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
    </svg>
  ),
  available: (
    <svg
      className="bi bi-check-circle"
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M15.354 2.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3-3a.5.5 0 11.708-.708L8 9.293l6.646-6.647a.5.5 0 01.708 0z"
        clipRule="evenodd"
      />
      <path
        fillRule="evenodd"
        d="M8 2.5A5.5 5.5 0 1013.5 8a.5.5 0 011 0 6.5 6.5 0 11-3.25-5.63.5.5 0 11-.5.865A5.472 5.472 0 008 2.5z"
        clipRule="evenodd"
      />
    </svg>
  ),
  impossible: (
    <svg
      className="bi bi-exclamation-triangle"
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M7.938 2.016a.146.146 0 00-.054.057L1.027 13.74a.176.176 0 00-.002.183c.016.03.037.05.054.06.015.01.034.017.066.017h13.713a.12.12 0 00.066-.017.163.163 0 00.055-.06.176.176 0 00-.003-.183L8.12 2.073a.146.146 0 00-.054-.057A.13.13 0 008.002 2a.13.13 0 00-.064.016zm1.044-.45a1.13 1.13 0 00-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"
        clipRule="evenodd"
      />
      <path d="M7.002 12a1 1 0 112 0 1 1 0 01-2 0zM7.1 5.995a.905.905 0 111.8 0l-.35 3.507a.552.552 0 01-1.1 0L7.1 5.995z" />
    </svg>
  ),
};

export default class ActButton extends Component {
  static propTypes = {
    act: PropTypes.string,
    status: PropTypes.oneOf(["potential", "available", "impossible"]),
  };

  static defaultProps = {
    status: "potential",
  };

  variant() {
    return STATUS_VARIANTS[this.props.status];
  }

  icon() {
    return STATUS_ICONS[this.props.status];
  }

  title() {
    return SUBSIDY_TITLES[this.props.act] || this.props.act;
  }

  render() {
    return (
      <Button className="actButton" {...this.props} variant={this.variant()}>
        {this.title()} {this.icon()}
      </Button>
    );
  }
}
