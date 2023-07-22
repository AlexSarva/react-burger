import style from './main.module.css'
import BurgerIngredients from '../../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../../burger-constructor/burger-constructor'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const Main = () => {
  return (
    <main className={style.container}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients/>
        <BurgerConstructor/>
      </DndProvider>
    </main>
  )
}

export default Main
