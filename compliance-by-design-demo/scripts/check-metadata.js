#!/usr/bin/node

let fs = require("fs");
let model = JSON.parse(
  fs.readFileSync("./src/model/tegemoetkoming-schade-covid19.flint.json")
);
let metaData = fs.readFileSync("./src/model/modelMetaData.js");

const terminalFacts = model.facts.filter((fact) => fact.function === "[]");

console.log(
  terminalFacts
    .filter((fact) => metaData.indexOf(fact.fact) === -1)
    .reduce((acc, fact) => {
      acc[fact.fact] = { question: "" };
      return acc;
    }, {})
);
