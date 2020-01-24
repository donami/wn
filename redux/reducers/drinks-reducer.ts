import { normalize } from '../../utils/normalize';
// Initial State
const initialState = {
  loaded: false,
  loading: false,
  loadingMore: false,
  items: [],
  ids: [],
  entities: {},
  selected: null,
  endCursor: null,
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
        ids: [...state.ids, ...action.payload.items.map(item => item.id)],
        items: action.payload.items,
        entities: {
          ...state.entities,
          ...normalize(action.payload.items),
        },
        endCursor: action.payload.endCursor,
        loadingMore: false,
      };
    }
    case 'FETCH_DRINKS_FAILURE': {
      return {
        ...state,
        loaded: true,
        loading: false,
        items: [],
        entities: {},
        loadingMore: false,
      };
    }

    case 'FETCH_MORE_DRINKS': {
      return {
        ...state,
        loadingMore: true,
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
