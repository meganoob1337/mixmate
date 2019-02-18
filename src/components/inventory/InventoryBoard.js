import React, { Component } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';
import './Inventory.css';

export default class InventoryBoard extends Component {
    state = {
        selectedLiquor: [],
        selectedLiqueur: [],
        selectedWine: [],
        selectedJuice: [],
        selectedBitters: [],
        selectedSweetener: [],
        selectedOther: []
    }

    handleFieldChange = (value, target) => {
        this.setState({
            [target.name]: value
        })
    }

    handleSubmitButton = () => {

    }

    componentDidMount() {
        let currentUserIngredients = this.props.userIngredients.filter(ingr => {
            return ingr.userId === Number(sessionStorage.getItem("userId"))
        });
        Object.keys(this.state).forEach(stateName => {
            this.setState({
                [stateName]: currentUserIngredients.filter(ingr => ingr.ingredient.type === stateName.split("selected")[1]).map(ingr => {
                    return {
                        value: ingr.ingredient.name,
                        label: ingr.ingredient.name,
                        id: ingr.ingredient.id
                    }
                }),
            })
        })
    }

    componentWillReceiveProps() {
        let currentUserIngredients = this.props.userIngredients.filter(ingr => {
            return ingr.userId === Number(sessionStorage.getItem("userId"))
        });
        Object.keys(this.state).forEach(stateName => {
            this.setState({
                [stateName]: currentUserIngredients.filter(ingr => ingr.ingredient.type === stateName.split("selected")[1]).map(ingr => {
                    return {
                        value: ingr.ingredient.name,
                        label: ingr.ingredient.name,
                        id: ingr.ingredient.id
                    }
                }),
            })
        })
    }

    render() {
        return(
            <React.Fragment>
            <h1 className="inventoryHeader">Inventory</h1>
                {this.props.ingredients &&
                    this.props.ingredientTypeOptions.map(ingredientType => {
                        let options = this.props.ingredients.filter(ingredient => {
                            return ingredient.type === ingredientType.name;
                        }).map(ingredient => {
                            return { value: ingredient.name, label: ingredient.name }
                        });
                        if (ingredientType === "Wine/Fortified Wine") {
                            return <Select
                            value={this.state.selectedWine ? this.state.selectedWine : ""}
                            name="selectedWine"
                            key={ingredientType.id}
                            onChange={this.handleFieldChange}
                            components={makeAnimated()}
                            placeholder={`Select ${ingredientType.name}...`}
                            isMulti
                            options={options} />
                        } else {
                            return <Select
                            value={this.state["selected"+ingredientType.name] ? this.state["selected"+ingredientType.name] : ""}
                            name={"selected"+ingredientType.name}
                            key={ingredientType.id}
                            onChange={this.handleFieldChange}
                            components={makeAnimated()}
                            placeholder={`Select ${ingredientType.name}...`}
                            isMulti
                            options={options} />
                        }
                    })
                }
                <button type="button"
                className="btn btn-secondary"
                onChange={this.handleSubmitButton}>Submit</button>
            </React.Fragment>
        )
    }
}
