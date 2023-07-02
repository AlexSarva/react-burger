import {Navigate, Outlet, useLocation} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {selectIsLogged} from '../services/reducers/auth'

const RequireAuth = () => {
  const location = useLocation()
  const isLogged = useSelector(selectIsLogged)

  return isLogged ? <Outlet/> : <Navigate to="/login" state={{from: location}}/>
}

export {RequireAuth}
