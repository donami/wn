import { createSelector } from 'reselect';

const getDrinks = state => state.drinks;
const getDrinkEntities = state => state.drinks.entities;
const getDrinkIds = state => state.drinks.ids;
export const getDrinksLoading = state => state.drinks.loading;
const getIngredientEntities = state => state.ingredients.entities;
export const getSelectedDrinkId = state => state.drinks.selected;
export const getDrinksLoadingMore = state => state.drinks.loadingMore;

export const getDrinkItems = createSelector(
  [getDrinkEntities, getDrinkIds],
  (entities, ids) => {
    if (!entities || !ids) {
      return [];
    }
    return ids.map(id => entities[id]).filter(entity => !!entity);
  }
);

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
