import React, { Component } from 'react';

export default class IBACocktailDetail extends Component {
    render() {
        let i = 0;
            return (
            <React.Fragment>
                <h3>{this.props.cocktail.name}</h3>
                <ul>Ingredients:
                {
                    this.props.cocktail.ingredients.map(cocktailIngredient => {
                        i++;
                        let amount = "";
                        let unit = "";
                        if (cocktailIngredient.unit === "cl") {
                            unit = "oz";
                            amount = +(cocktailIngredient.amount * 0.33814).toFixed(1);
                        } else {
                            unit = cocktailIngredient.unit;
                            amount = cocktailIngredient.amount;
                        };
                        if (cocktailIngredient.label) {
                            return <li key={i}>{amount} {unit} {cocktailIngredient.label}</li>
                        } else if (cocktailIngredient.ingredient) {
                            return <li key={i}>{amount} {unit} {cocktailIngredient.ingredient}</li>
                        } else {
                            return <li key={i}>{cocktailIngredient.special}</li>
                        }
                    })
                }
                </ul>
                <p>Glass: {this.props.cocktail.glass}</p>
                <p>Preparation: {this.props.cocktail.preparation}</p>
                <p>IBA Official Cocktail</p>
            </React.Fragment>
        )
    }
}