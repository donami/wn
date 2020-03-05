import { combineReducers } from 'redux';

import drinksReducer from './drinks-reducer';
import favoritesReducer from './favorites-reducer';
import ingredientReducer from './ingredient-reducer';
import searchReducer from './search-reducer';
import tagsReducer from './tags-reducer';
import appReducer from './app-reducer';
import shoppingListReducer from './shopping-list-reducer';

// Redux: Root Reducer
const rootReducer = combineReducers({
  drinks: drinksReducer,
  app: appReducer,
  favorites: favoritesReducer,
  ingredients: ingredientReducer,
  tags: tagsReducer,
  search: searchReducer,
  shoppingList: shoppingListReducer,
});

// Exports
export default rootReducer;
