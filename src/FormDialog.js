import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import './FormDialog.scss'
import { Avatar } from '@material-ui/core'

export default function FormDialog(props) {
  const { user, updatePost, setUpdatePost, editPost, message } = props
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <div onClick={handleClickOpen} style={{ fontSize: '12px' }}>
        Edit
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div className="form-dialog-original-post">
              <Avatar src={user.photoURL}>{user.displayName[0]}</Avatar>
              <h2>{user.displayName}</h2>
            </div>
            <div className="form-dialog-original-message">{message}</div>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="content"
            label="Enter text as new post"
            type="text"
            value={updatePost}
            onChange={(e) => setUpdatePost(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={(event) => {
              editPost(event)
              handleClose()
            }}
            disabled={!updatePost}
            color="primary"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
