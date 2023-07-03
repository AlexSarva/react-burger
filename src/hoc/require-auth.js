import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserInfo, selectIsLogged } from '../services/reducers/auth'
import { useEffect, useState } from 'react'
import { getCookie } from '../utils/cookie'
import { checkTokenAndFetch } from '../utils/utils'
import Preloader from '../components/preloader/preloader'

const RequireAuth = () => {
  const location = useLocation()
  const isLogged = useSelector(selectIsLogged)
  const dispatch = useDispatch()

  // Introduce a new state to track if token check has completed
  const [tokenChecked, setTokenChecked] = useState(false)

  useEffect(() => {
    const token = getCookie('accessToken')
    if (!isLogged && token) {
      checkTokenAndFetch(dispatch, fetchUserInfo)
        .then(() => setTokenChecked(true)) // Set the new state here
        .catch((error) => {
          console.log(error)
          setTokenChecked(true) // Set the new state here too
        })
    } else {
      // If there's no token, no need to check
      setTokenChecked(true)
    }
  }, [dispatch, isLogged])

  // Only render Outlet or Navigate if token check has completed
  return tokenChecked
    ? isLogged
      ? <Outlet/>
      : <Navigate to="/login" state={{ from: location }}/>
    : <Preloader/>
}

export { RequireAuth }
