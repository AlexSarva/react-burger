import { FetchDispatch, RootState } from '../../index'
import { Middleware, MiddlewareAPI, AnyAction } from 'redux'
import { TFeedActions, TMessageOrders } from '../reducers/orders'

enum socketType {
  feed = 'feed',
  my = 'my'
}

type TSockedMiddleware = {
  ({ wsFeedUrl, wsMyUrl, wsActions }: {
    wsFeedUrl: string,
    wsMyUrl: string,
    wsActions: TFeedActions
  }): Middleware
}

export const socketMiddleware: TSockedMiddleware = ({ wsFeedUrl, wsMyUrl, wsActions }) => {
  return ((store: MiddlewareAPI<FetchDispatch, RootState>) => {
    let socketFeed: WebSocket | null = null
    let socketMy: WebSocket | null = null

    return next => (appAction: AnyAction) => {
      const { dispatch, getState } = store
      const { type, payload } = appAction
      const {
        wsInit, onError, onClose, onOpen, updateOrders
        , setOrdersCnt
      } = wsActions
      const { token } = getState().auth

      if (type === wsInit.type && token) {
        if (payload === socketType.my) {
          socketMy = new WebSocket(`${wsMyUrl}?token=${token}`)
        }
        if (payload === socketType.feed) {
          socketFeed = new WebSocket(`${wsFeedUrl}?token=${token}`)
        }
      }
      if (socketFeed) {
        socketFeed.onopen = () => {
          dispatch(onOpen(socketType.feed))
        }

        socketFeed.onerror = event => {
          dispatch(onError({
            type: socketType.feed,
            error: event
          }))
        }

        socketFeed.onmessage = event => {
          const { data } = event
          const parsedData: TMessageOrders = JSON.parse(data)
          const { success, total, totalToday, ...restParsedData } = parsedData
          if (success) {
            dispatch(updateOrders({
              type: socketType.feed,
              orders: restParsedData.orders
            }))
            dispatch(setOrdersCnt({
              type: socketType.feed,
              cnt: {
                total,
                totalToday
              }
            }))
          }
        }

        socketFeed.onclose = () => {
          dispatch(onClose(socketType.feed))
        }
      }

      if (socketMy) {
        socketMy.onopen = () => {
          dispatch(onOpen(socketType.my))
        }

        socketMy.onerror = event => {
          dispatch(onError({
            type: socketType.my,
            error: event
          }))
        }

        socketMy.onmessage = event => {
          const { data } = event
          const parsedData: TMessageOrders = JSON.parse(data)
          const { success, total, totalToday, ...restParsedData } = parsedData
          if (success) {
            dispatch(updateOrders({
              type: socketType.my,
              orders: restParsedData.orders
            }))
            dispatch(setOrdersCnt({
              type: socketType.my,
              cnt: {
                total,
                totalToday
              }
            }))
          }
        }

        socketMy.onclose = () => {
          dispatch(onClose(socketType.my))
        }
      }

      next(appAction)
    }
  }) as Middleware
}
