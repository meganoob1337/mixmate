import React, { Component } from 'react';
import setCardBackground from '../backgrounds';
import './CocktailDetail.css';

export default class CocktailDetail extends Component {
    render() {
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
                            this.props.cocktailIngredients.map(cocktailIngredient => {
                                return <li key={cocktailIngredient.id}>{cocktailIngredient.amount} {cocktailIngredient.unit} {cocktailIngredient.label}</li>
                            })
                        }
                        </ul>
                        {this.props.lackingIngredients[0] &&
                            <ul className="lacking-ingredients">Ingredients Lacking:
                            {
                                this.props.lackingIngredients.map(lackingIngredient => {
                                    return <li key={lackingIngredient.id}>{lackingIngredient.ingredient.name}</li>
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