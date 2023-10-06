import style from './status-statistics.module.css'
import { FC } from 'react'

type StatusStatisticsProps = {
  label: string
  value: number
}
const StatusStatistics: FC<StatusStatisticsProps> = ({ label, value }) => {
  return (
    <div className={style.container}>
      <p className={'text text_type_main-medium'}>{label}</p>
      <p className={'text text_type_digits-large'}>{value}</p>
    </div>
  )
}

export default StatusStatistics
