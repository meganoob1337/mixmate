// This component is responsible for rendering and functionality of the form modal for adding a custom cocktail to the database

import React, { Component } from 'react';
import './Profile.css';

export default class ProfileAdd extends Component {
    state = {
        cocktailNameInput: "",
        categorySelection: "",
        glassSelection: "",
        preparationInput: "",
        additionalSelectionFields: [],
        cocktailIngredientObjects: []
    }

    handleFieldChange = event => {
        let stateChange = event.target.name.split("--")[0];
        let objId = event.target.name.split("--")[1];
        let stateValue = event.target.value;
        const convertIngredientId = () => {
            if (stateChange === "ingredientId") {
                return this.props.ingredients.find(ingredient => {
                    return ingredient.name === stateValue;
                }).id;
            }
        };
        let cocktailIngredientProps = [
            "type",
            "ingredientId",
            "amount",
            "unit",
            "label",
            "required"
        ];
        if (stateChange === "required") {
            this.setState({
                cocktailIngredientObjects: this.state.cocktailIngredientObjects.map(cocktailIngredientObject => {
                    if (Number(objId) === cocktailIngredientObject.id) {
                            return {
                                ...cocktailIngredientObject,
                                [stateChange]: !cocktailIngredientObject[stateChange]
                            }
                    } else {
                        return cocktailIngredientObject;
                    }
                })
            })
        } else if (stateChange === "ingredientId") {
            this.setState({
                cocktailIngredientObjects: this.state.cocktailIngredientObjects.map(cocktailIngredientObject => {
                    if (Number(objId) === cocktailIngredientObject.id) {
                            return {
                                ...cocktailIngredientObject,
                                [stateChange]: convertIngredientId(),
                                ingredientName: stateValue
                            }
                    } else {
                        return cocktailIngredientObject;
                    }
                })
            })
        } else if (cocktailIngredientProps.find(propName => stateChange === propName)) {
            this.setState({
                cocktailIngredientObjects: this.state.cocktailIngredientObjects.map(cocktailIngredientObject => {
                    if (Number(objId) === cocktailIngredientObject.id) {
                            return {
                                ...cocktailIngredientObject,
                                [stateChange]: stateValue
                            }
                    } else {
                        return cocktailIngredientObject;
                    }
                })
            })
        } else {
            this.setState({
                [stateChange]: stateValue
            });
        }
    }

    handleRemoveButton = event => {
        let idToRemove = Number(event.target.name.split("--")[1]);
        this.setState({
            additionalSelectionFields: this.state.additionalSelectionFields.filter(id => {
                return id !== idToRemove
            }),
            cocktailIngredientObjects: this.state.cocktailIngredientObjects.filter(obj => {
                return obj.id !== idToRemove
            })
        })
    }

    handleAddButton = () => {
        const nextId = this.state.additionalSelectionFields[0] ? Number(this.state.additionalSelectionFields.slice(-1)[0] + 1) : 2
        this.setState({
            cocktailIngredientObjects: this.state.cocktailIngredientObjects.concat({
                id: nextId,
                ingredientId: "",
                ingredientName: "",
                amount: "",
                unit: "",
                label: "",
                required: false,
                type: ""
            }),
            additionalSelectionFields: this.state.additionalSelectionFields.concat([nextId])
        })
    }

    handleSubmitButton = () => {
        const cocktailObjToPost = {
            userId: Number(localStorage.getItem("userId")),
            name: this.state.cocktailNameInput,
            glass: this.state.glassSelection,
            category: this.state.categorySelection,
            preparation: this.state.preparationInput
        };
        this.props.postItem("cocktails", cocktailObjToPost)
        .then(() => {
            let userCocktailObjToPost = {
                userId: Number(localStorage.getItem("userId")),
                cocktailId: this.props.cocktails.slice(-1)[0].id,
                comment: ""
            };
            this.props.postItem("userCocktails", userCocktailObjToPost)
        })
        .then(() => {
            let arrayToPost = [];
            this.state.cocktailIngredientObjects.forEach(obj => {
                arrayToPost.push({
                    cocktailId: this.props.cocktails.slice(-1)[0].id,
                    ingredientId: obj.ingredientId,
                    amount: obj.amount,
                    unit: obj.unit,
                    label: obj.label,
                    required: obj.required
                })
            })
            arrayToPost.forEach(obj => {
                this.props.postItem("cocktailIngredients", obj);
            })
        })
        .then(() => {
            this.props.toggleCreateModal();
        })
    }

