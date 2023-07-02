import Main from "../pages/main/main";
import {Route, Routes} from "react-router-dom";
import Layout from "../layout/layout";
import Login from "../pages/login/login";
import Register from "../pages/register/register";
import ResetPassword from "../pages/reset-password/reset-password";
import ForgotPassword from "../pages/forgot-password/forgot-password";
import Profile from "../pages/profile/profile";
import NotFound from "../pages/not-found/not-found";
import {RequireAuth} from "../../hoc/require-auth";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserInfo, selectIsLogged} from "../../services/reducers/auth";
import {getCookie} from "../../utils/cookie";
import {useEffect} from "react";
import {checkTokenAndFetch} from "../../utils/utils";

function App() {

  const isLogged = useSelector(selectIsLogged)
  const dispatch = useDispatch()

  useEffect(() => {
    const token = getCookie('accessToken')
    if (!isLogged && token) {
      checkTokenAndFetch(dispatch, fetchUserInfo)
        .catch((error) => {
          console.log(error)
        })
    }
  }, [dispatch, isLogged])

  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Main/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>
        <Route path='reset-password' element={<ResetPassword/>}/>
        <Route path='forgot-password' element={<ForgotPassword/>}/>
        <Route path='profile' element={<RequireAuth/>}>
          <Route index element={<Profile/>}/>
        </Route>
      </Route>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  );
}

export default App;
