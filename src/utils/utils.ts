import { TExtendedOrder, TOrder } from '../services/reducers/orders'

export type TStatus = {
  label: string,
  color: string
}

export const checkOrderStatus = (order: TOrder | TExtendedOrder): TStatus => {
  switch (order.status) {
    case 'created':
      return {
        label: 'Создан',
        color: 'white'
      }
    case 'pending':
      return {
        label: 'Готовится',
        color: 'white'
      }
    case 'done':
      return {
        label: 'Выполнен',
        color: '#00CCCC'
      }
    default:
      return {
        label: 'Неизвестно',
        color: 'red'
      }
  }
}
