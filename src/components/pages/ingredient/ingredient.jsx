import style from './ingredient.module.css'
import IngredientDetails from '../../ingredient-details/ingredient-details'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectIngredientById, selectIngredientsStatus } from '../../../services/reducers/ingredients'
import Preloader from '../../preloader/preloader'
import NoContent from '../../no-content/no-content'
import Modal from '../../modal/modal'
import { hideIngredientInfo } from '../../../services/reducers/ingredient-info'

const Ingredient = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const modal = location.state?.modal
  const dispatch = useDispatch()
  const { itemDetails } = useSelector((state) => state.ingredientInfo)
  const closeModal = () => {
    dispatch(hideIngredientInfo())
    navigate('/')
  }
  const status = useSelector(selectIngredientsStatus)
  const { id } = useParams()
  const ingredient = useSelector((state) => selectIngredientById(id)(state))

  return (
    <>
      {modal && itemDetails
        ? <Modal title="Детали ингредиента" onClose={closeModal}>
          <IngredientDetails ingredient={itemDetails}/>
        </Modal>
        : (status === 'loading' || status === 'idle')
            ? <Preloader/>
            : status === 'failed'
              ? <NoContent/>
              : status === 'succeeded' && ingredient
                ? <section className={style.container}>
                <IngredientDetails ingredient={ingredient}/>
              </section>
                : <NoContent/>
      }
    </>)
}

export default Ingredient
