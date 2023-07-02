import style from './forgot-password.module.css';
import {useState} from "react";
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";

const ForgotPassword = () => {
  const [state, setState] = useState({
    email: '',
  });

  const handleChangeState = (name, value) => {
    setState({
      ...state,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(state)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={style.container}>
      <h2 className={`text text_type_main-medium`}>Восстановление пароля</h2>
      <EmailInput value={state.email}
                  name={'email'}
                  placeholder="Укажите e-mail"
                  isIcon={false}
                  extraClass={'mt-6'}
                  onChange={(e) => {
                    handleChangeState(e.target.name, e.target.value)
                  }}/>
      <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6">
        Зарегистрироваться
      </Button>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Вспомнили пароль?
        <Link
          to={'/login'}
          className={`text text_type_main-default ${style.link} pl-2`}>Войти</Link>
      </p>
    </form>
  )
}

export default ForgotPassword;