import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDrinksLoading } from '../redux/selectors/drinks';
import { fetchDrinksIfNeeded } from '../redux/actions/drinks-actions';
import { fetchTagsIfNeeded } from '../redux/actions/tags-actions';
import { getTagsLoading } from '../redux/selectors/tags';
import { getAppLoading } from '../redux/selectors/app';
import { fetchAppIfNeeded } from '../redux/actions/app-actions';

const useDataLoaded = (required: string[]) => {
  const [dataLoading, setDataLoading] = useState(false);

  const drinksLoaded = useSelector(state => state.drinks.loaded);
  const tagsLoaded = useSelector(state => state.tags.loaded);
  const appLoaded = useSelector(state => state.app.loaded);
  const drinksLoading = useSelector(state => getDrinksLoading(state));
  const tagsLoading = useSelector(state => getTagsLoading(state));
  const appLoading = useSelector(state => getAppLoading(state));
  const dispatch = useDispatch();

  useEffect(() => {
    const conditions = [];
    if (required.indexOf('drinks') > -1) {
      conditions.push(drinksLoading);
    }
    if (required.indexOf('app') > -1) {
      conditions.push(appLoading);
    }
    if (required.indexOf('tags') > -1) {
      conditions.push(tagsLoading);
    }
    const result = conditions.some(condition => condition);
    setDataLoading(result);
  }, [drinksLoading, tagsLoading, appLoading, dataLoading]);

  useEffect(() => {
    if (required.indexOf('drinks') > -1 && !drinksLoaded) {
      dispatch(fetchDrinksIfNeeded());
    }
    if (required.indexOf('app') > -1 && !appLoaded) {
      dispatch(fetchAppIfNeeded());
    }
    if (required.indexOf('tags') > -1 && !tagsLoaded) {
      dispatch(fetchTagsIfNeeded());
    }
  });

  if (dataLoading) {
    return [false];
  }
  return [true];
};

export default useDataLoaded;
