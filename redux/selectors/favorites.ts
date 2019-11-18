import { createSelector } from 'reselect';

const getFavoritesState = state => state.favorites;
const getFavorites = state => state.favorites.items;
const getDrinkEntities = state => state.drinks.entities;

export const getFavoriteItems = createSelector(
  [getFavoritesState],
  favorites => {
    return favorites.items;
  }
);
export const getFavoriteEntities = createSelector(
  [getFavorites, getDrinkEntities],
  (ids, drinks) => {
    if (!ids || !drinks) {
      return [];
    }
    return ids
      .map(id => {
        return drinks[id];
      })
      .filter(drink => !!drink);
  }
);
