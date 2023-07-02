import Main from "../pages/main/main";
import {Route, Routes} from "react-router-dom";
import Layout from "../layout/layout";
import Login from "../pages/login/login";
import Register from "../pages/register/register";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Main/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>
      </Route>
    </Routes>
  );
}

export default App;
