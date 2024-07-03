import React, { useState } from "react";
import Routes from "./Routes/index";

// Import Scss
import "./assets/scss/theme.scss";

// Fake Backend
import fakeBackend from "./helpers/AuthType/fakeBackend";
import ToastContainer from "./components/dialable/ToastContainer";

// Activating fake backend
fakeBackend();

// Firebase
// Import Firebase Configuration file
// import { initFirebaseBackend } from "./helpers/firebase_helper"

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_APIKEY,
//   authDomain: process.env.REACT_APP_AUTHDOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASEURL,
//   projectId: process.env.REACT_APP_PROJECTID,
//   storageBucket: process.env.REACT_APP_STORAGEBUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
//   appId: process.env.REACT_APP_APPID,
//   measurementId: process.env.REACT_APP_MEASUREMENTID,
// }

// init firebase backend
// initFirebaseBackend(firebaseConfig)

function App() {
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const toggleToast = () => setToastOpen(!toastOpen);

  const showToast = (message) => {
    setToastMessage(message);
    setToastOpen(true);
    setTimeout(() => {
      setToastOpen(false);
    }, 3000); // Hide toast after 3 seconds
  };
  return (
    <React.Fragment>
              <ToastContainer isOpen={toastOpen} toggle={toggleToast} message={toastMessage} />

      <Routes  />
      
    </React.Fragment>
  );
}

export default App;
