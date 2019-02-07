import { Route } from 'react-router-dom';
import React, { Component } from 'react';
import DataManager from '../modules/DataManager';
import ProfileBoard from './profile/ProfileBoard';
import ExploreBoard from './explore/ExploreBoard';
import InventoryBoard from './inventory/InventoryBoard';

export default class ApplicationViews extends Component {

    state = {
        users: [],
        cocktails: [],
        ingredients: [],
        cocktailIngredients: [],
        userCocktails: [],
    }

    postItem = (dataSet, databaseObject) => {
        DataManager.dataManager({
            "dataSet": dataSet,
            "fetchType": "POST",
            "databaseObject": databaseObject
        })
        .then(() => this.handleGetAlls(dataSet))
    }

    deleteItem = (dataSet, specificId) => {
        DataManager.dataManager({
            "dataSet": dataSet,
            "specificId": specificId,
            "fetchType": "DELETE",
        })
        .then(() => this.handleGetAlls(dataSet));
    }

    handleGetAlls = (stateName) => {
        if (stateName === "cocktailIngredients") {
            DataManager.dataManager({
                "dataSet": stateName,
                "fetchType": "GET-ALL",
                "embedItem": "/?_expand=ingredient"
            })
            .then(dataSet => {
                this.setState({
                    [stateName]: dataSet
                });
            });
        } else {
            DataManager.dataManager({
                "dataSet": stateName,
                "fetchType": "GET-ALL",
                "embedItem": ""
            })
            .then(dataSet => {
                this.setState({
                    [stateName]: dataSet
                });
            });
        }
    }

    componentDidMount() {
        sessionStorage.setItem("userId", 1);
        Object.keys(this.state).forEach(stateName => {
            this.handleGetAlls(stateName);
        });
    }

    getSavedCocktails = () => {
        let currentUserCocktails = this.state.userCocktails.filter(userCocktail => {
            return userCocktail.userId === Number(sessionStorage.getItem("userId"));
        });
        let savedCocktails = this.state.cocktails.filter(cocktail => {
            return currentUserCocktails.some(currentUserCocktail => {
              return cocktail.id === currentUserCocktail.cocktailId
            });
        });
        return savedCocktails;
    }

    render() {
        return (
            <React.Fragment>
                <Route exact path="/" render={props => {
                    return <ProfileBoard {...props}
                    users={this.state.users}
                    cocktails={this.state.cocktails}
                    ingredients={this.state.ingredients}
                    cocktailIngredients={this.state.cocktailIngredients}
                    userCocktails={this.state.userCocktails}
                    postItem={this.postItem}
                    deleteItem={this.deleteItem}
                    getSavedCocktails={this.getSavedCocktails} />
                }}
                />

                <Route exact path="/explore" render={props => {
                    return <ExploreBoard {...props}
                    users={this.state.users}
                    cocktails={this.state.cocktails}
                    ingredients={this.state.ingredients}
                    cocktailIngredients={this.state.cocktailIngredients}
                    postItem={this.postItem}
                    getSavedCocktails={this.getSavedCocktails} />
                }}
                />

                <Route exact path="/inventory" render={props => {
                    return <InventoryBoard {...props}
                    cocktails={this.state.cocktails}
                    ingredients={this.state.ingredients}
                    postItem={this.postItem} />
                }}
                />

            </React.Fragment>
        );
    }

}
