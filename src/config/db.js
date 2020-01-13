// Get a RTDB instance
import firebase from 'firebase/app'
import 'firebase/database'

export const db = firebase
  .initializeApp({
          apiKey: "AIzaSyAVjzLAX7YzDSJueE2VxUxqDZawSZlJTt8",
      authDomain: "patrimoine-pontault-combault.firebaseapp.com",
      databaseURL: "https://patrimoine-pontault-combault.firebaseio.com",
      projectId: "patrimoine-pontault-combault",
      storageBucket: "patrimoine-pontault-combault.appspot.com",
      messagingSenderId: "1069741740602" })
  .database()