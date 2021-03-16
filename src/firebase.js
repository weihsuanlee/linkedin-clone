import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyB8VcqJXC_TFU6SGpfFdp3X4alJe07WNqA',
  authDomain: 'linkedin-clone-wei.firebaseapp.com',
  projectId: 'linkedin-clone-wei',
  storageBucket: 'linkedin-clone-wei.appspot.com',
  messagingSenderId: '86232772023',
  appId: '1:86232772023:web:cbb243356380af46d10c32',
  measurementId: 'G-JYMQJR3WZC',
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()

export { db, auth }
