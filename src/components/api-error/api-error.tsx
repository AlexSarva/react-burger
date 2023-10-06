import styles from './api-error.module.css'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { FC } from 'react'

interface ApiErrorProps {
  message: unknown;
  onRetry: () => void;
}

const ApiError: FC<ApiErrorProps> = ({ message, onRetry }) => {
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
      <Button onClick={onRetry} type="primary" size="medium" htmlType={'button'}>Попробовать еще раз</Button>
    </div>
  )
}

export default ApiError
