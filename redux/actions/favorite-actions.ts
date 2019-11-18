export const addFavorite = (itemId: string) => ({
  type: 'ADD_FAVORITE',
  payload: {
    itemId: itemId,
  },
});
