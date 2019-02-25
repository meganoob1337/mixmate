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
        selectedOther: [],
        itemsToDelete: []
    }

    handleFieldChange = (value, target) => {
        let difference = this.state[target.name].filter(x => !value.includes(x));
        this.setState({
            itemsToDelete: this.state.itemsToDelete.concat(difference.filter(diff => diff.id))
        });
        this.setState({
            [target.name]: value
        });
    }

    handleSubmitButton = () => {
        Object.keys(this.state).forEach(stateName => {
            this.state[stateName].forEach(item => {
                if (stateName === "itemsToDelete") {
                    this.props.deleteItem("userIngredients", item.id)
                    .then(() => this.setState({itemsToDelete: this.state.itemsToDelete.filter(x => x !== item)}))
                } else if (!item.id) {
                    let objToPost = {
                        userId: Number(sessionStorage.getItem("userId")),
                        ingredientId: this.props.ingredients.find(ingredient => {
                            return ingredient.name === item.label;
                        }).id
                    };
                    this.props.postItem("userIngredients", objToPost)
                }
            })
        })
    }

    componentDidMount() {
        let currentUserIngredients = this.props.userIngredients.filter(ingr => {
            return ingr.userId === Number(sessionStorage.getItem("userId"))
        });
        Object.keys(this.state).forEach(stateName => {
            if (stateName === "selectedWine") {
                this.setState({
                    [stateName]: currentUserIngredients.filter(ingr => ingr.ingredient.type === "Wine/Fortified Wine").map(ingr => {
                        return {
                            value: ingr.ingredient.name,
                            label: ingr.ingredient.name,
                            id: ingr.id
                        }
                    }),
                })
            } else if (stateName !== "itemsToDelete") {
                this.setState({
                    [stateName]: currentUserIngredients.filter(ingr => ingr.ingredient.type === stateName.split("selected")[1]).map(ingr => {
                        return {
                            value: ingr.ingredient.name,
                            label: ingr.ingredient.name,
                            id: ingr.id
                        }
                    }),
                })
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        let currentUserIngredients = nextProps.userIngredients.filter(ingr => {
            return ingr.userId === Number(sessionStorage.getItem("userId"))
        });
        Object.keys(this.state).forEach(stateName => {
            if (stateName === "selectedWine") {
                this.setState({
                    [stateName]: currentUserIngredients.filter(ingr => ingr.ingredient.type === "Wine/Fortified Wine").map(ingr => {
                        return {
                            value: ingr.ingredient.name,
                            label: ingr.ingredient.name,
                            id: ingr.id
                        }
                    }),
                })
            } else if (stateName !== "itemsToDelete") {
                this.setState({
                    [stateName]: currentUserIngredients.filter(ingr => ingr.ingredient.type === stateName.split("selected")[1]).map(ingr => {
                        return {
                            value: ingr.ingredient.name,
                            label: ingr.ingredient.name,
                            id: ingr.id
                        }
                    }),
                })
            }
        })
    }

    render() {
        return(
            <React.Fragment>
            <p className="inventoryHeader">Inventory</p>
            <hr className="custom-hr" />
            <p className="inventorySubHeader">Select Your Ingredients:</p>
                {this.props.ingredients &&
                    this.props.ingredientTypeOptions.map(ingredientType => {
                        let options = this.props.ingredients.filter(ingredient => {
                            return ingredient.type === ingredientType.name;
                        }).map(ingredient => {
                            return { value: ingredient.name, label: ingredient.name }
                        });
                        if (ingredientType.name === "Wine/Fortified Wine") {
                            return <Select
                            closeMenuOnSelect={false}
                            blurInputOnSelect={false}
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
                            closeMenuOnSelect={false}
                            blurInputOnSelect={false}
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
                className="submit-button"
                onClick={this.handleSubmitButton}>Submit</button>
            </React.Fragment>
        )
    }
}
