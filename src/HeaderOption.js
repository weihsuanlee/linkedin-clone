import React from 'react'
import './HeaderOption.scss'
import { Avatar } from '@material-ui/core'
import { selectUser } from './features/userSlice'
import { useSelector } from 'react-redux'

function HeaderOption(props) {
  const user = useSelector(selectUser)
  const { avatar, Icon, title, onClick } = props
  return (
    <div onClick={onClick} className="headerOption">
      {Icon && <Icon className="headerOption-icon" />}
      {avatar && (
        <Avatar className="headerOption-icon">{user?.email[0]}</Avatar>
      )}
      <h3 className="headerOption-title">{title}</h3>
    </div>
  )
}

export default HeaderOption
