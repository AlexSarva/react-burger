import constructorStyle from './burger-constructor.module.css';
import {useDispatch, useSelector} from "react-redux";
import {clearOrder, hideOrder} from "../../services/reducers/orders";
import Modal from "../modal/modal";
import Preloader from "../preloader/preloader";
import NoContent from "../no-content/no-content";
import OrderDetails from "../order-details/order-details";
import ResultInfo from "./result-info/result-info";
import EmptyConstructor from "./empty-constructor/empty-constructor";
import BurgerComponents from "./burger-components/burger-components";

const BurgerConstructor = () => {
  const {status, showOrder} = useSelector((state) => state.orders);
  const {bun, options} = useSelector((state) => state.burgerConstructor);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(hideOrder());
    dispatch(clearOrder());
  };

  return (
    <>
      <section className={constructorStyle.container}>
        <div className={constructorStyle.constructor}>
          {!bun && options.length === 0 ? <EmptyConstructor /> : <BurgerComponents />}
        </div>
        <ResultInfo />
      </section>
      {showOrder && (
        <Modal title="" onClose={closeModal}>
          {(status === 'loading')
            ? <Preloader />
            : (status === 'failed')
              ? <NoContent />
              : <OrderDetails />
          }
        </Modal>
      )}
    </>
  )
}

export default BurgerConstructor;