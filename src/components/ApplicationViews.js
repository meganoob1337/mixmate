import { Route } from 'react-router-dom';
import React, { Component } from 'react';
import DataManager from '../modules/DataManager';
import ProfileBoard from './profile/ProfileBoard';
import ExploreBoard from './explore/ExploreBoard';

export default class ApplicationViews extends Component {

    state = {
        users: [],
        ibaCocktails: [],
        cocktails: [],
        ingredients: [],
        cocktailIngredients: [],
        userCocktails: [],
    }

    postItem = (dataSet, databaseObject) => {
        console.log(databaseObject);
        console.log(dataSet);
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
        if (stateName === "ibaCocktails") {
            DataManager.dataManager({
                "dataSet": stateName,
                "fetchType": "GET-ALL-IBA",
            })
            .then(dataSet => {
                this.setState({
                    [stateName]: dataSet
                });
            });
        } else if (stateName === "cocktailIngredients") {
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

    render() {
        return (
            <React.Fragment>
                <Route exact path="/" render={props => {
                    return <ProfileBoard {...props}
                    ibaCocktails={this.state.ibaCocktails}
                    cocktails={this.state.cocktails}
                    cocktailIngredients={this.state.cocktailIngredients}
                    userCocktails={this.state.userCocktails}
                    postItem={this.postItem}
                    deleteItem={this.deleteItem} />
                }}
                />

                <Route exact path="/explore" render={props => {
                    return <ExploreBoard {...props}
                    ibaCocktails={this.state.ibaCocktails}
                    cocktails={this.state.cocktails}
                    postItem={this.postItem} />
                }}
                />

            </React.Fragment>
        );
    }

}
