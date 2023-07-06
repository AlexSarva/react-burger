import styles from './no-content.module.css'

const NoContent = () => {
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
        <p>Попробуйте обновить страницу еще раз</p>
      </div>

    </div>
  )
}

export default NoContent
