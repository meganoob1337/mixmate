import React, { Component } from 'react';
import ProfileCocktail from './ProfileCocktail';
import ProfileForm from './ProfileForm';

export default class ProfileBoard extends Component {
    render() {
        let currentUserCocktails = this.props.userCocktails.filter(userCocktail => {
            return userCocktail.userId === Number(sessionStorage.getItem("userId"));
        });
        let savedCocktails = this.props.cocktails.filter(cocktail => {
            return currentUserCocktails.some(currentUserCocktail => {
              return cocktail.id === currentUserCocktail.cocktailId
            });
        });
        let savedIbaCocktails = this.props.ibaCocktails.filter(ibaCocktail => {
            return currentUserCocktails.some(currentUserCocktail => {
              return ibaCocktail.id === currentUserCocktail.cocktailId
            });
        });
        return (
            <React.Fragment>
                {
                    savedCocktails.map(cocktail => {
                        return <ProfileCocktail key={cocktail.id} {...this.props} cocktail={cocktail} />
                    })
                }
                {
                    savedIbaCocktails.map(ibaCocktail => {
                        return <ProfileCocktail key={ibaCocktail.id} {...this.props} ibaCocktail={ibaCocktail} />
                    })
                }
                <ProfileForm {...this.props} />
            </React.Fragment>
        )
    }
}