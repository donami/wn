// Initial State
const initialState = {
  items: [],
};

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_FAVORITE': {
      if (state.items.indexOf(action.payload.itemId) > -1) {
        return {
          ...state,
          items: state.items.filter(id => id !== action.payload.itemId),
        };
      }
      return {
        ...state,
        items: [...state.items, action.payload.itemId],
      };
    }

    // Default
    default: {
      return state;
    }
  }
};

export default favoritesReducer;
