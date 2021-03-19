import React, { forwardRef, useState, useEffect } from 'react'
import { Avatar } from '@material-ui/core'
import './Post.scss'
import InputOption from './InputOption'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined'
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined'
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined'
import SendOutlinedIcon from '@material-ui/icons/SendOutlined'
import firebase from 'firebase'
import { db } from './firebase'
import { selectUser } from './features/userSlice'
import { useSelector } from 'react-redux'

const Post = forwardRef((props, ref) => {
  const user = useSelector(selectUser)
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState([])
  const { name, description, message, photoUrl, postId } = props
  useEffect(() => {
    let unsubscribe
    if (postId) {
      unsubscribe = db
        .collection('posts')
        .doc(postId)
        .collection('comments')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()))
        })
    }
    return () => {
      unsubscribe()
    }
  }, [postId])
  const postComment = (event) => {
    event.preventDefault()
    db.collection('posts')
      .doc(postId)
      .collection('comments')
      .add({
        text: comment,
        username: user.displayName,
        userPhotoUrl: user.photoURL || '',
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
    setComment('')
  }
  return (
    <div ref={ref} className="post">
      <div className="post-header">
        <Avatar src={photoUrl}>{name[0]}</Avatar>
        <div className="post-info">
          <h2>{name}</h2>
          <p>{description}</p>
        </div>
      </div>
      <div className="post-body">
        <p>{message}</p>
      </div>
      <div className="post-bottom">
        <div className="post-buttons">
          <InputOption
            Icon={ThumbUpAltOutlinedIcon}
            title="Like"
            color="gray"
          />
          <InputOption Icon={ChatOutlinedIcon} title="Comment" color="gray" />
          <InputOption Icon={ShareOutlinedIcon} title="Share" color="gray" />
          <InputOption Icon={SendOutlinedIcon} title="Send" color="gray" />
        </div>
        <form className="post-comment-inputarea">
          <input
            type="text"
            className="post-comment-input"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="post-comment-button"
            disabled={!comment}
            type="submit"
            onClick={postComment}
          >
            Post
          </button>
        </form>
        <div className="post-comments">
          {comments.map((comment) => (
            <div className="comment">
              <Avatar className="comment-avatar" src={comment.userPhotoUrl}>
                {comment.username[0]}
              </Avatar>
              <p className="comment-text">
                <strong>{comment.username}</strong>
                {comment.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
})

export default Post
