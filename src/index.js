import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import store from './store/store'

var firebaseConfig = {
  apiKey: "AIzaSyBYUrO0SD-3X4tfEjGN6xLjs86vqyPf8k8",
  authDomain: "chat-39aac.firebaseapp.com",
  databaseURL: "https://chat-39aac.firebaseio.com",
  projectId: "chat-39aac",
  storageBucket: "chat-39aac.appspot.com",
  messagingSenderId: "395198796927",
  appId: "1:395198796927:web:443b4d01c127c8549d5b4a"
};

firebase.initializeApp(firebaseConfig);

window.store = store;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
