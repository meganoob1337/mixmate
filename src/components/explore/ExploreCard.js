// This component is responsible for functionality and rendering of the explore section cocktail cards

import React, { Component } from 'react';
import IBACocktailDetail from '../cocktails/IBACocktailDetail';
import CocktailDetail from '../cocktails/CocktailDetail';
import setCardBackground from '../backgrounds';

export default class ExploreCard extends Component {

    state = {
        toggleDetailModal: "",
        lackingIngredients: []
    }

    ingredientsFilter = () => {
        let userIngredients = this.props.userIngredients.filter(ingr => {
            return ingr.userId === Number(localStorage.getItem("userId"));
        });
        if (this.props.cocktail.id > 77) {
            let cocktailIngredients = this.props.cocktailIngredients.filter(ingr => {
                return ingr.cocktailId === this.props.cocktail.id;
            });
            this.setState({
                lackingIngredients: cocktailIngredients.filter(cocktailIngr => {
                    if (!userIngredients.find(ingr => ingr.ingredientId === cocktailIngr.ingredientId)) {
                        return cocktailIngr
                    } else {
                        return null
                    }
                })
            })
        } else {
            this.setState({
                lackingIngredients: this.props.cocktail.ingredients.filter(cocktailIngr => {
                    if (!(userIngredients.find(ingr => ingr.ingredient.name === cocktailIngr.ingredient) || cocktailIngr.special)) {
                        return cocktailIngr.ingredient
                    } else {
                        return null
                    }
                })
            });
        }
    }

    toggleDetailModal = () => {
        this.setState({
            toggleDetailModal: !this.state.toggleDetailModal
        })
    }

    handleSaveButton = () => {
        let objectToPost = {
            userId: Number(localStorage.getItem("userId")),
            cocktailId: this.props.cocktail.id,
            comment: ""
        };
        this.props.postItem("userCocktails", objectToPost);
    }

    componentWillReceiveProps() {
        this.ingredientsFilter();
    }

    componentDidMount() {
        this.setState({
            toggleDetailModal: false
        })
        this.ingredientsFilter();
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
        }).name : "";

        if (this.props.cocktail.id > 77 &&
            this.props.cocktail.userId !== Number(localStorage.getItem("userId"))) {
            return (
                <section className="card"
                id={setCardBackground(this.props.cocktail)}>
                    <div onClick={this.toggleDetailModal}>
                        <p className="title is-4">{this.props.cocktail.name}</p>
                        {this.state.toggleDetailModal &&
                            <CocktailDetail {...this.props} toggleDetailModal={this.toggleDetailModal} cocktailIngredients={cocktailIngredients} lackingIngredients={this.state.lackingIngredients} />
                        }
                        {this.state.lackingIngredients[0] &&
                            <p className="lacking-text">*Lacking Necessary Ingredients</p>
                        }
                        <p>Created By {cocktailCreator}</p>
                    </div>
                    <footer className="card-footer">
                        {!savedCocktails.some(savedCocktail => savedCocktail.id === this.props.cocktail.id) &&
                            <button type="button" className="button is-light" onClick={this.handleSaveButton}>Save</button>
                        }
                        {savedCocktails.some(savedCocktail => savedCocktail.id === this.props.cocktail.id) &&
                            <p>Saved in Profile</p>
                        }
                    </footer>
                </section>
            )
        } else if (this.props.cocktail.id <= 77) {
                return (
                    <section className="card"
                    id={setCardBackground(this.props.cocktail)}>
                        <div onClick={this.toggleDetailModal}>
                            <p className="title is-4">{this.props.cocktail.name}</p>
                            {this.state.toggleDetailModal &&
                                <IBACocktailDetail {...this.props} toggleDetailModal={this.toggleDetailModal} lackingIngredients={this.state.lackingIngredients} />
                            }
                            {this.state.lackingIngredients[0] &&
                                <p className="lacking-text">*Lacking Necessary Ingredients</p>
                            }
                            <p>IBA Official Cocktail</p>
                        </div>
                        <footer className="card-footer">
                            {!savedCocktails.some(savedCocktail => savedCocktail.id === this.props.cocktail.id) &&
                                <button type="button" className="button is-light" onClick={this.handleSaveButton}>Save</button>
                            }
                            {savedCocktails.some(savedCocktail => savedCocktail.id === this.props.cocktail.id) &&
                                <p>Saved in Profile</p>
                            }
                        </footer>
                    </section>
                )
            } else {
                return null;
            }
    }
}