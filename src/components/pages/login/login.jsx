import style from './login.module.css';
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
  fetchLogin,
  resetError,
  resetStatus,
  selectErrors,
  selectIsLogged,
  selectStatuses
} from "../../../services/reducers/auth";
import ApiError from "../../api-error/api-error";
import Preloader from "../../preloader/preloader";

const Login = () => {
  const {loginStatus} = useSelector(selectStatuses)
  const {loginError, isError} = useSelector(selectErrors)
  const isLogged = useSelector(selectIsLogged)
  const dispatch = useDispatch()
  const navigate = useNavigate()
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
    dispatch(fetchLogin(state))
  }

  const handleReset = () => {
    setState({
      email: '',
      password: ''
    })
    dispatch(resetError({error: 'loginError'}))
    dispatch(resetStatus({status: 'loginStatus'}))
  }

  useEffect(() => {
    if (isLogged) {
      navigate('/') // TODO: поменять на страницу, с которой пришел
    }
  }, [isLogged, navigate])

  useEffect(() => {
    dispatch(resetError({error: 'loginError'}))
  }, [dispatch])

  return (
    <>
      {loginStatus === 'failed' && isError && loginError &&
        <ApiError message={loginError.reason} onRetry={handleReset}/>}
      {loginStatus === 'loading' && <Preloader/>}
      {loginStatus === 'idle' && <form
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
                       placeholder="Пароль"
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
      }
    </>

  )
}

export default Login;