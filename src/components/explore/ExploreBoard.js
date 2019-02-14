import React, { Component } from 'react';
import ExploreCard from './ExploreCard';
// import Filters from '../filters/Filters';

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