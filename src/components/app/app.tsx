import Main from '../pages/main/main'
import { Route, Routes } from 'react-router-dom'
import Layout from '../layout/layout'
import Login from '../pages/login/login'
import Register from '../pages/register/register'
import ResetPassword from '../pages/reset-password/reset-password'
import ForgotPassword from '../pages/forgot-password/forgot-password'
import Profile from '../pages/profile/profile'
import NotFound from '../pages/not-found/not-found'
import Ingredient from '../pages/ingredient/ingredient'
import OrderIngredients from '../pages/order-ingredients'
import Orders from '../pages/orders'
import ProtectRoute from '../../hoc/protect-route'
import { useEffect } from 'react'
import { fetchIngredients } from '../../services/reducers/ingredients'
import { fetchUserInfo, selectToken } from '../../services/reducers/auth'
import { FetchDispatch, useAppDispatch } from '../../index'
import Feed from '../pages/feed'
import { useSelector } from 'react-redux'
import { wsInit } from '../../services/reducers/orders'
import ProfileLayout from '../pages/profile-layout'

function App () {
  const dispatch: FetchDispatch = useAppDispatch()
  const token = useSelector(selectToken)

  useEffect(() => {
    dispatch(fetchIngredients())
    dispatch(fetchUserInfo())
    dispatch(wsInit('feed'))
    dispatch(wsInit('my'))
  }, [token, dispatch])

  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Main/>}/>
        <Route path='feed' element={<Feed/>}/>
        <Route path='feed/:id' element={<OrderIngredients type={'feed'}/>}/>
        <Route path='login' element={<ProtectRoute onlyUnAuth={true}/>}>
          <Route index element={<Login/>}/>
        </Route>
        <Route path='register' element={<ProtectRoute onlyUnAuth={true}/>}>
          <Route index element={<Register/>}/>
        </Route>
        <Route path='reset-password' element={<ProtectRoute onlyUnAuth={true}/>}>
          <Route index element={<ResetPassword/>}/>
        </Route>
        <Route path='forgot-password' element={<ProtectRoute onlyUnAuth={true}/>}>
          <Route index element={<ForgotPassword/>}/>
        </Route>
        <Route path='/ingredients/:id' element={<Ingredient/>}/>
        <Route path='profile' element={<ProtectRoute/>}>
          <Route path='' element={<ProfileLayout />}>
            <Route index element={<Profile />}/>
            <Route path='orders' element={<Orders />} />
          </Route>
          <Route path='orders/:id' element={<OrderIngredients type={'my'}/>}/>
        </Route>
      </Route>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  )
}

export default App