    componentWillMount() {
        this.props.toggleCreateButton();
        this.setState({
            cocktailIngredientObjects: this.state.cocktailIngredientObjects.concat({
                id: 1,
                ingredientId: "",
                amount: "",
                unit: "",
                label: "",
                required: false,
                type: ""
            }),
        })
    }

    componentWillUnmount() {
        this.props.toggleCreateButton();
    }

    render() {
        return (
            <React.Fragment>
                <form className="modal is-active">
                    <div className="modal-background"
                        onClick={this.props.toggleCreateModal}></div>
                    <div className="modal-card">
                        <button className="modal-close is-large"
                            onClick={this.props.toggleCreateModal}></button>
                        <p className="modal-card-head">New Cocktail</p>
                        <section className="modal-card-body">
                            <section className="details-section details-section-add">
                                <b>General Details:</b>
                                <fieldset>
                                    <input type="text"
                                    name="cocktailNameInput"
                                    placeholder="Cocktail Name"
                                    onChange={this.handleFieldChange} />
                                </fieldset>
                                <fieldset>
                                    <select value={this.state.categorySelection}
                                    name="categorySelection"
                                    onChange={this.handleFieldChange}>
                                    <option value="" disabled default hidden>Select Category...</option>
                                    {
                                        this.props.categoryOptions.map(category => {
                                            return <option key={category.id}
                                            className="option-custom"
                                            value={category.name}>{category.name}</option>
                                        })
                                    }
                                    </select>
                                </fieldset>
                                <fieldset>
                                    <select value={this.state.glassSelection}
                                    name="glassSelection"
                                    onChange={this.handleFieldChange}>
                                    <option value="" disabled default hidden>Select Glass...</option>
                                    {
                                        this.props.glassOptions.map(glass => {
                                            return <option key={glass.id}
                                            className="option-custom"
                                            value={glass.name}>{glass.name}</option>
                                        })
                                    }
                                    </select>
                                </fieldset>
                                <fieldset>
                                    <textarea name="preparationInput"
                                    placeholder="Instructions..."
                                    onChange={this.handleFieldChange} />
                                </fieldset>
                            </section>
                            <section className="ingredients-section ingredients-section-add">
                                <b>Ingredients:</b>
                                {/* INITIAL INGREDIENT SELECTION - NOT REMOVABLE FROM FORM */}
                                <fieldset className="ingredient-input">Ingredient 1
                                    <select value={this.state.cocktailIngredientObjects[0].type}
                                    name="type--1"
                                    onChange={this.handleFieldChange}>
                                    <option value="" disabled default hidden>Select Type...</option>
                                        {
                                            this.props.ingredientTypeOptions.map(ingredientType => {
                                                return <option key={ingredientType.id}
                                                className="option-custom"
                                                value={ingredientType.name}>{ingredientType.name}</option>
                                            })
                                        }
                                    </select>
                                    {(this.state.cocktailIngredientObjects[0].type !== "" && this.props.ingredients) &&
                                        <React.Fragment>
                                            <input type="text"
                                            name="label--1"
                                            placeholder="Ingredient Label"
                                            onChange={this.handleFieldChange} />
                                            <select value={this.state.cocktailIngredientObjects[0].ingredientName}
                                            name="ingredientId--1"
                                            defaultValue=""
                                            onChange={this.handleFieldChange}>
                                                <option value="" disabled default hidden>Select Ingredient...</option>
                                                {
                                                    this.props.ingredients.filter(ingredient => {
                                                        return ingredient.type === this.state.cocktailIngredientObjects[0].type;
                                                    }).map(ingredient => {
                                                        return <option key={ingredient.id}
                                                        className="option-custom"
                                                        value={ingredient.name}>{ingredient.name}</option>
                                                    })
                                                }
                                            </select>
                                            <input type="text"
                                            name="amount--1"
                                            placeholder="Amount"
                                            defaultValue=""
                                            onChange={this.handleFieldChange} />
                                            <select value={this.state.cocktailIngredientObjects[0].unit}
                                            name="unit--1"
                                            onChange={this.handleFieldChange}>
                                                <option value="" disabled default hidden>Select Unit...</option>
                                                {
                                                    this.props.unitOptions.map(unit => {
                                                        return <option key={unit.id}
                                                        className="option-custom"
                                                        value={unit.name}>{unit.name}</option>
                                                    })
                                                }
                                            </select>
                                            <label htmlFor="required--1">Required?</label>
                                            <span />
                                            <input type="checkbox"
                                            name="required--1"
                                            onChange={this.handleFieldChange} />
                                        </React.Fragment>
                                    }
                                </fieldset>
                                {/* ADDITIONAL INGREDIENT FIELDS AS NEEDED */}
                                {
                                    this.state.additionalSelectionFields.map(ingredientInputId => {
                                        let indexNumber = ingredientInputId -1;
                                        return <fieldset key={ingredientInputId}
                                        className="ingredient-input">
                                        Ingredient {ingredientInputId}
                                            <select value={this.state.cocktailIngredientObjects[indexNumber].type}
                                            name={"type--"+ingredientInputId}
                                            onChange={this.handleFieldChange}>
                                                <option value="" disabled default hidden>Select Type...</option>
                                                {
                                                    this.props.ingredientTypeOptions.map(ingredientType => {
                                                        return <option key={ingredientType.id}
                                                        className="option-custom"
                                                        value={ingredientType.name}>{ingredientType.name}</option>
                                                    })
                                                }
                                            </select>
                                            {(this.state.cocktailIngredientObjects[indexNumber].type && this.props.ingredients) &&
                                                <React.Fragment>
                                                    <input
                                                    type="text"
                                                    name={"label--"+ingredientInputId}
                                                    placeholder="Ingredient Label"
                                                    onChange={this.handleFieldChange} />
                                                    <select value={this.state.cocktailIngredientObjects[indexNumber].ingredientName}
                                                    defaultValue=""
                                                    name={"ingredientId--"+ingredientInputId}
                                                    onChange={this.handleFieldChange}>
                                                        <option value="" disabled default hidden>Select Ingredient...</option>
                                                        {
                                                            this.props.ingredients.filter(ingredient => {
                                                                return ingredient.type === this.state.cocktailIngredientObjects[indexNumber].type;
                                                            }).map(ingredient => {
                                                                return <option key={ingredient.id}
                                                                className="option-custom"
                                                                value={ingredient.name}>{ingredient.name}</option>
                                                            })
                                                        }
                                                    </select>
                                                    <input type="text"
                                                    name={"amount--"+ingredientInputId}
                                                    placeholder="Amount"
                                                    onChange={this.handleFieldChange} />
                                                    <select value={this.state.cocktailIngredientObjects[indexNumber].unit}
                                                    name={"unit--"+ingredientInputId}
                                                    onChange={this.handleFieldChange}>
                                                        <option value="" disabled default hidden>Select Unit...</option>
                                                        {
                                                            this.props.unitOptions.map(unit => {
                                                                return <option key={unit.id}
                                                                className="option-custom"
                                                                value={unit.name}>{unit.name}</option>
                                                            })
                                                        }
                                                    </select>
                                                    <label htmlFor={"required--"+ingredientInputId}>Required?</label>
                                                    <span />
                                                    <input type="checkbox"
                                                    name={"required--"+ingredientInputId}
                                                    onChange={this.handleFieldChange} />
                                                </React.Fragment>
                                            }
                                            {(this.state.additionalSelectionFields.slice(-1)[0] === ingredientInputId) &&
                                                <button type="button"
                                                className="button is-dark"
                                                name={"remove--"+ingredientInputId}
                                                onClick={this.handleRemoveButton}>Remove Ingredient</button>
                                            }
                                        </fieldset>
                                    })
                                }
                                <span className="button-fixer">
                                    <button type="button"
                                    className="button is-dark"
                                    onClick={this.handleAddButton}>Add New Ingredient</button>
                                </span>
                            </section>
                        </section>
                        <section className="modal-card-foot">
                            <button type="button"
                            className="button is-dark"
                            onClick={this.handleSubmitButton}>Submit</button>
                        </section>
                    </div>
                </form>
            </React.Fragment>
        )
    }
}