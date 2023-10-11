import style from './login.module.css'
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { FormEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { fetchLogin, resetError, resetStatus, selectErrors, selectStatuses } from '../../../services/reducers/auth'
import ApiError from '../../api-error/api-error'
import Preloader from '../../preloader/preloader'
import { TAuth } from '../../../utils/auth-api'
import { FetchDispatch, useAppDispatch } from '../../../index'
import { onClose } from '../../../services/reducers/orders'

const Login = () => {
  const { loginStatus } = useSelector(selectStatuses)
  const { loginError, isError } = useSelector(selectErrors)
  const dispatch: FetchDispatch = useAppDispatch()
  const [state, setState] = useState<TAuth>({
    email: '',
    password: ''
  })

  const handleChangeState = (name: string, value: string) => {
    setState({
      ...state,
      [name]: value
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(fetchLogin(state))
  }

  const handleReset = () => {
    setState({
      email: '',
      password: ''
    })
    dispatch(resetError({ error: 'loginError' }))
    dispatch(resetStatus({ status: 'loginStatus' }))
  }

  useEffect(() => {
    dispatch(resetError({ error: 'loginError' }))
    dispatch(onClose('feed'))
    dispatch(onClose('my'))
  }, [dispatch, onClose])

  return (
    <>
      {loginStatus === 'failed' && isError && loginError &&
        <ApiError message={loginError.reason} onRetry={handleReset}/>}
      {loginStatus === 'loading' && <Preloader/>}
      {loginStatus === 'idle' && <form
        onSubmit={handleSubmit}
        className={style.container}>
        <h2 className={'text text_type_main-medium'}>Вход</h2>
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

export default Login
