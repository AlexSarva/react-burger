import style from './main.module.css';
import BurgerIngredients from "../../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../burger-constructor/burger-constructor";
import {useEffect} from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {useDispatch, useSelector} from "react-redux";
import {clearConstructor} from "../../../services/reducers/burger-constructor";
import {clearIngredients} from "../../../services/reducers/ingredients";

const Main = () => {

  const dispatch = useDispatch();
  const {status} = useSelector((state) => state.orders);

  useEffect(() => {
    return () => {
      if (status === 'succeeded') {
        dispatch(clearConstructor());
        dispatch(clearIngredients());
      }
    };
  }, [dispatch, status]);

  return (
    <main className={style.container}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients/>
        <BurgerConstructor/>
      </DndProvider>
    </main>
  )
}

export default Main;