import React, { forwardRef, useState, useEffect } from 'react'
import { Avatar } from '@material-ui/core'
import './Post.scss'
import InputOption from './InputOption'
import PostMoreOptions from './PostMoreOptions'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined'
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined'
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined'
import SendOutlinedIcon from '@material-ui/icons/SendOutlined'
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn'
import firebase from 'firebase'
import { db } from './firebase'
import { selectUser } from './features/userSlice'
import { useSelector } from 'react-redux'

const Post = forwardRef((props, ref) => {
  const user = useSelector(selectUser)
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState([])
  const {
    name,
    description,
    message,
    photoURL,
    postId,
    likesCount,
    imageURL,
  } = props
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
        userPhotoURL: user.photoURL || '',
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
    setComment('')
  }
  const likePost = () => {
    db.collection('posts')
      .doc(postId)
      .update({
        likesCount: +likesCount + 1,
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div ref={ref} className="post">
      <div className="post-header">
        <Avatar src={photoURL}>{name[0]}</Avatar>
        <div className="post-info">
          <h2>{name}</h2>
          <p>{description}</p>
        </div>

        {user.email === description ? (
          <PostMoreOptions user={user} postId={postId} message={message} />
        ) : (
          ''
        )}
      </div>
      <div className="post-body">
        <p>{message}</p>
      </div>
      {imageURL && (
        <div className="post-image">
          <img src={imageURL} alt="" />
        </div>
      )}
      <div className="post-bottom">
        {likesCount && (
          <div className="post-likes-count">
            <img src="../../images/likes.svg" alt="" />
            <span>{likesCount}</span>
          </div>
        )}

        <div className="post-buttons">
          <InputOption
            Icon={ThumbUpAltOutlinedIcon}
            title="Like"
            color="gray"
            likePost={likePost}
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
            <KeyboardReturnIcon />
          </button>
        </form>
        <div className="post-comments">
          {comments.map((comment) => (
            <div className="comment">
              <Avatar className="comment-avatar" src={comment.userPhotoURL}>
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
