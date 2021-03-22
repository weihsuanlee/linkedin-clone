import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import AppsIcon from '@material-ui/icons/Apps'
import './HeaderOption.scss'
import './WorkDrawer.scss'

const useStyles = makeStyles({
  list: {
    width: 300,
    marginBottom: '36px',
  },
  fullList: {
    width: 'auto',
  },
})

export default function WorkDrawer() {
  const classes = useStyles()
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  })

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setState({ ...state, [anchor]: open })
  }

  const listItem = (icon, title) => (
    <div className="drawer-list">
      <img src={`../../images/${icon}.svg`} alt="" />
      <p>{title}</p>
    </div>
  )
  const serviceItem = (title, description) => (
    <div className="drawer-service-list">
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  )

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List className="drawer-menu">
        <div className="drawer-menu-header">Visit More Linkedin Products</div>
        <div className="drawer-menu-body">
          {listItem('learning', 'Learning')}
          {listItem('insights', 'Insights')}
          {listItem('postJob', 'Post a job')}
          {listItem('advertise', 'Advertise')}
          {listItem('findLeads', 'Find Leads')}
          {listItem('groups', 'Groups')}
          {listItem('proFinder', 'ProFinder')}
          {listItem('salary', 'Salary')}
        </div>
      </List>
      <List className="drawer-menu drawer-menu-bottom">
        <div className="drawer-menu-header">Linkedin Business Services</div>
        <div className="drawer-menu-body">
          {serviceItem('Talent Solutions', 'Find, attract and recruit talent')}
          {serviceItem('Sales Solutions', 'Unlock sales opportunities')}
          {serviceItem(
            'Post a job for free',
            'Get your job in front of quality candidates'
          )}
          {serviceItem(
            'Marketing Solutions',
            'Acquire customers and grow your business'
          )}
          {serviceItem(
            'Learning Solutions',
            'Develop talent across your organization'
          )}
        </div>
      </List>
    </div>
  )

  return (
    <>
      <div className="headerOption" onClick={toggleDrawer('right', true)}>
        <AppsIcon className="headerOption-icon" />
        <h3 className="headerOption-title">Work</h3>
      </div>
      <Drawer
        className="drawer-container"
        anchor="right"
        open={state['right']}
        onClose={toggleDrawer('right', false)}
      >
        {list('right')}
      </Drawer>
    </>
  )
}
