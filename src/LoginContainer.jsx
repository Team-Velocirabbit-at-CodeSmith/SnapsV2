import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { setSnapsList } from "./snapsSlice";



const LoginContainer = () => {

  //const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch();

  const loginHandler = (e) =>{

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch(`/user/login/${username}/${password}` , {})
      .then(result => result.json()) //value is set equal to the async result of 'result' sp result will equal value
      .then(value => {

          // Reset text field inputs to be empty after login pressed
          document.getElementById('username').value = '';
          document.getElementById('password').value = '';

          console.log( "Reached the fetch request and received values " , value );


          dispatch(setSnapsList(value));


      })
      .catch(error => console.error(error));

  }

  const signupHandler = (e) => {

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Might have to check the endpoint and also the properties because why doesn't dev server proxy work?
    fetch('http://localhost:3000/user/signup' , {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
     },
      body: JSON.stringify({ username: username, password: password })
    })
      .then(res => {
        const name = document.getElementById('username').value
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';

        console.log(`Made user --> ${name}`);
      })
      .catch(() => {console.log('Error in signupHandler')});
  }



  return (

    //added placeholders instead of using labels
    <div className="login">
      <h1 id="login-logo">Snaps</h1>
      {/* <label > Username: </label> */}
      <input type="text" id="username" className="login-input" autoComplete='off' placeholder="Username"></input>
      {/* <label > Password: </label> */}
      <input type="password" id="password" className="login-input" placeholder="Password"></input>
      <button id="Login" onClick={loginHandler}> Login </button>
      <button id="signup-button" aria-label="Sign Up" onClick={signupHandler}>Don't have an account? <span id="signup-blue">  Sign Up</span> </button>


    </div>


  )

}


export default LoginContainer;