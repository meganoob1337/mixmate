// This component is responsible for rendering the various cocktail cards on the profile section

import React, { Component } from 'react';
import CocktailDetail from '../cocktails/CocktailDetail';
import IBACocktailDetail from '../cocktails/IBACocktailDetail';
import ProfileEdit from './ProfileEdit';
import setCardBackground from '../backgrounds';
import './Profile.css';

export default class ProfileCard extends Component {

    state = {
        toggleEditModal: "",
        toggleDetailModal: "",
        lackingIngredients: []
    }

    toggleEditModal = () => {
        this.setState({
            toggleEditModal: !this.state.toggleEditModal
        })
    }

    toggleDetailModal = () => {
        this.setState({
            toggleDetailModal: !this.state.toggleDetailModal
        })
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

    handleDeleteButton = () => {
        const cocktailId = this.props.cocktail.id;
        let userCocktailToDelete = this.props.userCocktails.find(userCocktail => {
            return userCocktail.cocktailId === cocktailId;
        });
        this.props.deleteItem("userCocktails", userCocktailToDelete.id)
        this.props.deleteItem("cocktails", cocktailId);
    }

    handleRemoveButton = () => {
        let cocktailId = this.props.cocktail.id;
        let userCocktailToDelete = this.props.userCocktails.find(userCocktail => {
            return userCocktail.cocktailId === cocktailId;
        });
        this.props.deleteItem("userCocktails", userCocktailToDelete.id);
    }

    handleEditButton = () => {
        this.toggleEditModal();
    }

    componentWillReceiveProps() {
        this.ingredientsFilter();
    }

    componentDidMount() {
        this.setState({
            toggleEditModal: false,
            toggleDetailModal: false
        })
        this.ingredientsFilter();
    }

    render() {

        let cocktailIngredients = this.props.cocktailIngredients ? this.props.cocktailIngredients.filter(cocktailIngredient => {
            return cocktailIngredient.cocktailId === this.props.cocktail.id
        }) : [];

        let cocktailCreator = this.props.users.find(user => {
            return user.id === this.props.cocktail.userId;
            }) ? this.props.users.find(user => {
            return user.id === this.props.cocktail.userId;
        }).name : "";

        if (this.props.cocktail.id > 77 && this.props.cocktail.userId === Number(localStorage.getItem("userId"))) {
            return (
                <section className="card"
                id={setCardBackground(this.props.cocktail)}>
                    <div onClick={this.toggleDetailModal}>
                        <p className="title is-4">{this.props.cocktail.name}</p>
                        {this.state.lackingIngredients[0] &&
                            <p className="lacking-text">*Lacking Necessary Ingredients</p>
                        }
                        <p>Created By You</p>
                    </div>
                    {this.state.toggleDetailModal &&
                        <CocktailDetail {...this.props} toggleDetailModal={this.toggleDetailModal} cocktailIngredients={cocktailIngredients} lackingIngredients={this.state.lackingIngredients} />
                    }
                    <footer className="card-footer">
                        <button type="button" className="button is-light" onClick={this.handleEditButton}>Edit</button>
                        {this.state.toggleEditModal &&
                            <ProfileEdit {...this.props} toggleEditModal={this.toggleEditModal} />
                        }
                        <button type="button"  className="button is-light" onClick={this.handleDeleteButton}>Delete</button>
                    </footer>
                </section>
            )
        } else if (this.props.cocktail.id > 77) {
            return (
                <section className="card card-custom"
                id={setCardBackground(this.props.cocktail)}>
                    <div onClick={this.toggleDetailModal} className="card-custom-detail">
                        <p className="title is-4">{this.props.cocktail.name}</p>
                        {this.state.lackingIngredients[0] &&
                            <p className="lacking-text">*Lacking Necessary Ingredients</p>
                        }
                        <p>Created By {cocktailCreator}</p>
                    </div>
                    {this.state.toggleDetailModal &&
                        <CocktailDetail {...this.props} toggleDetailModal={this.toggleDetailModal} cocktailIngredients={cocktailIngredients} lackingIngredients={this.state.lackingIngredients}/>
                    }
                    <button className="delete is-medium card-custom-delete" onClick={this.handleRemoveButton} />
                </section>
            )
        } else {
            return (
                <section className="card card-custom"
                id={setCardBackground(this.props.cocktail)}>
                    <div onClick={this.toggleDetailModal} className="card-custom-detail">
                        <h2 className="title is-4">{this.props.cocktail.name}</h2>
                        {this.state.lackingIngredients[0] &&
                            <p className="lacking-text">*Lacking Necessary Ingredients</p>
                        }
                        <p>IBA Official Cocktail</p>
                    </div>
                    {this.state.toggleDetailModal &&
                        <IBACocktailDetail {...this.props} toggleDetailModal={this.toggleDetailModal} lackingIngredients={this.state.lackingIngredients} />
                    }
                    <button className="delete is-medium card-custom-delete" onClick={this.handleRemoveButton} />
                </section>
            )
        }
    }
}