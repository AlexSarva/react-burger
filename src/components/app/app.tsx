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
import ProtectRoute from '../../hoc/protect-route'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchIngredients } from '../../services/reducers/ingredients'
import { fetchUserInfo } from '../../services/reducers/auth'
import { FetchDispatch } from '../../index'

function App () {
  const dispatch: FetchDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchIngredients())
    dispatch(fetchUserInfo())
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Main/>}/>
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
          <Route index element={<Profile/>}/>
        </Route>
      </Route>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  )
}

export default App
