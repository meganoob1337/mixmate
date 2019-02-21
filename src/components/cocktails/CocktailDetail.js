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
                    <h2 className="modal-card-head">{this.props.cocktail.name}</h2>
                    <section className="modal-card-body-custom">
                        <ul>Ingredients:
                        {
                            this.props.cocktailIngredients.map(cocktailIngredient => {
                                return <li key={cocktailIngredient.id}>{cocktailIngredient.amount} {cocktailIngredient.unit} {cocktailIngredient.label}</li>
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