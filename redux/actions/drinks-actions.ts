import { firestore } from '../../config/firebase';
export const selectDrink = (itemId: string) => ({
  type: 'SELECT_DRINK',
  payload: {
    itemId: itemId,
  },
});

export const fetchMoreDrinks = () => {
  return (dispatch, getState) => {
    const { endCursor, loadingMore } = getState().drinks;

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
        const items = querySnapshot.docs.map(item => {
          const data = item.data();

          return {
            id: item.id,
            title: data.title,
            image: data.image,
            description: data.description,
          };
        });

        const endCursor = querySnapshot.docs[querySnapshot.docs.length - 1];

        dispatch({
          type: 'FETCH_DRINKS_SUCCESS',
          payload: {
            items,
            endCursor,
          },
        });
      })
      .catch(e => {
        console.log(e);
      });
  };
};

export const fetchDrinksIfNeeded = () => {
  return (dispatch, getState) => {
    const drinkState = getState().app;
    if (drinkState.loading || drinkState.loaded) {
      return;
    }
    dispatch({
      type: 'FETCH_DRINKS',
    });
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

    firestore
      .collection('drinks')
      .orderBy('title')
      .limit(10)
      .get()
      .then(querySnapshot => {
        const items = querySnapshot.docs.map(item => {
          const data = item.data();

          return {
            id: item.id,
            title: data.title,
            tags: data.tags || [],
            instructions: data.instructions || [],
            image: data.image,
            ingredients: (data.ingredients || []).map(ingredient => {
              return {
                ingredient: ingredient.ingredient.id,
                amount: ingredient.amount,
              };
            }),
            description: data.description,
          };
        });

        const endCursor = querySnapshot.docs[querySnapshot.docs.length - 1];

        dispatch({
          type: 'FETCH_DRINKS_SUCCESS',
          payload: {
            items,
            endCursor,
          },
        });
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
