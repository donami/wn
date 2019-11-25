// import { normalize } from '../../utils/normalize';
// Initial State
const initialState = {
  trendingIds: [],
  loading: false,
  loaded: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_APP': {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case 'FETCH_APP_SUCCESS': {
      return {
        ...state,
        loaded: true,
        loading: false,
        trendingIds: action.payload.data.trendingIds,
      };
    }
    case 'FETCH_APP_FAILURE': {
      return {
        ...state,
        loaded: true,
        loading: false,
        trendingIds: [],
      };
    }

    // Default
    default: {
      return state;
    }
  }
};

export default appReducer;
