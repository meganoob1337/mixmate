import React, { Component } from 'react';

export default class ExploreCocktail extends Component {

    handleSaveButton = () => {
        let objectToPost = {
            userId: Number(sessionStorage.getItem("userId")),
            cocktailId: this.props.ibaCocktail.id,
            comment: ""
        };
        this.props.postItem("userCocktails", objectToPost);
    }

    render() {
        let i = 0;
        return (
            <section>
                <h3>{this.props.ibaCocktail.name}</h3>
                <ul>Ingredients:
                {
                    this.props.ibaCocktail.ingredients.map(cocktailIngredient => {
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
                <p>Glass: {this.props.ibaCocktail.glass}</p>
                <p>Preparation: {this.props.ibaCocktail.preparation}</p>
                <button type="button" onClick={this.handleSaveButton}>Save</button>
            </section>
        )
    }
}