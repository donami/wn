import { firestore } from '../../config/firebase';
import { normalizeDrink } from '../../utils/normalize';
import { fetchDrinksSuccess } from './drinks-actions';

export const searchAction = (phrase: string) => {
  return dispatch => {
    dispatch({
      type: 'SEARCH_REQUEST',
      payload: {
        phrase,
      },
    });

    return new Promise(resolve => {
      return firestore
        .collection('drinks')
        .get()
        .then(querySnapshot => {
          const items = querySnapshot.docs.map(item =>
            normalizeDrink(item.id, item.data())
          );

          // const endCursor =
          //   querySnapshot.docs[querySnapshot.docs.length - 1];

          dispatch(
            fetchDrinksSuccess({
              items,
              // endCursor,
            })
          );

          const results = items.reduce((acc, entity) => {
            const re = new RegExp(phrase.toLowerCase());

            if (entity.title.toLowerCase().match(re)) {
              acc.push(entity);
            }

            return acc;
          }, []);
          return resolve(results);
        })
        .catch(e => {
          console.log(e);
        });
    })
      .then(results => {
        dispatch({
          type: 'SEARCH_SUCCESS',
          payload: {
            results,
          },
        });
      })
      .catch(error => {
        dispatch({
          type: 'SEARCH_FAILURE',
          payload: {
            error,
          },
        });
      });
  };
};
