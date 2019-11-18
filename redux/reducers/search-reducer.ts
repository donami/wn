// Initial State
const initialState = {
  phrase: '',
  loading: false,
  results: [],
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SEARCH_REQUEST': {
      return {
        ...state,
        loading: true,
        phrase: action.payload.phrase,
      };
    }

    case 'SEARCH_SUCCESS': {
      return {
        ...state,
        loading: false,
        results: action.payload.results,
      };
    }

    case 'SEARCH_FAILURE': {
      return {
        ...state,
        loading: false,
        phrase: '',
        results: [],
      };
    }

    // Default
    default: {
      return state;
    }
  }
};

export default searchReducer;
