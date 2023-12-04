const firebase = require("firebase")

const firebaseConfig = {
    apiKey: "AIzaSyBMjP0Gnw90ZZZQ160Bk7mwtduQrvIv-Us",
    authDomain: "mouse-race-79548.firebaseapp.com",
    projectId: "mouse-race-79548",
    storageBucket: "mouse-race-79548.appspot.com",
    messagingSenderId: "798833487814",
    appId: "1:798833487814:web:6f790abd077c4b407d0cc7"
  };

  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const User = db.collection("Users");
  module.exports = User;
  