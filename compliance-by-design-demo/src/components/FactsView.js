import React, { Component } from "react";

class FactsView extends Component {
    constructor (props) {
        super(props)
    }

    render() {
        const factNames = Object.keys(this.props.facts)

        return Object.entries(this.props.facts).map((keyValue) => {
            const factName = keyValue[0];
            const factValue = keyValue[1];

            return <div><p>{factName}: {JSON.stringify(factValue)}</p></div>
        })
    }
}

export default FactsView;