export default function setCardBackground (cocktail) {
    if(cocktail.category === "After Dinner Cocktail") {
        return "after-dinner-background"
    } else if (cocktail.category === "All Day Cocktail") {
        return "all-day-background"
    } else if (cocktail.category === "Before Dinner Cocktail") {
        return "before-dinner-background"
    } else if (cocktail.category === "Hot Drink") {
        return "hot-drink-background"
    } else if (cocktail.category === "Longdrink") {
        return "longdrink-background"
    } else if (cocktail.category === "Sparkling Cocktail") {
        return "sparkling-background"
    }
}