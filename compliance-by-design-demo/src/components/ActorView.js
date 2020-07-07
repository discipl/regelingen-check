import React, { Component } from "react";
import PropTypes from "prop-types";

import Container from "react-bootstrap/Container";

import "./ActorView.css";

import FactPrompt from "./FactPrompt";

import FactsView from "./FactsView";
import ActButton, { STATUS_ICONS } from "./ActButton";
import ActView from "./ActView";
import Explanation from "./Explanation";
import DisclaimerFooter from "./DisclaimerFooter";

/**
 * ActView Component
 * @augments {Component<Props, State>}
 */
class ActorView extends Component {
  constructor(props) {
    super(props);
    console.log("Constructing ActorView", props);
    this.state = {
      duties: [],
      loading: true,
      name: this.props.name,
      enteredFacts: {},
      impossibleActs: [],
    };
  }

  static propTypes = {
    actors: PropTypes.object,
    acts: PropTypes.array,
    caseLink: PropTypes.string,
    derivedFacts: PropTypes.object,
    lawReg: PropTypes.any,
    name: PropTypes.string,
    onCaseChange: PropTypes.func,
    onEndAct: PropTypes.func,
    onStartAct: PropTypes.func,
  };

  async componentDidMount() {
    await this.computeRenderData([], []);
  }

  async componentDidUpdate(prevProps, prevState) {
    console.log(
      "ComponentDidUpdate",
      "prev:",
      prevProps,
      "current:",
      this.props
    );

    const propsChanged =
      this.props.caseLink !== prevProps.caseLink ||
      this.props.actors[this.state.name] !== prevProps.actors[this.state.name];
    if (propsChanged) {
      await this.computeRenderData();
    }
  }

  async computeRenderData(
    additionalFactName = null,
    additionalFactValue = null
  ) {
    this.setState({ loading: true });
    console.log("ComputeRenderDataState", this.state);
    console.log("ComputeRenderData", this.props);
    try {
      const factResolver = (fact) => {
        if (additionalFactName === fact) {
          return additionalFactValue;
        }

        if (
          this.props.derivedFacts &&
          this.props.derivedFacts.hasOwnProperty(fact)
        ) {
          return this.props.derivedFacts[fact];
        }

        if (
          this.state.enteredFacts &&
          this.state.enteredFacts.hasOwnProperty(fact)
        ) {
          return this.state.enteredFacts[fact];
        }
      };

      let availableActLinks = await this.props.lawReg.getAvailableActsWithResolver(
        this.props.caseLink,
        this.props.actors[this.state.name],
        factResolver
      );

      const getActDetails = async (act) => {
        const details = await this.props.lawReg.getActDetails(
          act.link,
          this.props.actors[this.state.name]
        );
        return { ...act, details: details };
      };

      console.log("Got available act links", availableActLinks);
      let availableActs = await Promise.all(
        availableActLinks.map(getActDetails)
      );
      console.log("Computed available acts", availableActs);
      console.log("Computing potential acts");
      let potentialActs = await Promise.all(
        (
          await this.props.lawReg.getPotentialActsWithResolver(
            this.props.caseLink,
            this.props.actors[this.state.name],
            factResolver
          )
        ).map(getActDetails)
      );
      console.log("Computed potential acts", potentialActs);

      const explanationArray = await Promise.all(
        this.props.acts.map((act) =>
          this.props.lawReg.explain(
            this.props.actors[this.state.name],
            this.props.caseLink,
            act.act,
            factResolver
          )
        )
      );

      const explanations = this.props.acts
        .map((act, index) => {
          return { act: act.act, explanation: explanationArray[index] };
        })
        .reduce((map, { act, explanation }) => {
          map[act] = explanation;
          return map;
        }, {});

      this.setState({
        availableActs: availableActs,
        potentialActs: potentialActs,
        explanations: explanations,
        loading: false,
        activeAct: undefined,
        factPrompts: [],
      });
    } catch (e) {
      console.error("Caught ex", e);
    }
  }

