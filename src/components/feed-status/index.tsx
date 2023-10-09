import style from './feed-status.module.css'
import StatusList from './status-list'
import StatusStatistics from './status-statistics'
import {
  selectDoneOrders,
  selectFeedTotal,
  selectFeedTotalToday,
  selectPendingOrders
} from '../../services/reducers/orders'
import { useSelector } from 'react-redux'

const FeedStatus = () => {
  const doneOrders = useSelector(selectDoneOrders)
  const pendingOrders = useSelector(selectPendingOrders)
  const allOrders = useSelector(selectFeedTotal)
  const allOrdersToday = useSelector(selectFeedTotalToday)

  return (
    <section className={style.container}>
      <div className={style.status}>
        <StatusList label={'Готовы'} orders={doneOrders} color={'#0CC'}/>
        <StatusList label={'В работе'} orders={pendingOrders}/>
      </div>
      <StatusStatistics label={'Выполнено за все время:'} value={allOrders}/>
      <StatusStatistics label={'Выполнено за сегодня:'} value={allOrdersToday}/>
    </section>
  )
}

export default FeedStatus
