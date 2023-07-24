import style from './register.module.css'
import { FormEvent, useEffect, useState } from 'react'
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRegister, resetError, resetStatus, selectErrors, selectStatuses } from '../../../services/reducers/auth'
import Preloader from '../../preloader/preloader'
import ApiError from '../../api-error/api-error'
import { TAuth } from '../../../utils/auth-api'
import { FetchDispatch } from '../../../index'

const Register = () => {
  const { registerStatus } = useSelector(selectStatuses)
  const { registerError, isError } = useSelector(selectErrors)
  const dispatch: FetchDispatch = useDispatch()
  const [state, setState] = useState<TAuth>({
    name: '',
    email: '',
    password: ''
  })

  const handleChangeState = (name: keyof TAuth, value: string) => {
    setState({
      ...state,
      [name]: value
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
               value={state.name || ''}
               placeholder="Имя"
               extraClass={'mt-6'}
               onChange={(e) => {
                 handleChangeState('name', e.target.value)
               }}/>
        <EmailInput value={state.email}
                    name={'email'}
                    placeholder="E-mail"
                    isIcon={false}
                    extraClass={'mt-6'}
                    onChange={(e) => {
                      handleChangeState('email', e.target.value)
                    }}/>
        <PasswordInput value={state.password}
                       name={'password'}
                       placeholder="Пароль"
                       extraClass={'mt-6'}
                       onChange={(e) => {
                         handleChangeState('password', e.target.value)
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
