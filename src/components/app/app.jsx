import React, {useEffect, useState} from 'react';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {useIngredientsAPI} from "../../hooks/use-ingredients-api";
import ModalOverlay from "../modal-overlay/modal-overlay";
import Modal from "../modal/modal";
import appStyle from './app.module.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ingredients, setIngredients] = useState({
    buns: [],
    mains: [],
    sauces: []
  });
  const [pickedIngredients, setPickedIngredients] = useState({
    bun: null,
    options: [],
  });
  const { getIngredients} = useIngredientsAPI();

  const pickBun = (bun) => {
    setPickedIngredients({...pickedIngredients, bun: bun})
  }

  const pickOption = (item) => {
    setPickedIngredients({...pickedIngredients, options: [...pickedIngredients.options, item]})
  }
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getIngredients()
      .then(({data, success}) => {
        if (success === true) {
          setIngredients({
            buns: data.filter(item => item.type === "bun"),
            mains: data.filter(item => item.type === "main"),
            sauces: data.filter(item => item.type === "sauce")
          })
        } else {
          console.log('something went wrong');
        }
      })
      .catch((err) => {
        console.log(err);
      })
  },[getIngredients])

  return (
    <>
      <button className={appStyle.test} onClick={openModal}>Открыть</button>
      <AppHeader />
      <BurgerIngredients ingredients={ingredients}
                         onClickBun={pickBun}
                         onClickOption={pickOption}
      />
      <BurgerConstructor pickedIngredients={pickedIngredients} />
      {isModalOpen && (
        <>
          <ModalOverlay onClick={closeModal} />
          <Modal title="Заголовок модального окна" onClose={closeModal}>
            <p>Содержимое модального окна</p>
          </Modal>
        </>
      )}
    </>
  );
}

export default App;
