import React, { Component } from "react";
import "./ActorView.css";
import FactPrompt from "./FactPrompt";
import { ActNotAllowedAlert } from "./ActNotAllowedAlert";

class ActorView extends Component {
  constructor(props) {
    super(props);
    console.log("Constructing ActorView", props);
    this.state = {
      duties: [],
      loading: true,
      name: this.props.name,
      enteredFacts: {},
    };
  }

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

  async computeRenderData() {
    this.setState({ loading: true });
    console.log("ComputeRenderDataState", this.state);
    console.log("ComputeRenderData", this.props);
    try {
      const factResolver = (fact) => {
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

      console.log("Got available act links");
      let availableActs = await Promise.all(
        availableActLinks.map(async (act) => {
          const details = await this.props.lawReg.getActDetails(
            act.link,
            this.props.actors[this.state.name]
          );
          return { ...act, details: details };
        })
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
        ).map(async (act) => {
          const details = await this.props.lawReg.getActDetails(
            act.link,
            this.props.actors[this.state.name]
          );
          return { ...act, details: details };
        })
      );

      this.setState({
        availableActs: availableActs,
        potentialActs: potentialActs,
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
      let caseLink = await this.props.lawReg.take(
        this.props.actors[this.state.name],
        this.props.caseLink,
        act,
        this.askFact.bind(this)
      );
      this.setState({
        factPrompts: [],
        activeAct: undefined,
      });
      if (this.props.onCaseChange) {
        this.props.onCaseChange(caseLink);
      }
    } catch (e) {
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

  async askFact(
    fact,
    _flintItem,
    _listNames,
    _listIndices,
    possibleCreatingActions
  ) {
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
    const resultPromise = new Promise((resolve, reject) => {
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
        <div key={act.act} className="available">
          <button
            className="actButton"
            disabled={!this.state.activeAct}
            onClick={this.takeAction.bind(
              this,
              act.act,
              index,
              "availableActs"
            )}
          >
            {act.act}
          </button>
          {this.renderFactPrompts(act, index, "availableActs")}
        </div>
      );
    });
  }

  renderFactPrompts(act, actIndex, actType) {
    console.log(
      "Maybe rendering factPrompt",
      act,
      actIndex,
      actType,
      "with active Act",
      this.state.activeAct
    );
    let factIndex = 1;

    if (
      this.state.activeAct &&
      this.state.activeAct.index === actIndex &&
      this.state.activeAct.type === actType &&
      this.state.factPrompts
    ) {
      console.log("Really rendering factPrompts", this.state.factPrompts);
      return this.state.factPrompts.map((factPromptState) => {
        return (
          <FactPrompt
            factIndex={factIndex++}
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

  renderImpossibleActs() {
    const possibleActs = (this.state.potentialActs || [])
      .concat(this.state.availableActs || [])
      .map((act) => act.act);
    const impossibleActs = this.props.acts.filter(
      (act) => !possibleActs.includes(act.act)
    );

    return impossibleActs.map((act) => {
      return (
        <div key={act.act} className="impossible">
          <button className="actButton" disabled>
            {act.act}
          </button>
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
        <div key={act.act} className="potential">
          <button
            className="actButton"
            disabled={this.state.activeAct}
            onClick={this.takeAction.bind(
              this,
              act.act,
              index,
              "potentialActs"
            )}
          >
            {act.act}
          </button>
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

  render() {
    console.log("ActorView render with state", this.state);
    if (this.state.loading === true) {
      console.log("ActorView render loading true");
      return (
        <div className="container">
          <div className="acts">
            <p>Loading...</p>
          </div>
        </div>
      );
    }
    console.log("Props when actorview rendering", this.props);
    return (
      <div className="container">
        <ActNotAllowedAlert
          act={this.state.notAllowedAct}
          handleClose={this.hideNotAllowedAlert.bind(this)}
        ></ActNotAllowedAlert>
        <div className="acts">
          {this.renderAvailableActs()}
          {this.renderPotentialActs()}
          {this.renderImpossibleActs()}
        </div>
      </div>
    );
  }
}

export default ActorView;
