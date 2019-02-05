import React, { Component } from 'react';
import ExploreCocktail from './ExploreCocktail';

export default class ExploreBoard extends Component {
    render() {
        return (
            <React.Fragment>
                {
                    this.props.ibaCocktails.map(ibaCocktail => {
                        return <ExploreCocktail key={ibaCocktail.id} {...this.props} ibaCocktail={ibaCocktail} />
                    })
                }
            </React.Fragment>
        )
    }
}