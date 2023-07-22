import { NavLink } from 'react-router-dom'
import style from './navigation-link.module.css'
import PropTypes from 'prop-types'

const NavigationLink = ({ path, label, children }) => {
  return (
    <NavLink to={path} className={({ isActive }) => isActive
      ? `pl-5 pr-5 ${style.container} ${style.link_active}`
      : `pl-5 pr-5 ${style.container} text_color_inactive`
    }>
      {children}
      <p className={'pl-2 text text_type_main-default'}>{label}</p>
    </NavLink>
  )
}

NavigationLink.propTypes = {
  path: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default NavigationLink
