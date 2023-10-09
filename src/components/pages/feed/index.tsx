import style from './feed.module.css'
import OrdersList from '../../orders-list'
import FeedStatus from '../../feed-status'
const Feed = () => {
  return (
    <main className={style.container}>
      <h1 className={'text text_type_main-large mt-10 '}>Лента заказов</h1>
      <div className={style.content}>
        <OrdersList/>
        <FeedStatus/>
      </div>
    </main>
  )
}

export default Feed
