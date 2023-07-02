import Main from "../pages/main/main";
import {Route, Routes} from "react-router-dom";
import Layout from "../layout/layout";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Main/>}/>
      </Route>
    </Routes>
  );
}

export default App;
