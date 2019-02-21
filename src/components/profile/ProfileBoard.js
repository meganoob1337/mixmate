import React, { Component } from 'react';
import ProfileCard from './ProfileCard';
import ProfileAdd from './ProfileAdd';

export default class ProfileBoard extends Component {
    state = {
        toggleCreateModal: "",
        toggleCreateButton: "",
        filteredCocktails: [],
        checkboxValue: ""
    }

    filterCocktails = () => {
        let userIngredients = this.props.userIngredients.filter(ingr => {
            return ingr.userId === Number(sessionStorage.getItem("userId"));
        });
        this.setState({
            filteredCocktails: this.state.filteredCocktails.filter(cocktail => {
                if (cocktail.id > 77) {
                    let cocktailIngredients = this.props.cocktailIngredients.filter(ingr => {
                        return ingr.cocktailId === cocktail.id;
                    });
                    let canMake = cocktailIngredients.every(cocktailIngr => {
                        return userIngredients.find(ingr => ingr.ingredientId === cocktailIngr.ingredientId)
                    });
                    if (canMake) {
                        return cocktail
                    } else {
                        return null
                    }
                } else {
                    let canMake = cocktail.ingredients.every(cocktailIngr => {
                        if (userIngredients.find(ingr => ingr.ingredient.name === cocktailIngr.ingredient) || cocktailIngr.special) {
                            return true
                        } else {
                            return false
                        }
                    });
                    if (canMake) {
                        return cocktail
                    } else {
                        return null
                    }
                }
            })
        });
    }

    handleFilterCheckbox = () => {
        if (this.state.checkboxValue === false) {
            this.filterCocktails();
            this.setState({
                checkboxValue: !this.state.checkboxValue
            });
        } else {
            this.setState({
                checkboxValue: !this.state.checkboxValue,
                filteredCocktails: this.props.getSavedCocktails()
            });
        }
    }

    toggleCreateModal = () => {
        this.setState({
            toggleCreateModal: !this.state.toggleCreateModal
        })
    }

    toggleCreateButton = () => {
        this.setState({
            toggleCreateButton: !this.state.toggleCreateButton
        })
    }

    componentWillReceiveProps() {
        this.setState({
            filteredCocktails: this.props.getSavedCocktails(),
        })
    }

    componentDidMount() {
        this.setState({
            toggleCreateModal: false,
            toggleCreateButton: true,
            filteredCocktails: this.props.getSavedCocktails(),
            checkboxValue: false
        })
    }

    render() {
        return (
            <React.Fragment>
                <h1 className="profileHeader">Saved Cocktails</h1>
                <label htmlFor="ingredientFilter">Filter By Available Ingredients:</label>
                <input type="checkbox"
                name="ingredientFilter"
                onChange={this.handleFilterCheckbox} />
                {
                    this.state.filteredCocktails.map(cocktail => {
                        return <ProfileCard key={cocktail.id}
                        {...this.props}
                        cocktail={cocktail}
                        toggleCreateButton={this.toggleCreateButton} />
                    })
                }
                {this.state.toggleCreateButton &&
                    <button type="button"
                    className="createCocktailButton"
                    onClick={this.toggleCreateModal}>Create New Cocktail</button>
                }
                {this.state.toggleCreateModal &&
                    <ProfileAdd {...this.props}
                    toggleCreateModal={this.toggleCreateModal}
                    toggleCreateButton={this.toggleCreateButton} />
                }
            </React.Fragment>
        )
    }
}