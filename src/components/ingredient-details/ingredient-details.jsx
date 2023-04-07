import ModalOverlay from "../modal-overlay/modal-overlay";
import Modal from "../modal/modal";
import React from "react";
import modalIngStyle from "./ingredient-details.module.css";
import PropTypes from "prop-types";


const ModalIngElement = ({element}) => {
  return (
    <li className={modalIngStyle.modalInc_element}>
      <p className={`text text_type_main-small text_color_inactive`}>{element.name}</p>
      <span className={`text text_type_digits-default text_color_inactive`}>{element.value}</span>
    </li>
  );
}

ModalIngElement.propTypes = {
  element: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  }).isRequired
}

const ModalIngElements = ({elements}) => {
  return (
    <ul className={`${modalIngStyle.modalInc_elements} mt-8 mb-15`}>
      {elements.map((element) => (
        <ModalIngElement key={element.id} element={element}></ModalIngElement>
      ))}
    </ul>
  );
}

ModalIngElements.propTypes = {
  elements: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired
}

const IngredientDetails = ({onClose, ingredient}) => {
  const elements = [
    {
      id: 1,
      name: "Калории,ккал",
      value: ingredient.calories
    },
    {
      id: 2,
      name: "Белки, г",
      value: ingredient.proteins
    },
    {
      id: 3,
      name: "Жиры, г",
      value: ingredient.fat
    },
    {
      id: 4,
      name: "Углеводы, г",
      value: ingredient.carbohydrates
    }
  ]

  return (
    <>
      <ModalOverlay onClick={onClose} />
      <Modal title="Детали ингредиента" onClose={onClose}>
        <img className={modalIngStyle.modalIng_image} src={ingredient.image_large} alt={ingredient.name} />
        <h3 className={`${modalIngStyle.modalIng_description} text text_type_main-medium mt-4`}>{ingredient.name}</h3>
        <ModalIngElements elements={elements}/>
      </Modal>
    </>
  )
}

IngredientDetails.propTypes = {
  onClose: PropTypes.func.isRequired,
  ingredient: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired
  }).isRequired
}

export default IngredientDetails;