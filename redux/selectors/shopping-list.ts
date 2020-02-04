import { createSelector } from 'reselect';

const getShoppingList = state => state.shoppingList;
const getShoppingListItemsRaw = state => state.shoppingList.items;
const getIngredientEntities = state => state.ingredients.entities;

export const getShoppingListItems = createSelector(
  [getShoppingListItemsRaw, getIngredientEntities],
  (items, entities) => {
    if (!items || !entities) {
      return [];
    }
    return items.map(item => {
      return {
        drinkId: item.drinkId,
        title: item.title,
        lineItems: item.lineItems
          .map(lineItem => ({
            key: `${item.drinkId}.${lineItem.ingredientId}`,
            amount: lineItem.amount,
            ingredient: entities[lineItem.ingredientId],
          }))
          .filter(item => !!item.ingredient),
      };
    });
  }
);
