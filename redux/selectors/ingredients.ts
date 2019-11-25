import { createSelector } from 'reselect';

const getIngredients = state => state.ingredients;
const getIngredientEntities = state => state.ingredients.entities;
export const getIngredientsLoading = state => state.ingredients.loading;
export const getSelectedIngredientId = state => state.ingredients.selected;

export const getSelectedIngredient = createSelector(
  [getSelectedIngredientId, getIngredientEntities],
  (selectedId, entities) => {
    if (!selectedId) {
      return null;
    }
    return entities[selectedId] || null;
  }
);
