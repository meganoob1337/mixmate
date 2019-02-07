import React, { Component } from 'react';
import CocktailDetail from '../cocktails/CocktailDetail';
import IBACocktailDetail from '../cocktails/IBACocktailDetail';

export default class ProfileCard extends Component {

    handleDeleteButton = () => {
        const idToDelete = this.props.cocktail.id;
        this.props.deleteItem("cocktails", idToDelete);
    }

    handleRemoveButton = () => {
        let cocktailId = this.props.cocktail.id
        let userCocktailToDelete = this.props.userCocktails.find(userCocktail =>{
            return userCocktail.cocktailId === cocktailId;
        });
        this.props.deleteItem("userCocktails", userCocktailToDelete.id);
    }

    render() {

        let cocktailIngredients = this.props.cocktailIngredients ? this.props.cocktailIngredients.filter(cocktailIngredient => {
            return cocktailIngredient.cocktailId === this.props.cocktail.id
        }) : [];

        let cocktailCreator = this.props.users.find(user => {
            return user.id === this.props.cocktail.userId;
            }) ? this.props.users.find(user => {
            return user.id === this.props.cocktail.userId;
        }).userName : "";

        if (this.props.cocktail.id > 77 && this.props.cocktail.userId === Number(sessionStorage.getItem("userId"))) {
            return (
                <section>
                    <CocktailDetail {...this.props} cocktailIngredients={cocktailIngredients} />
                    <p>Create By You</p>
                    <button type="button">Edit</button>
                    <button type="button" onClick={this.handleDeleteButton}>Delete</button>
                </section>
            )
        } else if (this.props.cocktail.id > 77) {
            return (
                <section>
                    <CocktailDetail {...this.props} cocktailIngredients={cocktailIngredients} />
                    <p>Created By {cocktailCreator}</p>
                    <button type="button" onClick={this.handleRemoveButton}>Remove</button>
                </section>
            )
        } else {
            return (
                <section>
                    <IBACocktailDetail {...this.props} />
                    <button type="button" onClick={this.handleRemoveButton}>Remove</button>
                </section>
            )
        }
    }
}