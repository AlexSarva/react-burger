import style from './reset-password.module.css';
import {useState} from "react";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";

const ResetPassword = () => {
  const [state, setState] = useState({
    password: '',
    code: null
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
      <PasswordInput value={state.password}
                     name={'password'}
                     placeholder="Введите новый пароль"
                     extraClass={'mt-6'}
                     onChange={(e) => {
                       handleChangeState(e.target.name, e.target.value)
                     }}
      />
      <Input name={'code'}
             value={state.code}
             placeholder="Введите код из письма"
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

export default ResetPassword;