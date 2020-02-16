const {Firestore} = require('@google-cloud/firestore');

// Your web app's Firebase configuration
const config = {
    apiKey: "AIzaSyBGP1d7-clS5ORLG_8nHMU21ZTxhgQNHsA",
    authDomain: "anson-ai.firebaseapp.com",
    databaseURL: "https://anson-ai.firebaseio.com",
    projectId: "anson-ai",
    storageBucket: "anson-ai.appspot.com",
    messagingSenderId: "1033759846900",
    appId: "1:1033759846900:web:c071414a0949848e2689a1"
  };
  // Initialize Firebase
  const firestore = new Firestore(config);

  module.exports = firestore;