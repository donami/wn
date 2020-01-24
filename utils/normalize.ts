export const normalize = (items: any[]) => {
  return items.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {});
};

export const normalizeDrink = (id: string, data: any) => {
  return {
    id: id,
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
};
