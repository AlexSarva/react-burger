import style from './register.module.css'
import { useEffect, useState } from 'react'
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchRegister,
  resetError,
  resetStatus,
  selectErrors,
  selectIsLogged,
  selectStatuses
} from '../../../services/reducers/auth'
import Preloader from '../../preloader/preloader'
import ApiError from '../../api-error/api-error'

const Register = () => {
  const { registerStatus } = useSelector(selectStatuses)
  const { registerError, isError } = useSelector(selectErrors)
  const isLogged = useSelector(selectIsLogged)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [state, setState] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleChangeState = (name, value) => {
    setState({
      ...state,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(fetchRegister(state))
  }

  const handleReset = () => {
    setState({
      name: '',
      email: '',
      password: ''
    })
    dispatch(resetError({ error: 'registerError' }))
    dispatch(resetStatus({ status: 'registerStatus' }))
  }

  useEffect(() => {
    if (isLogged) {
      navigate('/') // TODO: поменять на страницу, с которой пришел
    }
  }, [isLogged, navigate])

  useEffect(() => {
    dispatch(resetError({ error: 'registerError' }))
  }, [dispatch])

  return (
    <>
      {registerStatus === 'failed' && isError && registerError &&
        <ApiError message={registerError.reason} onRetry={handleReset}/>}
      {registerStatus === 'loading' && <Preloader/>}
      {registerStatus === 'idle' && <form
        onSubmit={handleSubmit}
        className={style.container}>
        <h2 className={'text text_type_main-medium'}>Регистрация</h2>
        <Input name={'name'}
               value={state.name}
               placeholder="Имя"
               extraClass={'mt-6'}
               onChange={(e) => {
                 handleChangeState(e.target.name, e.target.value)
               }}/>
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
          Зарегистрироваться
        </Button>
        <p className="text text_type_main-default text_color_inactive mt-20">
          Уже зарегистрированы?
          <Link
            to={'/login'}
            className={`text text_type_main-default ${style.link} pl-2`}>Войти</Link>
        </p>
      </form>
      }
    </>
  )
}

export default Register
