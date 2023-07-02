import {Fragment} from "react";
import AppHeader from "../app-header/app-header";
import {Outlet} from "react-router-dom";

const Layout = () => {
  return (
    <Fragment>
      <AppHeader/>
      <Outlet/>
    </Fragment>
  )
}

export default Layout;