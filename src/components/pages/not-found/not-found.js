import style from './not-found.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className={style.container}>
      <p className="text text_type_main-large">404</p>
      <p className="text text_type_main-medium pt-5">Страница не найдена</p>
      <Link to="/" className={`${style.link}`}>
        <p className="text text_type_main-medium pt-2">На главную</p>
      </Link>
      <Button htmlType={'button'}
              onClick={() => navigate(-1)}
              type="primary"
              size="medium" extraClass='mt-10'>
        Назад
      </Button>
    </div>
  )
}

export default NotFound
