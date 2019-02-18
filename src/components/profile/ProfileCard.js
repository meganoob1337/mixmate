import React, { Component } from 'react';
import CocktailDetail from '../cocktails/CocktailDetail';
import IBACocktailDetail from '../cocktails/IBACocktailDetail';
import ProfileEdit from './ProfileEdit';
import './Profile.css';

export default class ProfileCard extends Component {

    state = {
        toggleEditModal: ""
    }

    toggleEditModal = () => {
        this.setState({
            toggleEditModal: !this.state.toggleEditModal
        })
    }

    handleDeleteButton = () => {
        const idToDelete = this.props.cocktail.id;
        this.props.deleteItem("cocktails", idToDelete);
    }

    handleRemoveButton = () => {
        let cocktailId = this.props.cocktail.id;
        let userCocktailToDelete = this.props.userCocktails.find(userCocktail => {
            return userCocktail.cocktailId === cocktailId;
        });
        console.log(userCocktailToDelete.id);
        this.props.deleteItem("userCocktails", userCocktailToDelete.id);
    }

    handleEditButton = () => {
        this.toggleEditModal();
    }

    componentDidMount() {
        this.setState({
            toggleEditModal: false
        })
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
                <section className="cocktailCard">
                    <CocktailDetail {...this.props} cocktailIngredients={cocktailIngredients} />
                    <p>Created By You</p>
                    <button type="button" className="btn btn-secondary" onClick={this.handleEditButton}>Edit</button>
                    {this.state.toggleEditModal &&
                    <ProfileEdit {...this.props} toggleEditModal={this.toggleEditModal} />
                    }
                    <button type="button"  className="btn btn-secondary" onClick={this.handleDeleteButton}>Delete</button>
                </section>
            )
        } else if (this.props.cocktail.id > 77) {
            return (
                <section className="cocktailCard">
                    <CocktailDetail {...this.props} cocktailIngredients={cocktailIngredients} />
                    <p>Created By {cocktailCreator}</p>
                    <button type="button"  className="btn btn-secondary" onClick={this.handleRemoveButton}>Remove</button>
                </section>
            )
        } else {
            return (
                <section className="cocktailCard">
                    <IBACocktailDetail {...this.props} />
                    <button type="button"  className="btn btn-secondary" onClick={this.handleRemoveButton}>Remove</button>
                </section>
            )
        }
    }
}