  async takeAction(act, actIndex, actType) {
    this.setState({
      activeAct: {
        act: act,
        index: actIndex,
        type: actType,
      },
    });
    try {
      if (this.props.onStartAct) {
        this.props.onStartAct();
      }
      console.log("Getting case link");
      let caseLink = await this.props.lawReg.take(
        this.props.actors[this.state.name],
        this.props.caseLink,
        act,
        this.askFact.bind(this)
      );
      console.log("Got case link", caseLink);

      this.setState({
        factPrompts: [],
        activeAct: undefined,
      });
      if (this.props.onCaseChange) {
        this.props.onCaseChange(caseLink);
      }
    } catch (e) {
      console.log("Error from lawReg", e);
      if (e.message.includes("is not allowed")) {
        const act = e.message.substring(
          e.message.indexOf("<<"),
          e.message.indexOf(">>") + 2
        );
        this.setState({
          notAllowedAct: act,
        });
      } else {
        throw e;
      }
    } finally {
      console.log("Computing data after taking act");
      await this.computeRenderData();
      if (this.props.onEndAct) {
        this.props.onEndAct();
      }
    }
  }

  async askFact(fact, _listNames, _listIndices, possibleCreatingActions) {
    console.log("in askFact");
    if (
      this.props.derivedFacts &&
      this.props.derivedFacts.hasOwnProperty(fact)
    ) {
      return this.props.derivedFacts[fact];
    }

    if (
      this.state.enteredFacts &&
      this.state.enteredFacts.hasOwnProperty(fact)
    ) {
      return this.state.enteredFacts[fact];
    }
    const resultPromise = new Promise((resolve) => {
      console.log("In resultPromise");
      const handleAskFactResult = (result, possibleCreatingActions) => {
        let realResult = result || false;
        if (typeof result === "boolean") {
          realResult = result;
        } else if (!isNaN(Number(result))) {
          realResult = Number(result);
        }
        this.setState((state) => {
          const newFactPrompts = state.factPrompts || [];

          newFactPrompts[newFactPrompts.length - 1] = {
            fact: fact,
            factValue: realResult,
            possibleCreatingActions: possibleCreatingActions || [],
            final: true,
          };

          const newEnteredFacts = state.enteredFacts || [];

          newEnteredFacts[fact] = realResult;

          return {
            factPrompts: newFactPrompts,
            enteredFacts: newEnteredFacts,
          };
        });

        resolve(realResult);
      };

      this.setState((state) => {
        /** @type {Array} */
        const prevFactPrompts = state.factPrompts || [];
        const newFactPrompts = prevFactPrompts.concat({
          fact: fact,
          factValue: possibleCreatingActions
            ? possibleCreatingActions[0]
            : undefined,
          possibleCreatingActions: possibleCreatingActions || [],
          resultCallback: handleAskFactResult,
        });
        console.log("Setting factPrompts to", newFactPrompts);
        return {
          factPrompts: newFactPrompts,
        };
      });
    });

    return resultPromise;
  }

  async changeActor(event) {
    this.setState({ name: event.target.value });
    await this.computeRenderData();
  }

  renderAvailableActs() {
    let acts = this.state.availableActs;
    if (!acts) {
      return [];
    }

    return acts.map((act, index) => {
      console.log("ActionDetails available", act.details);
      return (
        <div className="text-center mb-4" key={act.act}>
          <ActButton
            act={act.act}
            status="available"
            disabled={!this.state.activeAct}
            onClick={this.takeAction.bind(
              this,
              act.act,
              index,
              "availableActs"
            )}
          ></ActButton>
        </div>
      );
    });
  }

  renderFactPrompts(act, actIndex, actType) {
    console.log(
      "Maybe rendering factPrompts",
      act,
      actIndex,
      actType,
      "with active Act",
      this.state.activeAct
    );

    if (
      this.state.activeAct &&
      this.state.activeAct.index === actIndex &&
      this.state.activeAct.type === actType &&
      this.state.factPrompts
    ) {
      console.log(
        `Really rendering ${this.state.factPrompts.length} factPrompts`,
        this.state.factPrompts
      );
      return this.state.factPrompts.map((factPromptState, idx) => {
        return (
          <FactPrompt
            factIndex={idx + 1}
            key={factPromptState.fact}
            handleResult={factPromptState.resultCallback}
            final={factPromptState.final}
            factValue={factPromptState.factValue}
            fact={factPromptState.fact}
            possibleCreatingActions={factPromptState.possibleCreatingActions}
            previousActs={this.state.previousActs}
          />
        );
      });
    }
    return [];
  }

