import { firestore } from '../../config/firebase';
export const selectDrink = (itemId: string) => ({
  type: 'SELECT_DRINK',
  payload: {
    itemId: itemId,
  },
});

export const fetchDrinksIfNeeded = () => {
  return dispatch => {
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
      .get()
      .then(querySnapshot => {
        const items = querySnapshot.docs.map(item => {
          const data = item.data();

          return {
            id: item.id,
            title: data.title,
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

        dispatch({
          type: 'FETCH_DRINKS_SUCCESS',
          payload: {
            items,
          },
        });
      })
      .catch(error => {
        console.error(error);
        dispatch({
          type: 'FETCH_DRINKS_FAILURE',
          payload: {
            error,
          },
        });
      });
  };
};
