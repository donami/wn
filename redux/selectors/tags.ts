import { createSelector } from 'reselect';

const getTags = state => state.tags;
const getTagEntities = state => state.tags.entities;
export const getTagsLoading = state => state.tags.loading;
