import { createSelector } from 'reselect';

const getApp = state => state.app;
export const getAppLoading = state => state.app.loading;
export const getTrendingIds = state => state.app.trendingIds;
const getDrinkEntities = state => state.drinks.entities;

export const getTrendingEntities = createSelector(
  [getTrendingIds, getDrinkEntities],
  (ids, entities) => {
    if (!ids || !ids.length || !entities) {
      return [];
    }

    return ids.map(id => entities[id] || null).filter(item => !!item);
  }
);
