import React, { Component } from 'react';
import './Profile.css';

export default class ProfileForm extends Component {
    state = {
        cocktailNameInput: "",
        categorySelection: "",
        glassSelection: "",
        preparationInput: "",
        ingredientSelectionFields: [],
        ingredientTypeSelections: [],
        ingredientIdSelections: [],
        ingredientLabelInputs: [],
        ingredientAmountInputs: [],
        ingredientUnitSelections: [],
        ingredientRequiredBooleans: []
    }

    handleFieldChange = event => {
        let editableArrays = [
            "ingredientTypeSelections",
            "ingredientIdSelections",
            "ingredientLabelInputs",
            "ingredientAmountInputs",
            "ingredientUnitSelections"
        ];
        let stateToChange = event.target.name.split("--")[0];
        let indexNumber = event.target.name.split("--")[1];
        let stateValue = event.target.value;

        if (stateToChange === "ingredientRequiredBooleans") {
            let newArray = this.state[stateToChange].slice();
            newArray[indexNumber] = !this.state[stateToChange][indexNumber]
            this.setState({[stateToChange]: newArray})
        } else if ((editableArrays.find(arrayName => stateToChange === arrayName)) &&
        !this.state[stateToChange][indexNumber] && this.state[stateToChange][indexNumber] !== "") {
            this.setState({
                [stateToChange]: this.state[stateToChange].concat([stateValue])
            })
        } else if (editableArrays.find(arrayName => stateToChange === arrayName)) {
            let newArray = this.state[stateToChange].slice();
            newArray[indexNumber] = stateValue
            this.setState({[stateToChange]: newArray})
        } else {
            this.setState({
                [stateToChange]: stateValue
            });
        }
    }

    handleRemoveButton = () => {

    }

    handleAddButton = () => {
        const nextId = this.state.ingredientSelectionFields.length + 1;
        console.log(nextId);
        this.setState({
            ingredientSelectionFields: this.state.ingredientSelectionFields.concat([nextId])
        })
    }

    handleSubmitButton = () => {
        this.props.toggleCreateModal();
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
                        <select value={this.state.ingredientTypeSelections[0]}
                        defaultValue=""
                        name="ingredientTypeSelections--0"
                        onChange={this.handleFieldChange}>
                        <option value="" disabled default hidden>Select Type...</option>
                            {
                                ingredientTypes.map(ingredientType => {
                                    return <option key={ingredientTypes.indexOf(ingredientType)}
                                    value={ingredientType}>{ingredientType}</option>
                                })
                            }
                        </select>
                        {(this.state.ingredientTypeSelections[0] && this.props.ingredients) &&
                            <React.Fragment>
                                <input type="text"
                                name="ingredientLabelInputs--0"
                                placeholder="Ingredient Label"
                                defaultValue=""
                                onChange={this.handleFieldChange} />
                                <select value={this.state.ingredientIdSelections[0]}
                                name="ingredientIdSelections--0"
                                defaultValue=""
                                onChange={this.handleFieldChange}>
                                    <option value="" disabled default hidden>Select Ingredient...</option>
                                    {
                                        this.props.ingredients.filter(ingredient => {
                                            return ingredient.type === this.state.ingredientTypeSelections[0];
                                        }).map(ingredient => {
                                            return <option key={ingredient.id}
                                            value={ingredient.name}>{ingredient.name}</option>
                                        })
                                    }
                                </select>
                                <input type="text"
                                name="ingredientAmountInputs--0"
                                placeholder="Amount"
                                defaultValue=""
                                onChange={this.handleFieldChange} />
                                <select value={this.state.ingredientUnitSelections[0]}
                                name="ingredientUnitSelections--0"
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
                                <label htmlFor="ingredientRequiredBooleans--0">Required?</label>
                                <input type="checkbox"
                                name="ingredientRequiredBooleans--0"
                                onChange={this.handleFieldChange} />
                            </React.Fragment>
                        }
                    </fieldset>
                    {/* ADDITIONAL INGREDIENT FIELDS AS NEEDED */}
                    {
                        this.state.ingredientSelectionFields.map(ingredientInputId => {
                            const indexNumber = ingredientInputId
                            return <fieldset key={ingredientInputId}
                            className="ingredientFieldset">
                            Ingredient {indexNumber+1}
                                <select value={this.state.ingredientTypeSelections[indexNumber]}
                                defaultValue=""
                                name={"ingredientTypeSelections--"+indexNumber}
                                onChange={this.handleFieldChange}>
                                    <option value="" disabled default hidden>Select Type...</option>
                                    {
                                        ingredientTypes.map(ingredientType => {
                                            return <option key={ingredientTypes.indexOf(ingredientType)}
                                            value={ingredientType}>{ingredientType}</option>
                                        })
                                    }
                                </select>
                                {(this.state.ingredientTypeSelections[indexNumber] && this.props.ingredients) &&
                                    <React.Fragment>
                                        <input
                                        type="text"
                                        name={"ingredientLabelInputs--"+indexNumber}
                                        placeholder="Ingredient Label"
                                        defaultValue=""
                                        onChange={this.handleFieldChange} />
                                        <select value={this.state.ingredientIdSelections[indexNumber]}
                                        defaultValue=""
                                        name={"ingredientIdSelections--"+indexNumber}
                                        onChange={this.handleFieldChange}>
                                            <option value="" disabled default hidden>Select Ingredient...</option>
                                            {
                                                this.props.ingredients.filter(ingredient => {
                                                    return ingredient.type === this.state.ingredientTypeSelections[indexNumber];
                                                }).map(ingredient => {
                                                    return <option key={ingredient.id}
                                                    value={ingredient.name}>{ingredient.name}</option>
                                                })
                                            }
                                        </select>
                                        <input type="text"
                                        name={"ingredientAmountInputs--"+indexNumber}
                                        placeholder="Amount"
                                        defaultValue=""
                                        onChange={this.handleFieldChange} />
                                        <select value={this.state.ingredientUnitSelections[indexNumber]}
                                        name={"ingredientUnitSelections--0"+indexNumber}
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
                                        <label htmlFor={"ingredientRequiredBooleans--"+indexNumber}>Required?</label>
                                        <input type="checkbox"
                                        name={"ingredientRequiredBooleans--"+indexNumber}
                                        onChange={this.handleFieldChange} />
                                        <button type="button">Remove Ingredient</button>
                                    </React.Fragment>
                                }
                            </fieldset>
                        })
                    }
                    <button type="button"
                    onClick={this.handleAddButton}>Add New Ingredient</button>
                    <button type="submit"
                    onClick={this.handleSubmitButton}>Submit</button>
                </form>
            </React.Fragment>
        )
    }
}