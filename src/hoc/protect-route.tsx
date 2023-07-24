import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Preloader from '../components/preloader/preloader'
import { selectIsAuthChecked, selectUser } from '../services/reducers/auth'
import { RootState } from '../services/reducers'
import { FC } from 'react'

type ProtectedRouteProps = {
  onlyUnAuth?: boolean
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ onlyUnAuth = false }) => {
  const isAuthChecked = useSelector((state: RootState) => selectIsAuthChecked(state))
  const user = useSelector((state: RootState) => selectUser(state))
  const location = useLocation()

  if (!isAuthChecked) {
    return <Preloader/>
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: '/' } }
    return <Navigate to={from}/>
  }

  if (!onlyUnAuth && !user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
      />
    )
  }

  return <Outlet/>
}

export default ProtectedRoute
