import React, { Component } from 'react';
import IBACocktailDetail from '../cocktails/IBACocktailDetail';
import CocktailDetail from '../cocktails/CocktailDetail';

export default class ExploreCard extends Component {

    handleSaveButton = () => {
        let objectToPost = {
            userId: Number(sessionStorage.getItem("userId")),
            cocktailId: this.props.cocktail.id,
            comment: ""
        };
        this.props.postItem("userCocktails", objectToPost);
    }

    render() {

        let savedCocktails = this.props.getSavedCocktails();

        let cocktailIngredients = this.props.cocktailIngredients ? this.props.cocktailIngredients.filter(cocktailIngredient => {
            return cocktailIngredient.cocktailId === this.props.cocktail.id
        }) : [];

        let cocktailCreator = this.props.users.find(user => {
            return user.id === this.props.cocktail.userId;
            }) ? this.props.users.find(user => {
            return user.id === this.props.cocktail.userId;
        }).userName : "";

    if (this.props.cocktail.id > 77 &&
        this.props.cocktail.userId !== Number(sessionStorage.getItem("userId")) &&
        !savedCocktails.some(savedCocktail => savedCocktail.id !== this.props.cocktail.id)) {
        return (
            <section>
                <CocktailDetail {...this.props} cocktailIngredients={cocktailIngredients} />
                <p>Created By {cocktailCreator}</p>
                <button type="button" onClick={this.handleSaveButton}>Save</button>
            </section>
        )
    } else if (this.props.cocktail.id > 77 &&
        this.props.cocktail.userId !== Number(sessionStorage.getItem("userId"))) {
        return (
            <section>
                <CocktailDetail {...this.props} cocktailIngredients={cocktailIngredients} />
                <p>Created By {cocktailCreator}</p>
                <p>Saved in Profile</p>
            </section>
        )
        } else if (this.props.cocktail.id <= 77 &&
            !savedCocktails.some(savedCocktail => savedCocktail.id === this.props.cocktail.id)) {
            return (
                <section>
                    <IBACocktailDetail {...this.props} />
                    <button type="button" onClick={this.handleSaveButton}>Save</button>
                </section>
            )
        } else if (this.props.cocktail.id <= 77) {
            return (
                <section>
                    <IBACocktailDetail {...this.props} />
                    <p>Saved in Profile</p>
                </section>
            )
        } else {
            return null;
        }
    }
}