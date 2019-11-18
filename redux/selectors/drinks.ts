import { createSelector } from 'reselect';

const getDrinks = state => state.drinks;
const getDrinkEntities = state => state.drinks.entities;
export const getDrinksLoading = state => state.drinks.loading;
const getIngredientEntities = state => state.ingredients.entities;
export const getSelectedDrinkId = state => state.drinks.selected;

export const getSelectedDrink = createSelector(
  [getSelectedDrinkId, getDrinkEntities],
  (selectedId, entities) => {
    if (!selectedId) {
      return null;
    }
    return entities[selectedId] || null;
  }
);

export const getIngredientsForDrink = createSelector(
  [getSelectedDrink, getIngredientEntities],
  (selectedDrink, ingredients) => {
    if (!selectedDrink || !selectedDrink.ingredients || !ingredients) {
      return [];
    }
    return selectedDrink.ingredients
      .map(item => {
        const ingredient = ingredients[item.ingredient];

        return {
          ingredient,
          amount: item.amount,
        };
      })
      .filter(ingredient => !!ingredient);
  }
);
