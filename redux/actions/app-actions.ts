import { firestore } from '../../config/firebase';

export const fetchAppIfNeeded = () => {
  return (dispatch, getState) => {
    const appState = getState().app;
    if (appState.loading || appState.loaded) {
      return;
    }

    dispatch({
      type: 'FETCH_APP',
    });

    firestore
      .collection('app')
      .get()
      .then(querySnapshot => {
        const items = querySnapshot.docs.map(item => {
          const data = item.data();

          return {
            id: item.id,
            trendingIds: data.trending || [],
          };
        });

        dispatch({
          type: 'FETCH_APP_SUCCESS',
          payload: {
            data: items[0],
          },
        });
      })
      .catch(error => {
        dispatch({
          type: 'FETCH_APP_FAILURE',
          payload: {
            error,
          },
        });
      });
  };
};
