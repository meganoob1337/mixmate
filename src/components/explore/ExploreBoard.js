import React, { Component } from 'react';

export default class ExploreBoard extends Component {
    render() {
        return (
            <React.Fragment>
                {
                    this.props.ibaCocktails.map(ibaCocktail => {
                        return <p key={ibaCocktail.id}>{ibaCocktail.name}</p>
                    })
                }
            </React.Fragment>
        )
    }
}