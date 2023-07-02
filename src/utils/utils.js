import {getCookie, isTokenExpired} from "./cookie";
import {fetchRefreshToken} from "../services/reducers/auth";

export const generateOrder = () => {
  return Math.floor(100000 + Math.random() * 900000);
}

export const checkTokenAndFetch = async (dispatch, cb) => {
  const token = getCookie('accessToken')
  if (isTokenExpired(token)) {
    try {
      await dispatch(fetchRefreshToken())
    } catch (error) {
      console.log('Token refresh failed:', error)
      return
    }
  }
  dispatch(cb())
}