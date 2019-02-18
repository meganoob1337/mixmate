import React, { Component } from 'react';
import ExploreCard from './ExploreCard';
// import Filters from '../filters/Filters';
import './Explore.css'

export default class ExploreBoard extends Component {
    state = {
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
                filteredCocktails: this.props.cocktails
            });
        }
    }

    componentWillMount() {
        this.setState({
            filteredCocktails: this.props.cocktails,
            checkboxValue: false
        })
    }

    render() {
        return (
            <React.Fragment>
                <h1 className="exploreHeader">Find New Cocktails</h1>
                <label htmlFor="ingredientFilter">Filter By Available Ingredients:</label>
                <input type="checkbox"
                name="ingredientFilter"
                onChange={this.handleFilterCheckbox} />
                {
                    this.state.filteredCocktails.map(cocktail => {
                        return <ExploreCard key={cocktail.id} {...this.props} cocktail={cocktail} />
                    })
                }
            </React.Fragment>
        )
    }
}