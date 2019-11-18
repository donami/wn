export type Drink = {
  id: string;
  title: string;
  description: string;
  image?: string;
  ingredients: {
    ingredient: Ingredient;
    optional?: boolean;
    amount: string;
  };
  tags: string[];
};

export type Ingredient = {
  id: string;
  title: string;
  description: string;
  image?: string;
};

export type Tag = {
  id: string;
  title: string;
};
