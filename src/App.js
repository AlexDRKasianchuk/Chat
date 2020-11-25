import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import { isLoggedInUser } from './action/auth.action';
import './App.css';
import PrivateRoute from './components/PrivateRoute';
import HomePage from './containers/HomePage/HomePage';
import LoginPage from './containers/LoginPage/LoginPage';
import Register from './containers/Register/Register';

function App() {
const dispatch = useDispatch();
const auth = useSelector(state=>state.auth)

  useEffect(()=>{
    if(!auth.authenticated){
        dispatch(isLoggedInUser())
    }
},[])


  return (
    <div className="App">
     <Router>
       {/* only logged in user can access this route */}
       <PrivateRoute path='/' exact component={HomePage} />

       <Route path='/login' component={LoginPage} />
       <Route path='/singup' component={Register} />
     </Router>
    </div>
  );
}

export default App;
