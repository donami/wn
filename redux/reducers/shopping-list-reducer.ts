type State = {
  items: Item[];
};
// Initial State
const initialState: State = {
  items: [],
};

type LineItem = {
  amount: string;
  ingredientId: string;
};

type Item = {
  drinkId: string;
  title: string;
  lineItems: LineItem[];
};

const shoppingListReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_SHOPPING_LIST': {
      const alreadyExists = state.items.findIndex(
        item => item.drinkId === action.payload.drinkId
      );

      // if item already exists in shopping list,
      // it should be updated with and not added agains
      if (alreadyExists > -1) {
        return {
          ...state,
          items: [
            ...state.items.slice(0, alreadyExists),
            action.payload,
            ...state.items.slice(alreadyExists + 1),
          ],
        };
      }
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }

    case 'REMOVE_INGREDIENT_FROM_LIST': {
      const updatedItems = state.items.map(item => {
        if (item.drinkId === action.payload.drinkId) {
          const index = item.lineItems.findIndex(
            line => line.ingredientId === action.payload.ingredientId
          );

          if (index > -1) {
            return {
              ...item,
              lineItems: [
                ...item.lineItems.slice(0, index),
                ...item.lineItems.slice(index + 1),
              ],
            };
          }
          return item;
        }
        return item;
      });
      return {
        ...state,
        items: updatedItems,
      };
    }

    case 'REMOVE_SHOPPING_LIST': {
      return {
        ...state,
        items: [
          ...state.items.filter(item => {
            return item.drinkId !== action.payload.drinkId;
          }),
        ],
      };
    }

    // Default
    default: {
      return state;
    }
  }
};

export default shoppingListReducer;
