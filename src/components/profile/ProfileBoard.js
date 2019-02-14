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
                let cocktailIngredients = this.props.cocktailIngredients.filter(ingr => {
                    return ingr.cocktailId === cocktail.id;
                });
                let canMake = false;
                cocktailIngredients.forEach(cocktailIngr => {
                    if (userIngredients.find(ingr => ingr.ingredientId === cocktailIngr.ingredientId)) {
                        canMake = true;
                    }
                });
                if (canMake) {
                    return cocktail
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