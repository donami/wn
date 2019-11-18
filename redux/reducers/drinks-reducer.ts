import { normalize } from '../../utils/normalize';
// Initial State
const initialState = {
  loaded: false,
  loading: false,
  items: [],
  entities: {},
  selected: null,
};

const drinksReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_DRINKS': {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case 'FETCH_DRINKS_SUCCESS': {
      return {
        ...state,
        loaded: true,
        loading: false,
        items: action.payload.items,
        entities: normalize(action.payload.items),
      };
    }
    case 'FETCH_DRINKS_FAILURE': {
      return {
        ...state,
        loaded: true,
        loading: false,
        items: [],
        entities: {},
      };
    }

    case 'SELECT_DRINK': {
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

export default drinksReducer;
