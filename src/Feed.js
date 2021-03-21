import React, { useState, useEffect } from 'react'
import './Feed.scss'
import FeedInputOption from './FeedInputOption'
import CreateIcon from '@material-ui/icons/Create'
import ImageIcon from '@material-ui/icons/Image'
import SubscriptionsIcon from '@material-ui/icons/Subscriptions'
import EventNoteIcon from '@material-ui/icons/EventNote'
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay'
import SendIcon from '@material-ui/icons/Send'
import Post from './Post'
import { db, storage } from './firebase'
import firebase from 'firebase'
import { selectUser } from './features/userSlice'
import { useSelector } from 'react-redux'
import FlipMove from 'react-flip-move'
import { v4 as uuidv4 } from 'uuid'
import LinearProgress from '@material-ui/core/LinearProgress'

function Feed() {
  const user = useSelector(selectUser)
  const [input, setInput] = useState('')
  const [posts, setPosts] = useState([])
  const [progress, setProgress] = useState(0)

  // console.log(user)
  // 抓取資料庫此時資料表
  useEffect(() => {
    db.collection('posts')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      )
  }, [])

  const sendPost = (e) => {
    e.preventDefault()
    if (image) {
      const imagePreviewDiv = document.querySelector('.image-preview')
      const imageProgress = document.querySelector('.image-progress')
      const imageName = uuidv4()
      const uploadImage = storage.ref(`images/${imageName}`).put(image)
      imagePreviewDiv.style.display = 'block'
      imageProgress.style.display = 'block'
      uploadImage.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          )
          setProgress(progress)
        },
        (error) => {
          console.log(error)
        },
        () => {
          // get download url and upload the post
          storage
            .ref('images')
            .child(`${imageName}`)
            .getDownloadURL()
            .then((imageURL) => {
              db.collection('posts').add({
                name: user.displayName,
                description: user.email,
                message: input,
                imageURL: imageURL,
                photoURL: user.photoURL || '',
                likesCount: '',
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              })
            })
          setInput('')
          setProgress(0)
          setImage(null)
          imagePreviewDiv.style.display = 'none'
          imageProgress.style.display = 'none'
        }
      )
    } else {
      db.collection('posts').add({
        name: user.displayName,
        description: user.email,
        message: input,
        photoURL: user.photoURL || '',
        likesCount: '',
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      setInput('')
      setProgress(0)
    }
  }
  const [image, setImage] = useState(null)
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
      const selectedImageSrc = URL.createObjectURL(e.target.files[0])
      const imagePreview = document.querySelector('#imagePreview')
      const imagePreviewDiv = document.querySelector('.image-preview')
      imagePreview.src = selectedImageSrc
      imagePreviewDiv.style.display = 'block'
    }
  }

  return (
    <div className="feed">
      <div className="feed-inputContainer">
        <div className="feed-input">
          <CreateIcon />
          <form>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Start a post"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              id="fileInput"
              style={{ display: 'none' }}
            />
            <button
              onClick={sendPost}
              type="submit"
              disabled={!input}
              className="feed-button"
            >
              <SendIcon />
            </button>
          </form>
        </div>
        <div className="image-upload">
          <div className="image-preview">
            <img src="" alt="" id="imagePreview" />
          </div>
          <LinearProgress
            className="image-progress"
            variant="determinate"
            value={progress}
          />
        </div>
        <div className="feed-inputOptions">
          {/* options */}
          <label htmlFor="fileInput">
            <FeedInputOption title="Photo" Icon={ImageIcon} color="#70B5F9" />
          </label>
          <FeedInputOption
            title="Video"
            Icon={SubscriptionsIcon}
            color="#7FC15E"
          />
          <FeedInputOption title="Event" Icon={EventNoteIcon} color="#E7A33E" />
          <FeedInputOption
            title="Article"
            Icon={CalendarViewDayIcon}
            color="lightsalmon"
          />
        </div>
      </div>
      <hr className="feed-line" />
      <FlipMove>
        {posts.map(
          ({
            id,
            data: {
              name,
              description,
              message,
              photoURL,
              likesCount,
              imageURL,
            },
          }) => (
            <Post
              key={id}
              postId={id}
              name={name}
              description={description}
              message={message}
              photoURL={photoURL}
              likesCount={likesCount}
              imageURL={imageURL}
            />
          )
        )}
      </FlipMove>
    </div>
  )
}

export default Feed
