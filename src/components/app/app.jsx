import Main from '../pages/main/main'
import { Route, Routes } from 'react-router-dom'
import Layout from '../layout/layout'
import Login from '../pages/login/login'
import Register from '../pages/register/register'
import ResetPassword from '../pages/reset-password/reset-password'
import ForgotPassword from '../pages/forgot-password/forgot-password'
import Profile from '../pages/profile/profile'
import NotFound from '../pages/not-found/not-found'
import { RequireAuth } from '../../hoc/require-auth'
import { RestrictAuth } from '../../hoc/restrict-auth'
import Ingredient from '../pages/ingredient/ingredient'

function App () {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Main/>}/>
        <Route path='login' element={<RestrictAuth/>}>
          <Route index element={<Login/>}/>
        </Route>
        <Route path='register' element={<RestrictAuth/>}>
          <Route index element={<Register/>}/>
        </Route>
        <Route path='reset-password' element={<RestrictAuth/>}>
          <Route index element={<ResetPassword/>}/>
        </Route>
        <Route path='forgot-password' element={<RestrictAuth/>}>
          <Route index element={<ForgotPassword/>}/>
        </Route>
        <Route path='/ingredients/:id' element={<Ingredient/>}/>
        <Route path='profile' element={<RequireAuth/>}>
          <Route index element={<Profile/>}/>
        </Route>
      </Route>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  )
}

export default App
