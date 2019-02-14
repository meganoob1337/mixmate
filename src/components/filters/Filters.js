
export default class Filters {
    filterCocktails = () => {
        let userIngredients = this.props.userIngredients.filter(ingr => {
            return ingr.userId === Number(sessionStorage.getItem("userId"));
        });
        this.setState({
            filteredCocktails: this.state.filteredCocktails.filter(cocktail => {
                let cocktailIngredients = this.props.cocktailIngredients.filter(ingr => {
                    return ingr.cocktailId === cocktail.id;
                });
                let canMake = false;
                cocktailIngredients.forEach(cocktailIngr => {
                    if (userIngredients.find(ingr => ingr.ingredientId === cocktailIngr.ingredientId)) {
                        canMake = true;
                    }
                });
                if (canMake) {
                    return cocktail
                }
            })
        });
    }
}