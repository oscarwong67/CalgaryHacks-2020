const sentimentAnalysis = require('./sentimentanalysis');
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const firebase = require('firebase');

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
firebase.initializeApp(config)
const db = firebase.firestore();
const Timestamp = db.Timestamp;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var server = app.listen(8000, function () {
    console.log("app running on port ", server.address().port);
});

app.post('/api/sendmessage', (req, res) => {
    sentimentAnalysis(req.body.queryResult.queryText).then((sentimentScore) => {
        let intentRequest = req.body.originalDetectIntentRequeset;
        let sender = "Home Mini A";
        if (intentRequest["source"]) {
            sender = intentRequest.payload.data.sender.id;
        }
        db.collection('resident_messages').add({
            sender,
            message: req.body.queryResult.queryText,
            timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
            sentimentScore
        }).then((docRef) => {
            if (docRef.id) {
                res.json(200);
            } else {
                res.json(404);
            }
        }).catch((err) => {
            console.log(err);
            res.json(404);
        });
    })
});