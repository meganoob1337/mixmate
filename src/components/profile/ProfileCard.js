import React, { Component } from 'react';
import CocktailDetail from '../cocktails/CocktailDetail';
import IBACocktailDetail from '../cocktails/IBACocktailDetail';
import ProfileEdit from './ProfileEdit';
import './Profile.css';

export default class ProfileCard extends Component {

    state = {
        toggleEditModal: "",
        toggleDetailModal: ""
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

    handleDetailsClick = () => {
        this.toggleDetailModal();
    }

    componentDidMount() {
        this.setState({
            toggleEditModal: false,
            toggleDetailModal: false
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
                <section className="card">
                    <div onClick={this.toggleDetailModal}>
                        <p className="title is-4">{this.props.cocktail.name}</p>
                        {this.state.toggleDetailModal &&
                            <CocktailDetail {...this.props} toggleDetailModal={this.toggleDetailModal} cocktailIngredients={cocktailIngredients} />
                        }
                        <p>Created By You</p>
                    </div>
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
                <section className="card card-custom">
                    <div onClick={this.toggleDetailModal} className="card-custom-detail">
                        <p className="title is-4">{this.props.cocktail.name}</p>
                        {this.state.toggleDetailModal &&
                            <CocktailDetail {...this.props} toggleDetailModal={this.toggleDetailModal} cocktailIngredients={cocktailIngredients} />
                        }
                        <p>Created By {cocktailCreator}</p>
                    </div>
                    <button className="delete is-medium card-custom-delete" onClick={this.handleRemoveButton} />
                </section>
            )
        } else {
            return (
                <section className="card card-custom">
                    <div onClick={this.toggleDetailModal} className="card-custom-detail">
                        <h2 className="title is-4">{this.props.cocktail.name}</h2>
                        {this.state.toggleDetailModal &&
                            <IBACocktailDetail {...this.props} toggleDetailModal={this.toggleDetailModal} />
                        }
                        <p>IBA Official Cocktail</p>
                    </div>
                    <button className="delete is-medium card-custom-delete" onClick={this.handleRemoveButton} />
                </section>
            )
        }
    }
}