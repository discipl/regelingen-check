import React, { Component } from "react";
import ModelView from "./components/ModelView";
import model from "./model/tegemoetkoming-schade-covid19.flint";

import log from "loglevel";

class App extends Component {
  render() {
    log.getLogger("disciplLawReg").setLevel("debug");

    const config = {
      actors: ["RVO", "onderneming"],
      activeActors: ["onderneming"],
      factFunctionSpec: {
        "[Minister van Economische Zaken en Klimaat]": "RVO",
        "[onderneming]": "onderneming",
      },
    };

    console.log("Using config", config);
    return <ModelView model={model} config={config} />;
  }
}

export default App;
