export enum IngredientsMapping {
  bun = 'Булки',
  main = 'Начинки',
  sauce = 'Соусы'
}

export enum IngredientType {
  Bun = 'bun',
  Main = 'main',
  Sauce = 'sauce'
}

export type TIngredient = {
  _id: string;
  name: string;
  type: IngredientType;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  count?: number;
}

export type TConstructorElement = Pick<TIngredient, '_id' | 'name' | 'price' | 'image_mobile'>

export type TIngredientFull = Pick<TIngredient, '_id' | 'name' | 'price' | 'image_mobile' | 'image' | 'count'>

export type TIngredientСomposition = Pick<TIngredient, 'name' | 'image_large' | 'calories' | 'proteins' | 'fat' | 'carbohydrates'>

export type TIngredientDetails = {
  id: number;
  name: string;
  value: number;
}
