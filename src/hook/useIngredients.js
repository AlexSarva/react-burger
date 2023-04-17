import {useContext} from "react";
import {IngredientsContext} from "../hoc/ingredients-provider";

export function useIngredients () {
  return useContext(IngredientsContext)
}