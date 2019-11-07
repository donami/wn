export type Drink = {
  id: string;
  title: string;
  description: string;
  image?: string;
  ingredients: {
    ingredient: Ingredient;
    amount: string;
  };
};

export type Ingredient = {
  id: string;
  title: string;
  description: string;
  image?: string;
};
