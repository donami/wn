type AddToShoppingListPayload = {
  drinkId: string;
  title: string;
  lineItems: {
    amount: string;
    ingredientId: string;
  }[];
};
export const addToShoppingList = (payload: AddToShoppingListPayload) => {
  return {
    type: 'ADD_TO_SHOPPING_LIST',
    payload,
  };
};

type RemoveIngredientFromListPayload = {
  drinkId: string;
  ingredientId: string;
};
export const removeIngredientFromList = (
  payload: RemoveIngredientFromListPayload
) => {
  return {
    type: 'REMOVE_INGREDIENT_FROM_LIST',
    payload,
  };
};

type RemoveShoppingListPayload = {
  drinkId: string;
};
export const removeShoppingList = (payload: RemoveShoppingListPayload) => {
  return {
    type: 'REMOVE_SHOPPING_LIST',
    payload,
  };
};
