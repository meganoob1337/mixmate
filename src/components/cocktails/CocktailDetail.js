import React, { Component } from 'react';
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
                    <p className="modal-card-head">{this.props.cocktail.name}</p>
                    <section className="modal-card-body">
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
                        <p>Preparation: {this.props.cocktail.preparation}</p>
                    </section>
                    <section className="modal-card-foot">
                    {!this.props.lackingIngredients[0] &&
                        <button type="button"
                            className="button is-success"> Make Cocktail</button>
                    }
                    </section>
                </div>
            </div>
            </React.Fragment>
        )
    }
}