  renderExplanation(act) {
    if (
      this.state.explanations &&
      this.state.explanations.hasOwnProperty(act)
    ) {
      console.log(
        this.state.explanations[act],
        this.state.explanations[act].operandExplanations[3]
      );

      let explanation;

      if (this.state.explanations[act].operandExplanations.length === 4) {
        explanation = this.state.explanations[act].operandExplanations[3];
      } else {
        explanation = this.state.explanations[act].operandExplanations[0];
      }

      return <Explanation title="Uitleg" explanation={explanation} />;
    }
  }

  renderImpossibleActs() {
    const possibleActs = (this.state.potentialActs || [])
      .concat(this.state.availableActs || [])
      .map((act) => act.act);
    const impossibleActs = this.props.acts.filter(
      (act) => !possibleActs.includes(act.act)
    );

    return impossibleActs.map((act) => {
      return (
        <div className="text-center mb-4" key={act.act}>
          <ActButton status="impossible" act={act.act} disabled></ActButton>
          {this.renderExplanation(act.act)}
        </div>
      );
    });
  }

  renderPotentialActs() {
    let acts = this.state.potentialActs;
    if (!acts) {
      return [];
    }

    return acts.map((act, index) => {
      console.log("ActionDetails potential", act.details);
      return (
        <div className="text-center mb-4" key={act.act}>
          <ActButton
            act={act.act}
            disabled={this.state.activeAct}
            onClick={this.takeAction.bind(
              this,
              act.act,
              index,
              "potentialActs"
            )}
          ></ActButton>
          {this.renderFactPrompts(act, index, "potentialActs")}
        </div>
      );
    });
  }

  hideNotAllowedAlert() {
    this.setState({
      notAllowedAct: undefined,
      factPrompts: [],
    });
  }

  onChangeFact(factName, factValue) {
    console.log("onChangeFact", factName, factValue);
    this.setState((state) => {
      const newEnteredFacts = { ...state.enteredFacts, [factName]: factValue };
      console.log(newEnteredFacts);
      this.computeRenderData(factName, factValue);
      return {
        enteredFacts: newEnteredFacts,
      };
    });
  }

  render() {
    console.log("ActorView render with state", this.state);
    if (this.state.loading === true) {
      console.log("ActorView render loading true");
      return (
        <Container>
          <h2>Gegevens aan het verwerken</h2>
          <p>Een moment geduld alstublieft&hellip;</p>
        </Container>
      );
    }
    console.log("Props when actorview rendering", this.props);

    if (this.state.activeAct) {
      return (
        <ActView
          act={this.state.activeAct}
          factPrompts={this.state.factPrompts}
          previousActs={this.state.previousActs}
        ></ActView>
      );
    }

    return (
      <Container>
        <h2>Kies een subsidieregeling</h2>
        <p>
          Aan de hand van uw KvK gegevens komt u mogelijk in aanmerking voor de
          volgende subsidieregelingen.
        </p>
        <p>
          Om te bepalen of u daadwerkelijk gebruik kan maken van de
          verschillende regelingen, moet u een aantal vragen beantwoorden. Klik
          op een van de regelingen om naar de vragenlijst te gaan.
        </p>

        <div className="m5-5 mb-5">
          <DisclaimerFooter />
        </div>

        <div className="mt-5 mb-5">
          {this.renderAvailableActs()}
          {this.renderPotentialActs()}
          {this.renderImpossibleActs()}
        </div>
        <div className="m5-5 mb-5">
          <FactsView
            facts={this.state.enteredFacts}
            onChangeFact={this.onChangeFact.bind(this)}
          ></FactsView>
        </div>

        <h4>Legenda</h4>
        <p className="text-primary">
          {STATUS_ICONS.potential} Nog onvoldoende gegevens om te bepalen of u
          voor deze regeling in aanmerking komt.
        </p>
        <p className="text-success">
          {STATUS_ICONS.available} Op basis van de ingevoerde gegevens komt u
          voor deze regeling in aanmerking.
        </p>
        <p className="text-danger">
          {STATUS_ICONS.impossible} Op basis van de ingevoerde gegevens komt u{" "}
          <strong>niet</strong> voor deze regeling in aanmerking.
        </p>
      </Container>
    );
  }
}

export default ActorView;
