export type Drink = {
  id: string;
  title: string;
  description: string;
  image?: string;
  instructions?: string[];
  ingredients: {
    ingredient: Ingredient;
    optional?: boolean;
    amount: string;
  };
  tags: string[];
  source?: string;
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
