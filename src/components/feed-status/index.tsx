import style from './feed-status.module.css'
import StatusList from './status-list'
import StatusStatistics from './status-statistics'

const orders = [
  '034325', '034123',
  '034325', '034123'
]

const FeedStatus = () => {
  return (
    <section className={style.container}>
      <div className={style.status}>
        <StatusList label={'Готовы'} orders={orders} color={'#0CC'}/>
        <StatusList label={'В работе'} orders={orders}/>
      </div>
      <StatusStatistics label={'Выполнено за все время:'} value={28752}/>
      <StatusStatistics label={'Выполнено за сегодня:'} value={138}/>
    </section>
  )
}

export default FeedStatus
