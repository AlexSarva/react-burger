import style from './app-header.module.css';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import NavigationLink from "../navigation-link/navigation-link";


const AppHeader = () => {
  return (
    <header className={style.container}>
      <nav className={style.content}>
        <div className={style.navigation}>
          <NavigationLink path={'/'} label={'Конструктор'}>
            <BurgerIcon type={"primary"}/>
          </NavigationLink>
          <NavigationLink path={'/orders'} label={'Лента заказов'}>
            <ListIcon type={"secondary"}/>
          </NavigationLink>
        </div>
        <Logo/>
        <NavigationLink path={'/profile'} label={'Личный кабинет'}>
          <ProfileIcon type={"secondary"}/>
        </NavigationLink>
      </nav>
    </header>
  )
}

export default AppHeader;