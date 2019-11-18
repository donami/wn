import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDrinksLoading } from '../redux/selectors/drinks';
import { fetchDrinksIfNeeded } from '../redux/actions/drinks-actions';

const useDataLoaded = (required: string[]) => {
  const [dataLoading, setDataLoading] = useState(false);

  const drinksLoaded = useSelector(state => state.drinks.loaded);
  const drinksLoading = useSelector(state => getDrinksLoading(state));
  const dispatch = useDispatch();

  useEffect(() => {
    const conditions = [];
    if (required.indexOf('drinks') > -1) {
      conditions.push(drinksLoading);
    }
    const result = conditions.some(condition => condition);
    setDataLoading(result);
  }, [drinksLoading, dataLoading]);

  useEffect(() => {
    if (required.indexOf('drinks') > -1 && !drinksLoaded) {
      dispatch(fetchDrinksIfNeeded());
    }
  });

  if (dataLoading) {
    return [false];
  }
  return [true];
};

export default useDataLoaded;
