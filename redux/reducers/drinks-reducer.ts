import { normalize } from '../../utils/normalize';
// Initial State
const initialState = {
  loaded: false,
  loading: false,
  loadingMore: false,
  ids: [],
  entities: {},
  selected: null,
  endCursor: null,
  trendingLoading: false,
  allItemsLoaded: false,
};

type MergeOverrides = {
  loaded?: boolean;
  loading?: boolean;
  trendingLoading?: boolean;
  endCursor?: any;
  allItemsLoaded?: boolean;
};

const mergeNewEntities = (
  prevState: typeof initialState,
  items: any[],
  overrides: MergeOverrides = {}
) => {
  const mergedIds = [...prevState.ids, ...items.map(item => item.id)];
  return {
    ...prevState,
    ids: Array.from(new Set(mergedIds)),
    entities: {
      ...prevState.entities,
      ...normalize(items),
    },
    loadingMore: false,
    ...overrides,
  };
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
      const newState = mergeNewEntities(state, action.payload.items, {
        endCursor: action.payload.endCursor || state.endCursor,
        loading: false,
        loaded: true,
        allItemsLoaded: action.payload.allItemsLoaded || state.allItemsLoaded,
      });
      return newState;
    }
    case 'FETCH_DRINKS_FAILURE': {
      return {
        ...state,
        loaded: true,
        loading: false,
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

    case 'FETCH_TRENDING': {
      return {
        ...state,
        trendingLoading: true,
      };
    }

    case 'FETCH_TRENDING_SUCCESS': {
      const newState = mergeNewEntities(state, action.payload.items, {
        trendingLoading: false,
      });
      return newState;
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
