import React, { useEffect, useState } from 'react';
import '@zeit-ui/style'
import './App.css';
import db from "./firebase";

function handleNurseResponse(response, doc) {
  db.collection('resident_messages').doc(doc).delete();
}

function renderResidentMessages(residentMessages) {
  const sortedResidentMessages = residentMessages.map((message) => {
    const ageFactor = Math.abs(message.timestamp.toDate() - (new Date()))/500000;
    const adjustedSentimentScore = message.sentimentScore - ageFactor;
    const adjustedMessage = {...message};
    adjustedMessage.sentimentScore = adjustedSentimentScore;
    return adjustedMessage;
  })
  sortedResidentMessages.sort(function(a, b) { return a.sentimentScore - b.sentimentScore });
  const residentMessageElements = sortedResidentMessages.map((message) => {
    return (
      <div className="zi-card" key={message.id}>
        <h3>{message.message}</h3>
        <h4>Sent by: {message.sender}</h4>
        <h4>Received: {message.timestamp ? message.timestamp.toDate().toString() : null}</h4>
        <span className="button-row">
          <button className="zi-btn success response-btn" onClick={(event) => handleNurseResponse(event.target.value, message.id)}>Resolve</button>
        </span>
      </div>
    );
  });
  return residentMessageElements;
}

function App() {
  const [residentMessages, setResidentMessages] = useState([]);
  useEffect(() => {
    db.collection('resident_messages').onSnapshot(snapshot => {
      if (snapshot.size) {
        const newMessages = [];
        snapshot.forEach((doc) => {
          const docObj = {...doc.data(), id: doc.id}
          newMessages.push(docObj);
        })
        setResidentMessages(newMessages);
      }
    })
  });
  return (
    <div className="App">
      <span className="header"><h1>Anson.ai</h1></span>
      <div className="message-container">{ renderResidentMessages(residentMessages) }</div>
    </div>
  );
}



export default App;
