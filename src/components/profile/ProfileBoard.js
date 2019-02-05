import React, { Component } from 'react';
import ProfileCocktail from './ProfileCocktail';
import ProfileForm from './ProfileForm';

export default class ProfileBoard extends Component {
    render() {
        return (
            <React.Fragment>
                {
                    this.props.cocktails.map(cocktail => {
                        return <ProfileCocktail key={cocktail.id} {...this.props} cocktail={cocktail} />
                    })
                }
                <ProfileForm {...this.props} />
            </React.Fragment>
        )
    }
}