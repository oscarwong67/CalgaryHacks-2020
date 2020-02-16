import React, { useEffect, useState } from 'react';
import '@zeit-ui/style'
import './App.css';
import db from "./firebase";

function handleNurseResponse(response, doc) {
  db.collection('resident_messages').doc(doc).delete();
}

function renderResidentMessages(residentMessages) {
  //TODO: sort messages
  const residentMessageElements = residentMessages.map((message) => {
    let newSentiment = Math.abs(message.timestamp.toDate() - (new Date()))/500000;
    message.sentimentScore -= newSentiment;
    return (
      <div className="zi-card" key={message.id}>
        <h3>{message.message}</h3>
        <h4>Sent by: {message.sender}</h4>
        <h4>Received: {message.timestamp ? message.timestamp.toDate().toString() : null}</h4>
        <span className="button-row">
          <button className="zi-btn success response-btn" onClick={(event) => handleNurseResponse(event.target.value, message.id)}>Someone is on the way.</button>
          <button className="zi-btn warning response-btn" onClick={(event) => handleNurseResponse(event.target.value, message.id)}>Please give me a moment, someone will be there soon.</button>
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
