import React, { Component } from "react";
import ModelView from "./components/ModelView";
import model from "./model/tegemoetkoming-schade-covid19.flint";

import log from "loglevel";

class App extends Component {
  render() {
    log.getLogger("disciplLawReg").setLevel("warn");

    const config = {
      actors: ["RVO", "onderneming"],
      activeActors: ["onderneming"],
      factFunctionSpec: {
        "[RVO]": "onderneming",
        "[onderneming]": "onderneming",
        "[gedupeerde onderneming]": "onderneming",
      },
    };

    console.log("Using config", config);
    return <ModelView model={model} config={config} />;
  }
}

export default App;
