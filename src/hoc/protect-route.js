import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Preloader from '../components/preloader/preloader'
import { selectIsAuthChecked, selectUser } from '../services/reducers/auth'

export const ProtectedRoute = ({ onlyUnAuth = false }) => {
  const isAuthChecked = useSelector(selectIsAuthChecked)
  const user = useSelector(selectUser)
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
