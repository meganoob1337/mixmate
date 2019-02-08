import React, { Component } from 'react';
import './Profile.css';

export default class ProfileForm extends Component {
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

    handleRemoveButton = () => {

    }

    handleAddButton = () => {
        const nextId = this.state.additionalSelectionFields[0] ? Number(this.state.additionalSelectionFields.slice(-1)[0] + 1) : 2
        console.log(nextId)
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
            userId: Number(sessionStorage.getItem("userId")),
            name: this.state.cocktailNameInput,
            glass: this.state.glassSelection,
            category: this.state.categorySelection,
            preparation: this.state.preparationInput
        };
        this.props.postItem("cocktails", cocktailObjToPost)
        .then(() => {
            console.log(this.props.cocktails.slice(-1)[0].id);
            let userCocktailObjToPost = {
                userId: Number(sessionStorage.getItem("userId")),
                cocktailId: this.props.cocktails.slice(-1)[0].id,
                comment: ""
            };
            this.props.postItem("userCocktails", userCocktailObjToPost)
        })
        .then(() => {
            console.log(this.props.cocktails.slice(-1)[0].id)
            debugger
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
            console.log(arrayToPost)
            debugger
            arrayToPost.forEach(obj => {
                console.log(obj);
                debugger
                this.props.postItem("cocktailIngredients", obj);
            })
        })
        .then(() => {
            this.props.toggleCreateModal();
        })
    }

    componentWillMount() {
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

    render() {
        const categories = [
            "After Dinner Cocktail",
            "All Day Cocktail",
            "Before Dinner Cocktail",
            "Hot Drink",
            "Longdrink",
            "Sparkling Cocktail"
        ];
        const glasses = [
            "Champagne-flute",
            "Champagne-tulip",
            "Collins",
            "Coupe",
            "Double-rock",
            "Highball",
            "Hot-drink",
            "Hurricane",
            "Margarita",
            "Martini",
            "Old-fashioned",
            "Shot",
            "Single-rock",
            "White-wine"
        ];
        const ingredientTypes = [
            "Liquor",
            "Liqueur",
            "Wine/Fortified Wine",
            "Juice",
            "Bitters",
            "Sweetener",
            "Other"
        ];
        const units = [
            "oz",
            "cl",
            "dash(es)",
            "tsp",
            "Tbl"
        ];
        return (
            <React.Fragment>
                <form className="createCocktailModal">
                    <h3>New Cocktail</h3>
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
                            categories.map(category => {
                                return <option key={categories.indexOf(category)}
                                value={category}>{category}</option>
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
                            glasses.map(glass => {
                                return <option key={glasses.indexOf(glass)}
                                value={glass}>{glass}</option>
                            })
                        }
                        </select>
                    </fieldset>
                    <fieldset>
                        <textarea name="preparationInput"
                        placeholder="Instructions..."
                        onChange={this.handleFieldChange} />
                    </fieldset>
                    <h5>Ingredients:</h5>
                    {/* INITIAL INGREDIENT SELECTION - NOT REMOVABLE */}
                    <fieldset>Ingredient 1
                        <select value={this.state.cocktailIngredientObjects[0].type}
                        name="type--1"
                        onChange={this.handleFieldChange}>
                        <option value="" disabled default hidden>Select Type...</option>
                            {
                                ingredientTypes.map(ingredientType => {
                                    return <option key={ingredientTypes.indexOf(ingredientType)}
                                    value={ingredientType}>{ingredientType}</option>
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
                                defaultValue=""
                                onChange={this.handleFieldChange}>
                                    <option value="" disabled default hidden>Select Unit...</option>
                                    {
                                        units.map(unit => {
                                            return <option key={units.indexOf(unit)}
                                            value={unit}>{unit}</option>
                                        })
                                    }
                                </select>
                                <label htmlFor="required--1">Required?</label>
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
                            className="ingredientFieldset">
                            Ingredient {ingredientInputId}
                                <select value={this.state.cocktailIngredientObjects[indexNumber].type}
                                name={"type--"+ingredientInputId}
                                onChange={this.handleFieldChange}>
                                    <option value="" disabled default hidden>Select Type...</option>
                                    {
                                        ingredientTypes.map(ingredientType => {
                                            return <option key={ingredientTypes.indexOf(ingredientType)}
                                            value={ingredientType}>{ingredientType}</option>
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
                                                units.map(unit => {
                                                    return <option key={units.indexOf(unit)}
                                                    value={unit}>{unit}</option>
                                                })
                                            }
                                        </select>
                                        <label htmlFor={"required--"+ingredientInputId}>Required?</label>
                                        <input type="checkbox"
                                        name={"required--"+ingredientInputId}
                                        onChange={this.handleFieldChange} />
                                        <button type="button">Remove Ingredient</button>
                                    </React.Fragment>
                                }
                            </fieldset>
                        })
                    }
                    <button type="button"
                    onClick={this.handleAddButton}>Add New Ingredient</button>
                    <button type="button"
                    onClick={this.handleSubmitButton}>Submit</button>
                </form>
            </React.Fragment>
        )
    }
}