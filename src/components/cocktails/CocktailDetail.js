import React, { Component } from 'react';

export default class CocktailDetail extends Component {
    render() {
            return (
            <React.Fragment>
                <h3>{this.props.cocktail.name}</h3>
                <ul>Ingredients:
                {
                    this.props.cocktailIngredients.map(cocktailIngredient => {
                        return <li key={cocktailIngredient.id}>{cocktailIngredient.amount} {cocktailIngredient.unit} {cocktailIngredient.label}</li>
                    })
                }
                </ul>
                <p>Glass: {this.props.cocktail.glass}</p>
                <p>Preparation: {this.props.cocktail.preparation}</p>
            </React.Fragment>
        )
    }
}