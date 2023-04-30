import PropTypes from "prop-types";

export const IngredientFullType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  count: PropTypes.number,
})

export const ConstructorElementType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image_mobile: PropTypes.string.isRequired,
})

export const IngredientType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  calories: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired
})

export const IngredientDetailsType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
})

