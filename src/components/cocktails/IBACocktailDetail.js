import React, { Component } from 'react';
import setCardBackground from '../backgrounds';
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
                    <p className="modal-card-head"
                    id={setCardBackground(this.props.cocktail)}>{this.props.cocktail.name}</p>
                    <section className="modal-card-body">
                        <p>Category: {this.props.cocktail.category}</p>
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
                        {this.props.lackingIngredients[0] &&
                            <ul className="lacking-ingredients">Ingredients Lacking:
                            {
                                this.props.lackingIngredients.map(lackingIngredient => {
                                    return <li key={this.props.lackingIngredients.indexOf(lackingIngredient)}>{lackingIngredient.ingredient}</li>
                                })
                            }
                            </ul>
                        }
                        <p>Glass: {this.props.cocktail.glass}</p>
                        <p>Directions: {this.props.cocktail.preparation}</p>
                    </section>
                    <section className="modal-card-foot"
                    id={setCardBackground(this.props.cocktail)}>
                    </section>
                </div>
            </div>
            </React.Fragment>
        )
    }
}