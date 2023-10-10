import style from './main.module.css'
import BurgerIngredients from '../../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../../burger-constructor/burger-constructor'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useEffect } from 'react'
import { onClose } from '../../../services/reducers/orders'
import { useAppDispatch } from '../../../index'

const Main = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(onClose('feed'))
    dispatch(onClose('my'))
  }, [dispatch, onClose])

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
