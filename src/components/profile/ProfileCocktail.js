import React, { Component } from 'react';

export default class ProfileCocktail extends Component {
    // getCocktailIngredients = () => {
    //     let cocktailIngredients = this.props.cocktailIngredients ? this.props.cocktailIngredients.filter(cocktailIngredient => {
    //         return cocktailIngredient.cocktailId === this.props.cocktail.id
    //     }) : [];
    //     return cocktailIngredients;
    // }

    handleDeleteButton = () => {
        const idToDelete = this.props.cocktail.id;
        this.props.deleteItem("cocktails", idToDelete);
        // this.getCocktailIngredients().forEach(cocktailIngredient => {
        //     this.props.deleteItem("cocktailIngredients", cocktailIngredient.id)
        // });
    }

    render() {
        let cocktailIngredients = this.props.cocktailIngredients ? this.props.cocktailIngredients.filter(cocktailIngredient => {
            return cocktailIngredient.cocktailId === this.props.cocktail.id
        }) : [];
        return (
            <section>
                <h3>{this.props.cocktail.name}</h3>
                <ul>Ingredients:
                {
                    cocktailIngredients.map(cocktailIngredient => {
                        return <li key={cocktailIngredient.id}>{cocktailIngredient.amount} {cocktailIngredient.unit} {cocktailIngredient.label}</li>
                    })
                }
                </ul>
                <p>Preparation: {this.props.cocktail.preparation}</p>
                <button type="button">Edit</button>
                <button type="button" onClick={this.handleDeleteButton}>Delete</button>
            </section>
        )
    }
}