import style from './profile.module.css'
import { Navigate, NavLink } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import {
  CheckMarkIcon,
  CloseIcon,
  EmailInput,
  Input,
  PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchLogout,
  fetchPatchUserInfo,
  resetError,
  resetStatus,
  selectErrors,
  selectStatuses,
  selectUser
} from '../../../services/reducers/auth'
import Preloader from '../../preloader/preloader'
import ApiError from '../../api-error/api-error'

const Profile = () => {
  const userInfo = useSelector(selectUser)
  const { logoutStatus } = useSelector(selectStatuses)
  const { logoutError } = useSelector(selectErrors)
  const [state, setState] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [stateChanged, setStateChanged] = useState({
    name: false,
    email: false,
    password: false
  })
  const [fieldIsDisabled, setFieldIsDisabled] = useState({
    name: true,
    email: true,
    password: true
  })
  const dispatch = useDispatch()

  const nameRef = useRef(null)

  const onIconClick = (name) => {
    setFieldIsDisabled((s) => {
      return {
        ...s,
        [name]: false
      }
    })
    setTimeout(() => nameRef.current.focus(), 0)
  }

  const handleChangeState = (name, value) => {
    setStateChanged((s) => {
      return {
        ...s,
        [name]: true
      }
    })
    setState({
      ...state,
      [name]: value
    })
  }

  const handleRetryLogout = () => {
    dispatch(resetError({ error: 'logoutError' }))
    dispatch(resetStatus({ status: 'logoutStatus' }))
  }

  const handleSubmit = (e, name) => {
    e.preventDefault()
    setStateChanged((s) => {
      return {
        ...s,
        [name]: false
      }
    })
    setFieldIsDisabled((s) => {
      return {
        ...s,
        [name]: true
      }
    })
    console.log({
      [name]: state[name]
    })
    dispatch(fetchPatchUserInfo({
      [name]: state[name]
    }))
  }

  const handleReset = (e, name) => {
    e.preventDefault()
    if (name !== 'password') {
      setState((s) => {
        return {
          ...s,
          [name]: userInfo[name]
        }
      })
    } else {
      setState((s) => {
        return {
          ...s,
          password: ''
        }
      })
    }
    setStateChanged((s) => {
      return {
        ...s,
        [name]: false
      }
    })
    setFieldIsDisabled((s) => {
      return {
        ...s,
        [name]: true
      }
    })
  }

  const handleLogout = () => {
    dispatch(fetchLogout())
  }

  useEffect(() => {
    setState((s) => {
      return {
        ...s,
        name: userInfo.name,
        email: userInfo.email
      }
    })
  }, [userInfo])

  if (logoutStatus === 'loading') return <Preloader/>

  if (logoutStatus === 'failed') return <ApiError onRetry={handleRetryLogout} message={logoutError.reason}/>

  return (
    <>
      {logoutStatus === 'succeeded'
        ? <Navigate to={'/login'}/>
        : <section className={style.container}>
          <ul className={style.navigation}>
            <li className={style.navigationElement}>
              <NavLink to={'/profile'} className={({ isActive }) => isActive
                ? `text text_type_main-medium ${style.link} ${style.link_active}`
                : `text text_type_main-medium ${style.link} text_color_inactive`}>Профиль</NavLink>
            </li>
            <li className={style.navigationElement}>
              <NavLink to={'/profile/orders'} className={({ isActive }) => isActive
                ? `text text_type_main-medium ${style.link} ${style.link_active}`
                : `text text_type_main-medium ${style.link} text_color_inactive`}>История заказов</NavLink>
            </li>
            <li className={style.navigationElement}>
              <p onClick={handleLogout} className={'text text_type_main-medium text_color_inactive'}>Выход</p>
            </li>
            <p className="text text_type_main-default text_color_inactive mt-20">
              В этом разделе вы можете <br/> изменить свои персональные данные
            </p>
          </ul>
          <div className={style.inputs}>
            <form
              onSubmit={(e) => handleSubmit(e, 'name')}
              onReset={(e) => handleReset(e, 'name')}
              className={style.form}>
              <Input name={'name'}
                     type={'text'}
                     value={state.name}
                     icon={'EditIcon'}
                     ref={nameRef}
                     disabled={fieldIsDisabled.name}
                     onIconClick={() => onIconClick('name')}
                     placeholder="Имя"
                     onChange={(e) => {
                       handleChangeState(e.target.name, e.target.value)
                     }}/>
              {stateChanged.name &&
                <div className={style.formButtons}>
                  <button type='submit' className={style.button}>
                    <CheckMarkIcon type={'success'}/>
                  </button>
                  <button type='reset' className={style.button}>
                    <CloseIcon type={'error'}/>
                  </button>
                </div>
              }
            </form>
            <form
              onSubmit={(e) => handleSubmit(e, 'email')}
              onReset={(e) => handleReset(e, 'email')}
              className={style.form}>
              <EmailInput value={state.email}
                          name={'email'}
                          placeholder="Логин"
                          disabled={fieldIsDisabled.email}
                          onIconClick={() => onIconClick('email')}
                          icon={'EditIcon'}
                          onChange={(e) => {
                            handleChangeState(e.target.name, e.target.value)
                          }}/>
              {stateChanged.email &&
                <div className={style.formButtons}>
                  <button type='submit' className={style.button}>
                    <CheckMarkIcon type={'success'}/>
                  </button>
                  <button type='reset' className={style.button}>
                    <CloseIcon type={'error'}/>
                  </button>
                </div>
              }
            </form>
            <form
              onSubmit={(e) => {
                handleSubmit(e, 'password')
                setState((s) => {
                  return {
                    ...s,
                    password: ''
                  }
                })
              }}
              onReset={(e) => handleReset(e, 'password')}
              className={style.form}>
              <PasswordInput value={state.password}
                             name={'password'}
                             icon={'EditIcon'}
                             placeholder="Пароль"
                             onChange={(e) => {
                               handleChangeState(e.target.name, e.target.value)
                             }}
                             onBlur={(e) => {
                               console.log(e)
                             }}
              />
              {stateChanged.password &&
                <div className={style.formButtons}>
                  <button type='submit' className={style.button}>
                    <CheckMarkIcon type={'success'}/>
                  </button>
                  <button type='reset' className={style.button}>
                    <CloseIcon type={'error'}/>
                  </button>
                </div>
              }
            </form>
          </div>
        </section>
      }
    </>
  )
}

export default Profile
