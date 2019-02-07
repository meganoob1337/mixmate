import React, { Component } from 'react';
import ProfileCard from './ProfileCard';
import ProfileForm from './ProfileForm';

export default class ProfileBoard extends Component {
    state = {
        toggleCreateModal: false
    }

    toggleCreateModal = () => {
        this.setState({
            toggleCreateModal: !this.state.toggleCreateModal
        })
    }

    render() {
        let savedCocktails = this.props.getSavedCocktails();
        return (
            <React.Fragment>
                {
                    savedCocktails.map(cocktail => {
                        return <ProfileCard key={cocktail.id} {...this.props} cocktail={cocktail} />
                    })
                }
                {!this.state.toggleCreateModal &&
                    <button type="button"
                    className="createCocktailButton"
                    onClick={this.toggleCreateModal}>Create New Cocktail</button>
                }
                {this.state.toggleCreateModal &&
                    <ProfileForm {...this.props} toggleCreateModal={this.toggleCreateModal} />
                }
            </React.Fragment>
        )
    }
}