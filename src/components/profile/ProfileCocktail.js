import React, { Component } from 'react';

export default class ProfileCocktail extends Component {

    handleDeleteButton = () => {
        const idToDelete = this.props.cocktail.id;
        this.props.deleteItem("cocktails", idToDelete);
    }

    handleRemoveButton = () => {
        let cocktailId = "";
        if (this.props.ibaCocktail) {
            cocktailId = this.props.ibaCocktail.id;
        } else {
            cocktailId = this.props.cocktail.id;
        }
        let userCocktailToDelete = this.props.userCocktails.find(userCocktail =>{
            return userCocktail.cocktailId === cocktailId;
        });
        console.log(userCocktailToDelete.id);
        this.props.deleteItem("userCocktails", userCocktailToDelete.id);
    }

    render() {
        if (this.props.cocktail && this.props.cocktail.userId === Number(sessionStorage.getItem("userId")) ) {
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
                    <p>Glass: {this.props.cocktail.glass}</p>
                    <p>Preparation: {this.props.cocktail.preparation}</p>
                    <button type="button">Edit</button>
                    <button type="button" onClick={this.handleDeleteButton}>Delete</button>
                </section>
            )
        } else if (this.props.cocktail) {
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
                    <p>Glass: {this.props.cocktail.glass}</p>
                    <p>Preparation: {this.props.cocktail.preparation}</p>
                    <button type="button" onClick={this.handleRemoveButton}>Remove</button>
                </section>
            )
        } else {
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
                <button type="button" onClick={this.handleRemoveButton}>Remove</button>
                </section>
            )
        }
    }
}