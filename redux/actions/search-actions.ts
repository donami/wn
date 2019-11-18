export const searchAction = (phrase: string) => {
  return (dispatch, getState) => {
    dispatch({
      type: 'SEARCH_REQUEST',
      payload: {
        phrase,
      },
    });

    return new Promise(resolve => {
      const {
        drinks: { entities },
      } = getState();

      const results = Object.keys(entities).reduce((acc, id) => {
        const entity = entities[id];

        const re = new RegExp(phrase.toLowerCase());

        if (entity.title.toLowerCase().match(re)) {
          acc.push(entity);
        }

        return acc;
      }, []);

      return resolve(results);
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
