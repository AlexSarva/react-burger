import { Navigate, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  fetchLogout,
  resetError,
  resetStatus,
  selectErrors,
  selectStatuses
} from '../../../services/reducers/auth'
import Preloader from '../../preloader/preloader'
import ApiError from '../../api-error/api-error'
import { FetchDispatch, useAppDispatch } from '../../../index'
import style from './profile-layout.module.css'

const ProfileLayout = () => {
  const { logoutStatus } = useSelector(selectStatuses)
  const { logoutError } = useSelector(selectErrors)
  const dispatch: FetchDispatch = useAppDispatch()
  const location = useLocation()

  const handleRetryLogout = () => {
    dispatch(resetError({ error: 'logoutError' }))
    dispatch(resetStatus({ status: 'logoutStatus' }))
  }

  const handleLogout = () => {
    dispatch(fetchLogout())
  }

  if (logoutStatus === 'loading') return <Preloader/>

  if (logoutStatus === 'failed') return <ApiError onRetry={handleRetryLogout} message={logoutError?.reason}/>

  return (
    <>
      {logoutStatus === 'succeeded'
        ? <Navigate to={'/login'}/>
        : <section className={style.container}>
          <ul className={style.navigation}>
            <li className={style.navigationElement}>
              <NavLink to={'/profile'} className={({ isActive }) => isActive
                ? `text text_type_main-medium ${style.link} ${location.pathname === '/profile' ? style.link_active : null}`
                : `text text_type_main-medium ${style.link} text_color_inactive`}>Профиль</NavLink>
            </li>
            <li className={style.navigationElement}>
              <NavLink to={'/profile/orders'} className={({ isActive }) => isActive
                ? `text text_type_main-medium ${style.link} ${style.link_active}`
                : `text text_type_main-medium ${style.link} text_color_inactive`}>История заказов</NavLink>
            </li>
            <li className={style.navigationElement}>
              <p onClick={handleLogout} className={`${style.exit} text text_type_main-medium text_color_inactive`}>Выход</p>
            </li>
            <div className={'mt-20'}>
              <p className="text text_type_main-default text_color_inactive ">
                В этом разделе вы можете
              </p>
              <p className="text text_type_main-default text_color_inactive">{location.pathname === '/profile' ? 'изменить свои персональные данные' : 'просмотреть свою историю заказов'}</p>
            </div>
          </ul>
          <Outlet />
        </section>
      }
    </>
  )
}

export default ProfileLayout
