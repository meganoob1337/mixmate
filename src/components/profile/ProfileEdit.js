import React, { Component } from 'react';
import setCardBackground from '../backgrounds';
import './Profile.css';

export default class ProfileEdit extends Component {
    state = {
        cocktailNameEdit: "",
        categorySelection: "",
        glassSelection: "",
        preparationEdit: "",
        additionalSelectionFields: [],
        cocktailIngredientObjects: [],
        idsToDelete: []
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

    handleDeleteButton = event => {
        let idToDelete = Number(event.target.name.split("--")[1]);
        this.setState({
            cocktailIngredientObjects: this.state.cocktailIngredientObjects.filter(obj => {
                return obj.id !== idToDelete
            }),
            idsToDelete: this.state.idsToDelete.concat([idToDelete])
        })
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
        const nextId = this.state.additionalSelectionFields[0] ? Number(this.state.additionalSelectionFields.slice(-1)[0] + 1) : Number(this.state.cocktailIngredientObjects.slice(-1)[0].id + 1)
        this.setState({
            cocktailIngredientObjects: this.state.cocktailIngredientObjects.concat({
                existing: false,
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

    handleSaveButton = () => {
        const cocktailObjToPut = {
            id: this.props.cocktail.id,
            userId: Number(sessionStorage.getItem("userId")),
            name: this.state.cocktailNameEdit,
            glass: this.state.glassSelection,
            category: this.state.categorySelection,
            preparation: this.state.preparationEdit
        };
        this.state.idsToDelete.forEach(id => {
            this.props.deleteItem("cocktailIngredients", id)
        });
        this.props.putItem("cocktails", cocktailObjToPut, this.props.cocktail.id)
        .then(() => {
            let arrayToPut = [];
            let arrayToPost = [];
            this.state.cocktailIngredientObjects.forEach(obj => {
                if (obj.existing === true) {
                    arrayToPut.push({
                        id: obj.id,
                        cocktailId: this.props.cocktail.id,
                        ingredientId: obj.ingredientId,
                        amount: obj.amount,
                        unit: obj.unit,
                        label: obj.label,
                        required: obj.required
                    })
                } else {
                    arrayToPost.push({
                        id: obj.id,
                        cocktailId: this.props.cocktail.id,
                        ingredientId: obj.ingredientId,
                        amount: obj.amount,
                        unit: obj.unit,
                        label: obj.label,
                        required: obj.required
                    })
                }
            })
            arrayToPut.forEach(obj => {
                this.props.putItem("cocktailIngredients", obj, obj.id);
            })
            arrayToPost.forEach(obj => {
                this.props.postItem("cocktailIngredients", obj);
            })
        })
        .then(() => {
            this.props.toggleEditModal();
            this.props.handleGetAlls("userCocktails");
        })
    }

    componentDidMount() {
        this.props.toggleCreateButton();
        this.setState({
            cocktailNameEdit: this.props.cocktail.name,
            categorySelection: this.props.cocktail.category,
            glassSelection: this.props.cocktail.glass,
            preparationEdit: this.props.cocktail.preparation,
            cocktailIngredientObjects: this.props.cocktailIngredients.filter(obj => {
                return obj.cocktailId === this.props.cocktail.id
            }).map(obj => {
                return {...obj,
                    type: this.props.ingredients.find(ingr => {
                        return ingr.id === obj.ingredientId
                    }).type,
                    ingredientName: this.props.ingredients.find(ingr => {
                        return ingr.id === obj.ingredientId
                    }).name,
                    existing: true
                }
            })
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
                        onClick={this.props.toggleEditModal}></div>
                    <div className="modal-card">
                        <button className="modal-close is-large"
                        onClick={this.props.toggleEditModal}></button>
                        <p className="modal-card-head"
                        id={setCardBackground(this.props.cocktail)}>Edit Cocktail</p>
                        <section className="modal-card-body">
                            <section className="details-section"
                            id={setCardBackground(this.props.cocktail)}>
                                <b>General Details:</b>
                                <fieldset>
                                    <label htmlFor="cockTailNameEdit">Name:</label>
                                    <input type="text"
                                    name="cocktailNameEdit"
                                    value={this.state.cocktailNameEdit}
                                    onChange={this.handleFieldChange} />
                                </fieldset>
                                <fieldset>
                                    <label htmlFor="categorySelection">Category:</label>
                                    <select value={this.state.categorySelection}
                                    name="categorySelection"
                                    onChange={this.handleFieldChange}>
                                    {
                                        this.props.categoryOptions.map(category => {
                                            return <option key={category.id}
                                            value={category.name}>{category.name}</option>
                                        })
                                    }
                                    </select>
                                </fieldset>
                                <fieldset>
                                    <label htmlFor="glassSelection">Glass:</label>
                                    <select value={this.state.glassSelection}
                                    name="glassSelection"
                                    onChange={this.handleFieldChange}>
                                    {
                                        this.props.glassOptions.map(glass => {
                                            return <option key={glass.id}
                                            value={glass.name}>{glass.name}</option>
                                        })
                                    }
                                    </select>
                                </fieldset>
                                <fieldset>
                                    <label htmlFor="preparationEdit">Preparation Instructions:</label>
                                    <textarea name="preparationEdit"
                                    value={this.state.preparationEdit}
                                    onChange={this.handleFieldChange} />
                                </fieldset>
                            </section>
                            <section className="ingredients-section"
                            id={setCardBackground(this.props.cocktail)}>
                                <b>Ingredients:</b>
                                <p>Current Ingredients</p>
                                {
                                    this.state.cocktailIngredientObjects.map(obj => {
                                        let currentIngredients;
                                        if (obj.existing === true) {
                                            currentIngredients = <fieldset key={obj.id}
                                            className="ingredient-fieldset">
                                                <label htmlFor={"type--"+obj.id}>Type:</label>
                                                <select value={obj.type}
                                                name={"type--"+obj.id}
                                                onChange={this.handleFieldChange}>
                                                    {
                                                        this.props.ingredientTypeOptions.map(ingredientType => {
                                                            return <option key={ingredientType.id}
                                                            value={ingredientType.name}>{ingredientType.name}</option>
                                                        })
                                                    }
                                                </select>
                                                {this.props.ingredients &&
                                                    <React.Fragment>
                                                        <label htmlFor={"label--"+obj.id}>Label:</label>
                                                        <input
                                                        type="text"
                                                        value={obj.label}
                                                        name={"label--"+obj.id}
                                                        placeholder="Ingredient Label"
                                                        onChange={this.handleFieldChange} />
                                                        <label htmlFor={"ingredientId--"+obj.id}>Ingredient:</label>
                                                        <select value={obj.ingredientName}
                                                        name={"ingredientId--"+obj.id}
                                                        onChange={this.handleFieldChange}>
                                                            {
                                                                this.props.ingredients.filter(ingredient => {
                                                                    return ingredient.type === obj.type;
                                                                }).map(ingredient => {
                                                                    return <option key={ingredient.id}
                                                                    value={ingredient.name}>{ingredient.name}</option>
                                                                })
                                                            }
                                                        </select>
                                                        <label htmlFor={"amount--"+obj.id}>Amount:</label>
                                                        <input type="text"
                                                        name={"amount--"+obj.id}
                                                        value={obj.amount}
                                                        onChange={this.handleFieldChange} />
                                                        <label htmlFor={"unit--"+obj.id}>Unit:</label>
                                                        <select value={obj.unit}
                                                        name={"unit--"+obj.id}
                                                        onChange={this.handleFieldChange}>
                                                            {
                                                                this.props.unitOptions.map(unit => {
                                                                    return <option key={unit.id}
                                                                    value={unit.name}>{unit.name}</option>
                                                                })
                                                            }
                                                        </select>
                                                        <label htmlFor={"required--"+obj.id}>Required?</label>
                                                        <span />
                                                        <input type="checkbox"
                                                        checked={obj.required}
                                                        name={"required--"+obj.id}
                                                        onChange={this.handleFieldChange} />
                                                        <button type="button"
                                                        className="button is-light"
                                                        name={"delete--"+obj.id}
                                                        onClick={this.handleDeleteButton}>Delete Ingredient</button>
                                                    </React.Fragment>
                                                }
                                            </fieldset>
                                        }
                                        return currentIngredients;
                                    })
                                }
                                {/* ADDITIONAL INGREDIENT FIELDS AS NEEDED */}
                                {this.state.additionalSelectionFields[0] &&
                                    <p>Additional Ingredients</p>
                                }
                                {this.state.additionalSelectionFields[0] &&
                                    this.state.additionalSelectionFields.map(ingredientInputId => {
                                        return <fieldset key={ingredientInputId}
                                        className="ingredient-fieldset">
                                            <select value={this.state.cocktailIngredientObjects.find(obj => obj.id === ingredientInputId).type}
                                            name={"type--"+ingredientInputId}
                                            onChange={this.handleFieldChange}>
                                                <option value="" disabled default hidden>Select Type...</option>
                                                {
                                                    this.props.ingredientTypeOptions.map(ingredientType => {
                                                        return <option key={ingredientType.id}
                                                        value={ingredientType.name}>{ingredientType.name}</option>
                                                    })
                                                }
                                            </select>
                                            {(this.state.cocktailIngredientObjects.find(obj => obj.id === ingredientInputId).type && this.props.ingredients) &&
                                                <React.Fragment>
                                                    <input
                                                    type="text"
                                                    name={"label--"+ingredientInputId}
                                                    placeholder="Ingredient Label"
                                                    onChange={this.handleFieldChange} />
                                                    <select value={this.state.cocktailIngredientObjects.find(obj => obj.id === ingredientInputId).ingredientName}
                                                    name={"ingredientId--"+ingredientInputId}
                                                    onChange={this.handleFieldChange}>
                                                        <option value="" disabled default hidden>Select Ingredient...</option>
                                                        {
                                                            this.props.ingredients.filter(ingredient => {
                                                                return ingredient.type === this.state.cocktailIngredientObjects.find(obj => obj.id === ingredientInputId).type;
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
                                                    <select value={this.state.cocktailIngredientObjects.find(obj => obj.id === ingredientInputId).unit}
                                                    name={"unit--"+ingredientInputId}
                                                    onChange={this.handleFieldChange}>
                                                        <option value="" disabled default hidden>Select Unit...</option>
                                                        {
                                                            this.props.unitOptions.map(unit => {
                                                                return <option key={unit.id}
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
                                                className="button is-light"
                                                name={"remove--"+ingredientInputId}
                                                onClick={this.handleRemoveButton}>Remove Ingredient</button>
                                            }
                                        </fieldset>
                                    })
                                }
                                <button type="button"
                                className="button is-light"
                                onClick={this.handleAddButton}>Add New Ingredient</button>
                            </section>
                        </section>
                        <section className="modal-card-foot"
                        id={setCardBackground(this.props.cocktail)}>
                        <button type="button"
                            className="button is-dark"
                            onClick={this.handleSaveButton}>Save Changes</button>
                        </section>
                    </div>
                </form>
            </React.Fragment>
        )
    }
}