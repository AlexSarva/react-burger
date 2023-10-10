import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { hideIngredientInfo } from '../../../services/reducers/ingredient-info'
import Modal from '../../modal/modal'
import style from '../ingredient/ingredient.module.css'
import OrderIngredientsDetails from '../../order-ingredients-details'
import {
  selectOrderByNumberType,
  TExtendedOrder, wsInit
} from '../../../services/reducers/orders'
import Preloader from '../../preloader/preloader'
import { useAppDispatch } from '../../../index'
import { FC, useEffect } from 'react'

type OrderIngredientsProps = {
  type: 'feed' | 'my'
}
const OrderIngredients: FC<OrderIngredientsProps> = ({ type }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const modal = location.state?.modal
  const dispatch = useAppDispatch()
  const closeModal = () => {
    dispatch(hideIngredientInfo())
    navigate(location.state.from || '/feed')
  }
  const { id } = useParams() as { id: string }

  const order = useSelector(selectOrderByNumberType(id, type)) as TExtendedOrder

  useEffect(() => {
    if (type === 'feed') {
      dispatch(wsInit('feed'))
    }
    if (type === 'my') {
      dispatch(wsInit('my'))
    }
  }, [dispatch, wsInit])

  return (
    <>
      {modal && order
        ? <Modal title="" onClose={closeModal}>
          <OrderIngredientsDetails order={order}/>
        </Modal>
        : !order
            ? <Preloader />
            : <section className={style.container}>
                <OrderIngredientsDetails order={order}/>
              </section>
      }
    </>)
}

export default OrderIngredients
