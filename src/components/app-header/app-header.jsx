import headerStyle from './app-header.module.css';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";

const NavigationLink = (props) => {
  return (
    <li name={props.name} className={`${headerStyle.header__navigationElement} pl-5 pr-5`}>
      {props.children}
      <p className={`pl-2 text text_type_main-default ${!props.isActive && "text_color_inactive"}`}>{props.text}</p>
    </li>
  );
}

const Navigation = (props) => {

  const { isActiveConstructor, isActiveList} = props.activeState;

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