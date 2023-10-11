import style from './profile.module.css'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { CheckMarkIcon, CloseIcon, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector } from 'react-redux'
import {
  fetchPatchUserInfo,
  resetError,
  resetStatus,
  selectErrors,
  selectStatuses,
  selectUser
} from '../../../services/reducers/auth'
import Preloader from '../../preloader/preloader'
import ApiError from '../../api-error/api-error'
import { TAuthOptional } from '../../../utils/auth-api'
import { FetchDispatch, useAppDispatch } from '../../../index'

type FieldState = {
  name: boolean;
  email: boolean;
  password: boolean;
}

const Profile = () => {
  const userInfo = useSelector(selectUser)
  const { logoutStatus } = useSelector(selectStatuses)
  const { logoutError } = useSelector(selectErrors)
  const [state, setState] = useState<TAuthOptional>({
    name: '',
    email: '',
    password: ''
  })
  const [stateChanged, setStateChanged] = useState<FieldState>({
    name: false,
    email: false,
    password: false
  })
  const [fieldIsDisabled, setFieldIsDisabled] = useState<FieldState>({
    name: true,
    email: true,
    password: true
  })
  const dispatch: FetchDispatch = useAppDispatch()

  const nameRef = useRef<HTMLInputElement>(null)

  const onIconClick = (name: string) => {
    setFieldIsDisabled((s) => {
      return {
        ...s,
        [name]: false
      }
    })
    setTimeout(() => nameRef.current?.focus(), 0)
  }

  const handleChangeState = (name: string, value: string) => {
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>, name: keyof TAuthOptional) => {
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

    dispatch(fetchPatchUserInfo({
      [name]: state[name]
    }))
  }

  const handleReset = (e: FormEvent<HTMLFormElement>, name: keyof TAuthOptional) => {
    e.preventDefault()
    if (name !== 'password' && userInfo) {
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

  useEffect(() => {
    setState((s) => {
      return {
        ...s,
        name: userInfo?.name,
        email: userInfo?.email
      }
    })
  }, [userInfo])

  if (logoutStatus === 'loading') return <Preloader/>

  if (logoutStatus === 'failed') return <ApiError onRetry={handleRetryLogout} message={logoutError?.reason}/>

  return (
    <div className={style.inputs}>
      <form
        onSubmit={(e) => handleSubmit(e, 'name')}
        onReset={(e) => handleReset(e, 'name')}
        className={style.form}>
        <Input name={'name'}
               type={'text'}
               value={state.name || ''}
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
        <Input value={state.email || ''}
               type={'email'}
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
        <PasswordInput value={state.password || ''}
                       name={'password'}
                       icon={'EditIcon'}
                       placeholder="Пароль"
                       onChange={(e) => {
                         handleChangeState(e.target.name, e.target.value)
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
  )
}

export default Profile
