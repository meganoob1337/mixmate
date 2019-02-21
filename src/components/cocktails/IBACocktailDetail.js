import React, { Component } from 'react';
import './CocktailDetail.css';

export default class IBACocktailDetail extends Component {
    render() {
        let i = 0;
            return (
            <React.Fragment>
            <div className="modal is-active">
                <div className="modal-background"
                    onClick={this.props.toggleDetailModal}></div>
                <div className="modal-card">
                    <button className="modal-close is-large"
                        onClick={this.props.toggleDetailModal}></button>
                    <h2 className="modal-card-head">{this.props.cocktail.name}</h2>
                    <section className="modal-card-body-custom">
                        <ul>Ingredients:
                        {
                            this.props.cocktail.ingredients.map(cocktailIngredient => {
                                i++;
                                let amount = "";
                                let unit = "";
                                if (cocktailIngredient.unit === "cl") {
                                    unit = "oz";
                                    amount = +(cocktailIngredient.amount * 0.33814).toFixed(1);
                                } else {
                                    unit = cocktailIngredient.unit;
                                    amount = cocktailIngredient.amount;
                                };
                                if (cocktailIngredient.label) {
                                    return <li key={i}>{amount} {unit} {cocktailIngredient.label}</li>
                                } else if (cocktailIngredient.ingredient) {
                                    return <li key={i}>{amount} {unit} {cocktailIngredient.ingredient}</li>
                                } else {
                                    return <li key={i}>{cocktailIngredient.special}</li>
                                }
                            })
                        }
                        </ul>
                        <p>Glass: {this.props.cocktail.glass}</p>
                        <p>Preparation: {this.props.cocktail.preparation}</p>
                    </section>
                </div>
            </div>
            </React.Fragment>
        )
    }
}