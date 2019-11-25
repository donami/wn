import { firestore } from '../../config/firebase';

export const fetchTagsIfNeeded = () => {
  return (dispatch, getState) => {
    const tagsState = getState().app;
    if (tagsState.loading || tagsState.loaded) {
      return;
    }

    dispatch({
      type: 'FETCH_TAGS',
    });

    firestore
      .collection('tags')
      .get()
      .then(querySnapshot => {
        const items = querySnapshot.docs.map(item => {
          const data = item.data();

          return {
            id: item.id,
            title: data.title,
          };
        });

        dispatch({
          type: 'FETCH_TAGS_SUCCESS',
          payload: {
            items,
          },
        });
      })
      .catch(error => {
        dispatch({
          type: 'FETCH_TAGS_FAILURE',
          payload: {
            error,
          },
        });
      });
  };
};
