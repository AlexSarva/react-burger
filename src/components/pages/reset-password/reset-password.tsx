import style from './reset-password.module.css'
import { FormEvent, useEffect, useState } from 'react'
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import authApi, { TResetPasswordConfirm } from '../../../utils/auth-api'
import { useMutation } from 'react-query'
import Preloader from '../../preloader/preloader'
import ApiError from '../../api-error/api-error'

const ResetPassword = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [state, setState] = useState<TResetPasswordConfirm>({
    password: '',
    token: ''
  })
  const { changePassword } = authApi()

  const mutation = useMutation(changePassword)

  const handleChangeState = (name: keyof TResetPasswordConfirm, value: string) => {
    setState({
      ...state,
      [name]: value
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutation.mutate(state)
  }

  useEffect(() => {
    if (!location.state || location.state.from !== '/forgot-password') {
      navigate('/forgot-password')
    }
  }, [location])

  return (
    <>
      {mutation.isLoading
        ? <Preloader/>
        : mutation.isError
          ? <ApiError onRetry={() => mutation.reset()}
                      message={mutation.error}/>
          : mutation.isSuccess
            ? <Navigate to={'/login'}/>
            : <form
              onSubmit={handleSubmit}
              className={style.container}>
              <h2 className={'text text_type_main-medium'}>Восстановление пароля</h2>
              <PasswordInput value={state.password}
                             name={'password'}
                             placeholder="Введите новый пароль"
                             extraClass={'mt-6'}
                             onChange={(e) => {
                               handleChangeState('password', e.target.value)
                             }}
              />
              <Input name={'token'}
                     value={state.token}
                     placeholder="Введите код из письма"
                     extraClass={'mt-6'}
                     onChange={(e) => {
                       handleChangeState('token', e.target.value)
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

export default ResetPassword
