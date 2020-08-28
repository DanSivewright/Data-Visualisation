import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase'

const firebaseConfig = firebase.initializeApp({
  apiKey: 'AIzaSyC7gubRBCj7lVf4fsBDgQVy4OZuBixEDEc',
  authDomain: 'datavis-9e0a1.firebaseapp.com',
  databaseURL: 'https://datavis-9e0a1.firebaseio.com',
  projectId: 'datavis-9e0a1',
  storageBucket: 'datavis-9e0a1.appspot.com',
  messagingSenderId: '535433562615',
  appId: '1:535433562615:web:b917b7b3f0164584fdc6f2'
})

export { firebaseConfig as firebaseApp }
