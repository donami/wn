import { normalize } from '../../utils/normalize';
// Initial State
const initialState = {
  loaded: false,
  loading: false,
  items: [],
  selected: null,
  entities: {},
};

const ingredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_INGREDIENTS_SUCCESS': {
      return {
        ...state,
        loaded: true,
        loading: false,
        items: action.payload.items,
        entities: normalize(action.payload.items),
      };
    }

    case 'SELECT_INGREDIENT': {
      return {
        ...state,
        selected: action.payload.itemId,
      };
    }

    // Default
    default: {
      return state;
    }
  }
};

export default ingredientReducer;
