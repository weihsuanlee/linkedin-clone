import React from 'react'
import { Avatar } from '@material-ui/core'
import './Sidebar.scss'
import { selectUser } from './features/userSlice'
import { useSelector } from 'react-redux'

function Sidebar() {
  const user = useSelector(selectUser)
  const recentItem = (topic) => (
    <div className="sidebar-recentItem">
      <span className="sidebar-hashtag">#</span>
      <p>{topic}</p>
    </div>
  )
  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <img src="../../images/bg.jpg" class="sidebar-top-bg" alt="" />
        <Avatar className="sidebar-avatar" src={user?.photoURL}>
          {user?.email[0]}
        </Avatar>
        <h2>{user.displayName}</h2>
        <h4>{user.email}</h4>
      </div>
      <div className="sidebar-stats">
        <div className="sidebar-stat">
          <p>Who viewed your profile</p>
          <p className="sidebar-statNumber">2,352</p>
        </div>
        <div className="sidebar-stat">
          <p>Connections</p>
          <p className="sidebar-statNumber">1,386</p>
        </div>
      </div>
      <div className="sidebar-bottom">
        <p className="title">Recent</p>
        {recentItem('reactjs')}
        {recentItem('programming')}
        {recentItem('frontend')}
        {recentItem('design')}
        {recentItem('developer')}
      </div>
    </div>
  )
}

export default Sidebar
