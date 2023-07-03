import style from './forgot-password.module.css'
import { useState } from 'react'
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, Navigate } from 'react-router-dom'
import { useMutation } from 'react-query'
import useAuth from '../../../utils/auth-api'
import Preloader from '../../preloader/preloader'
import ApiError from '../../api-error/api-error'

const ForgotPassword = () => {
  const [state, setState] = useState({
    email: ''
  })
  const { resetPassword } = useAuth()
  const mutation = useMutation(resetPassword)

  const handleChangeState = (name, value) => {
    setState({
      ...state,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    mutation.mutate(state)
  }

  return (
    <>
      {mutation.isLoading
        ? <Preloader/>
        : mutation.isError
          ? <ApiError onRetry={() => mutation.reset()}
                      message={mutation.error}/>
          : mutation.isSuccess
            ? <Navigate to={'/reset-password'}/>
            : <form
              onSubmit={handleSubmit}
              className={style.container}>
              <h2 className={'text text_type_main-medium'}>Восстановление пароля</h2>
              <EmailInput value={state.email}
                          name={'email'}
                          placeholder="Укажите e-mail"
                          isIcon={false}
                          extraClass={'mt-6'}
                          onChange={(e) => {
                            handleChangeState(e.target.name, e.target.value)
                          }}/>
              <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6">
                Восстановить
              </Button>
              <p className="text text_type_main-default text_color_inactive mt-20">
                Вспомнили пароль?
                <Link
                  to={'/login'}
                  className={`text text_type_main-default ${style.link} pl-2`}>Войти</Link>
              </p>
            </form>
      }
    </>

  )
}

export default ForgotPassword
