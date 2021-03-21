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
import { db } from './firebase'
import firebase from 'firebase'
import { selectUser } from './features/userSlice'
import { useSelector } from 'react-redux'
import FlipMove from 'react-flip-move'

function Feed() {
  const user = useSelector(selectUser)
  const [input, setInput] = useState('')
  const [posts, setPosts] = useState([])
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
    db.collection('posts').add({
      name: user.displayName,
      description: user.email,
      message: input,
      photoURL: user.photoURL || '',
      likesCount: '',
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })

    setInput('')
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
        <div className="feed-inputOptions">
          {/* options */}
          <FeedInputOption title="Photo" Icon={ImageIcon} color="#70B5F9" />
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
            data: { name, description, message, photoURL, likesCount },
          }) => (
            <Post
              key={id}
              postId={id}
              name={name}
              description={description}
              message={message}
              photoURL={photoURL}
              likesCount={likesCount}
            />
          )
        )}
      </FlipMove>
    </div>
  )
}

export default Feed
