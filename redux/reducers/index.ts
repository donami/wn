import { combineReducers } from 'redux';

import drinksReducer from './drinks-reducer';
import favoritesReducer from './favorites-reducer';
import ingredientReducer from './ingredient-reducer';
import searchReducer from './search-reducer';

// Redux: Root Reducer
const rootReducer = combineReducers({
  drinks: drinksReducer,
  favorites: favoritesReducer,
  ingredients: ingredientReducer,
  search: searchReducer,
});

// Exports
export default rootReducer;
