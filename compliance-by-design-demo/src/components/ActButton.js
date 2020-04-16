import React, { Component } from "react";
import PropTypes from "prop-types";

import Button from "react-bootstrap/Button";

const SUBSIDY_TITLES = {
  "<<indienen aanvraag tegemoetkoming in de schade geleden door de maatregelen ter bestrijding van de verdere verspreiding van COVID-19>>":
    "Tegemoedkoming geleden schade ten gevolge van de Coronamaatregelen",
  "<<indienen verzoek om aanvullende uitkering voor levensonderhoud op grond van de Tozo>>":
    "Aanvullende uitkering voor levensonderhoud op grond van de Tozo",
  "<<indienen verzoek om lening voor bedrijfskapitaal op grond van de Tozo>>":
    "Lening voor bedrijfskapitaal op grond van de Tozo",
};

export default class ActButton extends Component {
  static propTypes = {
    act: PropTypes.string,
  };

  render() {
    return (
      <Button {...this.props}>
        {SUBSIDY_TITLES[this.props.act] || this.props.act}
      </Button>
    );
  }
}
