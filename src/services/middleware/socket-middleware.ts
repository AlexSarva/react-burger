import { FetchDispatch, RootState } from '../../index'
import { Middleware, MiddlewareAPI, AnyAction } from 'redux'
import { TFeedActions, TMessageOrders } from '../reducers/orders'

export enum SocketType {
  feed = 'feed',
  my = 'my'
}

type TSockedMiddleware = {
  ({ wsUrl, wsActions }: {
    wsUrl: string,
    wsActions: TFeedActions,
    entityType: SocketType
  }): Middleware
}

export const socketMiddleware: TSockedMiddleware = ({ wsUrl, wsActions, entityType }) => {
  return ((store: MiddlewareAPI<FetchDispatch, RootState>) => {
    let socket: WebSocket | null = null

    return next => (appAction: AnyAction) => {
      const { dispatch, getState } = store
      const { type, payload } = appAction
      const {
        wsInit, onError, onClose, onOpen, updateOrders
        , setOrdersCnt
      } = wsActions
      const { token } = getState().auth

      if (type === wsInit.type && payload === entityType && token) {
        socket = new WebSocket(`${wsUrl}?token=${token}`)
      }

      if (type === onClose.type && payload === entityType) {
        socket?.close()
        socket = null
      }

      if (socket) {
        socket.onopen = () => {
          dispatch(onOpen(entityType))
        }

        socket.onerror = event => {
          dispatch(onError({
            type: entityType,
            error: event
          }))
        }

        socket.onmessage = event => {
          const { data } = event
          const parsedData: TMessageOrders = JSON.parse(data)
          const { success, total, totalToday, ...restParsedData } = parsedData
          if (success) {
            dispatch(updateOrders({
              type: entityType,
              orders: restParsedData.orders
            }))
            dispatch(setOrdersCnt({
              type: entityType,
              cnt: {
                total,
                totalToday
              }
            }))
          }
        }

        socket.onclose = () => {
          dispatch(onClose(entityType))
        }
      }

      next(appAction)
    }
  }) as Middleware
}
