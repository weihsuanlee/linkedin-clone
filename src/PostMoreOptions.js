import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import firebase from 'firebase'
import FormDialog from './FormDialog'
import { db } from './firebase'

export default function PostMoreOptions(props) {
  const { user, postId, message } = props
  const [updatePost, setUpdatePost] = useState('')
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const deletePost = () => {
    db.collection('posts')
      .doc(postId)
      .delete()
      .catch((error) => {
        console.log(error)
      })
  }
  const editPost = (event) => {
    event.preventDefault()
    db.collection('posts')
      .doc(postId)
      .update({
        name: user.displayName,
        description: user.email,
        message: updatePost,
        photoURL: user.photoURL || '',
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .catch((error) => {
        console.log(error)
      })
    setUpdatePost('')
  }
  return (
    <div className="post-option">
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleClose()
            deletePost()
          }}
          style={{ fontSize: '12px' }}
        >
          Delete
        </MenuItem>
        <MenuItem onClick={handleClose} style={{ fontSize: '12px' }}>
          <FormDialog
            updatePost={updatePost}
            setUpdatePost={setUpdatePost}
            editPost={editPost}
            message={message}
            user={user}
          />
        </MenuItem>
      </Menu>
    </div>
  )
}
