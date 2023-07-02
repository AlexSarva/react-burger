import Main from "../pages/main/main";
import {Route, Routes} from "react-router-dom";
import Layout from "../layout/layout";
import Login from "../pages/login/login";
import Register from "../pages/register/register";
import ResetPassword from "../pages/reset-password/reset-password";
import ForgotPassword from "../pages/forgot-password/forgot-password";
import Profile from "../pages/profile/profile";
import NotFound from "../pages/not-found/not-found";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Main/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>
        <Route path='reset-password' element={<ResetPassword/>}/>
        <Route path='forgot-password' element={<ForgotPassword/>}/>
        <Route path='profile' element={<Profile/>}/>
      </Route>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  );
}

export default App;
