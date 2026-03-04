export type MealType = "breakfast" | "lunch" | "dinner";

export interface MenuConditions {
  ingredients: string;
  servings: number;
  cookingTime: string;
  genres: string[];
  avoidIngredients: string;
  mealTypes: MealType[];
}

export interface Dish {
  name: string;
  description: string;
  ingredients: string[];
  steps: string[];
  cookingTime: string;
}

export interface GeneratedMenu {
  breakfast?: Dish;
  lunch?: Dish;
  dinner?: Dish;
}
