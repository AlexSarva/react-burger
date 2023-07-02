import styles from './api-error.module.css';
import PropTypes from "prop-types";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";

const ApiError = ({message, onRetry}) => {
  return (
    <div className={styles.container}>
      <div className={styles.animationContainer}>
        <div className={styles.bounce}></div>
        <div className={styles.pebble1}></div>
        <div className={styles.pebble2}></div>
        <div className={styles.pebble3}></div>
      </div>
      <div>
        <h2>Упс... Что-то пошло не так!</h2>
        <p>{`Причина: ${message}`}</p>
      </div>
      <Button onClick={onRetry} htmlType={'button'}>Попробовать еще раз</Button>
    </div>
  )
}

ApiError.propTypes = {
  message: PropTypes.string.isRequired,
  onRetry: PropTypes.func.isRequired
}


export default ApiError;