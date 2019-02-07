import React, { Component } from 'react';
import ExploreCard from './ExploreCard';

export default class ExploreBoard extends Component {
    render() {
        return (
            <React.Fragment>
                {
                    this.props.cocktails.map(cocktail => {
                        return <ExploreCard key={cocktail.id} {...this.props} cocktail={cocktail} />
                    })
                }
            </React.Fragment>
        )
    }
}