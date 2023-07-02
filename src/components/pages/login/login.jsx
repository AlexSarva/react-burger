import style from './login.module.css';
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";
import {Link} from "react-router-dom";

const Login = () => {
  const [state, setState] = useState({
    email: '',
    password: ''
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
      <h2 className={`text text_type_main-medium`}>Вход</h2>
      <EmailInput value={state.email}
                  name={'email'}
                  placeholder="E-mail"
                  isIcon={false}
                  extraClass={'mt-6'}
                  onChange={(e) => {
                    handleChangeState(e.target.name, e.target.value)
                  }}/>
      <PasswordInput value={state.password}
                     name={'password'}
                     extraClass={'mt-6'}
                     onChange={(e) => {
                       handleChangeState(e.target.name, e.target.value)
                     }}
      />
      <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6">
        Войти
      </Button>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Вы — новый пользователь?
        <Link
          to={'/register'}
          className={`text text_type_main-default ${style.link} pl-2`}>Зарегистрироваться</Link>
      </p>
      <p className="text text_type_main-default text_color_inactive mt-4">
        Забыли пароль?
        <Link
          to={'/forgot-password'}
          className={`text text_type_main-default ${style.link} pl-2`}>Восстановить пароль</Link>
      </p>
    </form>
  )
}

export default Login;