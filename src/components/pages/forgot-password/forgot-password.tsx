import style from './forgot-password.module.css'
import { FormEvent, useEffect, useState } from 'react'
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { useMutation } from 'react-query'
import useAuth, { TResetPassword } from '../../../utils/auth-api'
import Preloader from '../../preloader/preloader'
import ApiError from '../../api-error/api-error'
import { onClose } from '../../../services/reducers/orders'
import { useAppDispatch } from '../../../index'

const ForgotPassword = () => {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const [state, setState] = useState<TResetPassword>({
    email: ''
  })
  const { resetPassword } = useAuth()
  const mutation = useMutation(resetPassword)

  const handleChangeState = (value: string) => {
    setState({
      ...state,
      email: value
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!state.email) return
    mutation.mutate(state)
  }

  if (mutation.isLoading) return <Preloader/>

  if (mutation.isError) return <ApiError onRetry={() => mutation.reset()} message={mutation.error}/>

  useEffect(() => {
    dispatch(onClose('feed'))
    dispatch(onClose('my'))
  }, [dispatch, onClose])

  return (
    <>
      {mutation.isSuccess
        ? <Navigate to={'/reset-password'} state={{ from: location.pathname }}/>
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
                        handleChangeState(e.target.value)
                      }}/>
          <Button htmlType="submit"
                  type="primary"
                  size="medium"
                  extraClass="mt-6">
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
