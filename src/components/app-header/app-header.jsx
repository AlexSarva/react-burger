import headerStyle from './app-header.module.css';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";
import PropTypes from "prop-types";

const NavigationLink = ({isActive, text, children}) => {
  return (
    <li className={`${headerStyle.header__navigationElement} pl-5 pr-5`}>
      {children}
      <p className={`pl-2 text text_type_main-default ${!isActive && "text_color_inactive"}`}>{text}</p>
    </li>
  );
}

NavigationLink.propTypes = {
  isActive: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

const Navigation = ({activeState}) => {

  const { isActiveConstructor, isActiveList} = activeState;

  return (
    <ul className={headerStyle.header__navigation}>
        <NavigationLink isActive={isActiveConstructor} text={"Конструктор"}>
          <BurgerIcon type={"primary"} />
        </NavigationLink>
        <NavigationLink isActive={isActiveList} text={"Лента заказов"}>
          <ListIcon type={"secondary"} />
        </NavigationLink>
    </ul>
  );
}

Navigation.propTypes = {
  activeState: PropTypes.shape({
    isActiveConstructor: PropTypes.bool.isRequired,
    isActiveList: PropTypes.bool.isRequired,
  }).isRequired,
}


const AppHeader = () => {
  const [state, setState] = useState({
    isActiveConstructor: true,
    isActiveList: false,
    isActiveProfile: false,
  })

  return (
    <header className={headerStyle.header}>
      <nav className={headerStyle.header__content}>
        <Navigation activeState={state}/>
        <Logo />
        <NavigationLink isActive={state.isActiveProfile} text={"Личный кабинет"}>
          <ProfileIcon type={"secondary"} />
        </NavigationLink>
      </nav>
    </header>
  )
}

export default AppHeader;