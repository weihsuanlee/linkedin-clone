import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { auth } from './firebase'
import './Login.scss'
import { login } from './features/userSlice'

function Login() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [profilePic, setProfilePic] = useState('')
  const dispatch = useDispatch()

  const registerShow = () => {
    const register = document.getElementById('register')
    const login = document.getElementById('login')
    const loginRegisterToggle = document.querySelector('.login-register')
    const memberQuestion = document.querySelector('.member-question')
    if (register.style.display === 'flex') {
      register.style.display = 'none'
      login.style.display = 'flex'
      loginRegisterToggle.innerHTML = 'Join Us Now'
      memberQuestion.innerHTML = 'Not a member?'
    } else {
      register.style.display = 'flex'
      login.style.display = 'none'
      loginRegisterToggle.innerHTML = 'Sign In'
      memberQuestion.innerHTML = 'Already a member?'
    }
  }
  const loginToApp = (e) => {
    e.preventDefault()
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
            profileUrl: userAuth.user.photoURL,
          })
        )
      })
      .catch((error) => alert(error))
  }
  const register = (e) => {
    e.preventDefault()
    if (!name) {
      return alert('Please enter a full name!')
    }
    auth
      .createUserWithEmailAndPassword(registerEmail, registerPassword)
      .then((userAuth) => {
        userAuth.user
          .updateProfile({
            displayName: name,
            photoURL: profilePic,
          })
          .then(() => {
            dispatch(
              login({
                // email, uid, displayName, photoURL are names from firebase
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: name,
                photoURL: profilePic,
              })
            )
          })
      })
      .catch((error) => alert(error))
  }

  return (
    <div className="login">
      <img src="../../images/Linkedin-Logo.png" alt="" />
      <form>
        <div className="login-section" id="login">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
          <input
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="submit" onClick={loginToApp}>
            Sign In
          </button>
        </div>
        <div className="register-section" id="register">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Full Name"
          />
          <input
            type="text"
            value={profilePic}
            onChange={(e) => setProfilePic(e.target.value)}
            placeholder="Profile pic URL (Optional)"
          />
          <input
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
          <input
            value={registerPassword}
            type="password"
            onChange={(e) => setRegisterPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="submit" onClick={register}>
            Register Now
          </button>
        </div>
        <p className="register-title">
          <span className="member-question">Not a member?</span>
          <span className="login-register" onClick={registerShow}>
            Join Us Now
          </span>
        </p>
      </form>
    </div>
  )
}

export default Login
