import style from './profile.module.css';
import {Navigate, NavLink} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {
  fetchLogout,
  fetchPatchUserInfo,
  resetError,
  resetStatus,
  selectErrors,
  selectStatuses,
  selectUser
} from "../../../services/reducers/auth";
import Preloader from "../../preloader/preloader";
import ApiError from "../../api-error/api-error";
import {checkTokenAndFetch} from "../../../utils/utils";

const Profile = () => {
  const userInfo = useSelector(selectUser)
  const {logoutStatus} = useSelector(selectStatuses)
  const {logoutError} = useSelector(selectErrors)
  const [state, setState] = useState({
    name: '',
    email: '',
  });
  const [passwordState, setPasswordState] = useState({
    password: 'best-password-ever',
  })
  const dispatch = useDispatch()
  const [nameIsDisabled, setNameIsDisabled] = useState(true)
  const inputRef = useRef(null)
  const onIconClick = () => {
    setNameIsDisabled(false)
    setTimeout(() => inputRef.current.focus(), 0)
  }

  const handleChangeState = (name, value) => {
    setState({
      ...state,
      [name]: value
    })
  }

  const handleRetryLogout = () => {
    dispatch(resetError({error: 'logoutError'}))
    dispatch(resetStatus({status: 'logoutStatus'}))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(state)

    checkTokenAndFetch(dispatch, fetchPatchUserInfo, state)
      .catch((error) => {
        console.log(error);
      });
  }

  const handleSubmitPassword = (e) => {
    e.preventDefault()
    console.log(passwordState)

    checkTokenAndFetch(dispatch, fetchPatchUserInfo, passwordState)
      .catch((error) => {
        console.log(error);
      });
  }

  const handleLogout = () => {
    console.log('logout')
    dispatch(fetchLogout())
  }

  useEffect(() => {
    setState((s) => {
      return {
        ...s,
        name: userInfo.name,
        email: userInfo.email,
      }
    })
  }, [userInfo])

  return (
    <>
      {logoutStatus === 'loading'
        ? <Preloader/>
        : logoutStatus === 'failed'
          ? <ApiError onRetry={handleRetryLogout} message={logoutError.reason}/>
          : logoutStatus === 'succeeded'
            ? <Navigate to={'/login'}/>
            : <section className={style.container}>
              <ul className={style.navigation}>
                <li className={style.navigationElement}>
                  <NavLink to={'/profile'} className={({isActive}) => isActive
                    ? `text text_type_main-medium ${style.link} ${style.link_active}`
                    : `text text_type_main-medium ${style.link} text_color_inactive`}>Профиль</NavLink>
                </li>
                <li className={style.navigationElement}>
                  <NavLink to={'/profile/orders'} className={({isActive}) => isActive
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
                <form onSubmit={handleSubmit} className={style.form}>
                  <Input name={'name'}
                         type={'text'}
                         value={state.name}
                         icon={'EditIcon'}
                         ref={inputRef}
                         disabled={nameIsDisabled}
                         onIconClick={onIconClick}
                         placeholder="Имя"
                         onChange={(e) => {
                           handleChangeState(e.target.name, e.target.value)
                         }}/>
                  <EmailInput value={state.email}
                              name={'email'}
                              placeholder="Логин"
                              isIcon={true}
                              onChange={(e) => {
                                handleChangeState(e.target.name, e.target.value)
                              }}/>
                  <button type="submit" style={{display: 'none'}}></button>
                </form>
                <form onSubmit={handleSubmitPassword}>
                  <PasswordInput value={passwordState.password}
                                 name={'password'}
                                 icon="EditIcon"
                                 placeholder="Пароль"
                                 onChange={(e) => {
                                   setPasswordState({
                                     ...passwordState,
                                     [e.target.name]: e.target.value
                                   })
                                 }}
                  />
                  <button type="submit" style={{display: 'none'}}></button>
                </form>
              </div>
            </section>
      }
    </>
  )
}

export default Profile;