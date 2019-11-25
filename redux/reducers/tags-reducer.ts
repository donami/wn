import { normalize } from '../../utils/normalize';
// Initial State
const initialState = {
  loaded: false,
  loading: false,
  items: [],
  entities: {},
};

const tagsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_TAGS': {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case 'FETCH_TAGS_SUCCESS': {
      return {
        ...state,
        loaded: true,
        loading: false,
        items: action.payload.items,
        entities: normalize(action.payload.items),
      };
    }
    case 'FETCH_TAGS_FAILURE': {
      return {
        ...state,
        loaded: true,
        loading: false,
        items: [],
        entities: {},
      };
    }

    // Default
    default: {
      return state;
    }
  }
};

export default tagsReducer;
