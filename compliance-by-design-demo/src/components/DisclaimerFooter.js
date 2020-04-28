import React, { PureComponent } from "react";

import "./DisclaimerFooter.css";

export default class DisclaimerFooter extends PureComponent {
  render() {
    return (
      <p className="text-muted disclaimer-footer">
        De Regelingen Check is opgesteld op basis van drie regelingen zoals deze
        van kracht waren op vermelde datums. Aan de Regelingen Check kunnen geen
        rechten worden ontleend. De Regelingen Check is uitsluitend te gebruiken
        als indicatie voor de gebruiker en komt niet in de plaats van de
        beoordeling van een overheidsorganisatie.
      </p>
    );
  }
}
