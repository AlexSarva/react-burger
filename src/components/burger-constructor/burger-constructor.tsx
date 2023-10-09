import constructorStyle from './burger-constructor.module.css'
import { useSelector } from 'react-redux'
import { clearOrder, hideOrder } from '../../services/reducers/order'
import Modal from '../modal/modal'
import Preloader from '../preloader/preloader'
import NoContent from '../no-content/no-content'
import OrderDetails from '../order-details/order-details'
import ResultInfo from './result-info/result-info'
import EmptyConstructor from './empty-constructor/empty-constructor'
import BurgerComponents from './burger-components/burger-components'
import { useEffect } from 'react'
import { clearConstructor } from '../../services/reducers/burger-constructor'
import { clearIngredients } from '../../services/reducers/ingredients'
import { RootState } from '../../services/reducers'
import { useAppDispatch } from '../../index'

const BurgerConstructor = () => {
  const { status, showOrder } = useSelector((state: RootState) => state.order)
  const { bun, options } = useSelector((state: RootState) => state.burgerConstructor)
  const dispatch = useAppDispatch()
  const closeModal = () => {
    dispatch(hideOrder())
    dispatch(clearOrder())
  }

  useEffect(() => {
    return () => {
      if (status === 'succeeded') {
        dispatch(clearConstructor())
        dispatch(clearIngredients())
      }
    }
  }, [dispatch, status])

  return (
    <>
      <section className={constructorStyle.container}>
        <div className={constructorStyle.box}>
          {!bun && options.length === 0 ? <EmptyConstructor/> : <BurgerComponents/>}
        </div>
        <ResultInfo/>
      </section>
      {showOrder && (
        <Modal title="" onClose={closeModal}>
          {(status === 'loading')
            ? <Preloader />
            : (status === 'failed')
                ? <NoContent/>
                : <OrderDetails/>
          }
        </Modal>
      )}
    </>
  )
}

export default BurgerConstructor
