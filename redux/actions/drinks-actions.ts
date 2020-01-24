import { firestore, documentId } from '../../config/firebase';
import { normalizeDrink } from '../../utils/normalize';

export const selectDrink = (itemId: string) => ({
  type: 'SELECT_DRINK',
  payload: {
    itemId: itemId,
  },
});

export const fetchTrending = () => {
  return (dispatch, getState) => {
    const { trendingIds } = getState().app;

    if (!trendingIds || !trendingIds.length) {
      return;
    }

    dispatch({
      type: 'FETCH_TRENDING',
    });

    firestore
      .collection('drinks')
      .where(documentId, 'in', trendingIds)
      .get()
      .then(querySnapshot => {
        const items = querySnapshot.docs.map(item =>
          normalizeDrink(item.id, item.data())
        );

        dispatch(fetchTrendingSuccess({ items }));
      })
      .catch(e => {
        console.log(e);
      });
  };
};

export const fetchDrinksSuccess = (payload: {
  items: any[];
  endCursor?: any;
  allItemsLoaded?: boolean;
}) => {
  return {
    type: 'FETCH_DRINKS_SUCCESS',
    payload: payload,
  };
};

const fetchTrendingSuccess = (payload: { items: any[]; endCursor?: any }) => {
  return {
    type: 'FETCH_TRENDING_SUCCESS',
    payload: payload,
  };
};

export const fetchMoreDrinks = () => {
  return (dispatch, getState) => {
    const { endCursor, loadingMore, allItemsLoaded } = getState().drinks;

    if (!endCursor || loadingMore) {
      return false;
    }

    dispatch({
      type: 'FETCH_MORE_DRINKS',
    });

    firestore
      .collection('drinks')
      .orderBy('title')
      .startAfter(endCursor)
      .limit(10)
      .get()
      .then(querySnapshot => {
        const items = querySnapshot.docs.map(item =>
          normalizeDrink(item.id, item.data())
        );

        const endCursor = querySnapshot.docs[querySnapshot.docs.length - 1];

        dispatch(
          fetchDrinksSuccess({ items, endCursor, allItemsLoaded: true })
        );
      })
      .catch(e => {
        console.log(e);
      });
  };
};

const fetchIngredients = () => {
  return (dispatch, getState) => {
    dispatch({
      type: 'FETCH_INGREDIENTS',
    });

    firestore
      .collection('ingredients')
      .get()
      .then(querySnapshot => {
        const items = querySnapshot.docs.map(item => {
          const data = item.data();

          return {
            id: item.id,
            title: data.title,
            image: data.image,
            description: data.description,
          };
        });

        dispatch({
          type: 'FETCH_INGREDIENTS_SUCCESS',
          payload: {
            items,
          },
        });
      })
      .catch(error => {
        dispatch({
          type: 'FETCH_INGREDIENTS_FAILURE',
          payload: {
            error,
          },
        });
      });
  };
};

export const fetchDrinksIfNeeded = () => {
  return (dispatch, getState) => {
    const drinkState = getState().drinks;
    if (drinkState.loading || drinkState.loaded) {
      return;
    }
    dispatch({
      type: 'FETCH_DRINKS',
    });

    dispatch(fetchIngredients());

    firestore
      .collection('drinks')
      .orderBy('title')
      .limit(10)
      .get()
      .then(querySnapshot => {
        const items = querySnapshot.docs.map(item =>
          normalizeDrink(item.id, item.data())
        );

        const endCursor = querySnapshot.docs[querySnapshot.docs.length - 1];

        dispatch(fetchDrinksSuccess({ items, endCursor }));
      })
      .catch(error => {
        dispatch({
          type: 'FETCH_DRINKS_FAILURE',
          payload: {
            error,
          },
        });
      });
  };
};
