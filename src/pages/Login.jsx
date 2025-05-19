import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './Login.css'

function Login() {

  const navigate = useNavigate();

  const{register,reset,handleSubmit}=useForm();

  const [showPopup, setShowPopup] = useState(false); // Popup state

  function onLogin(data){

    axios.get(`http://localhost:6050/employee/getEmployeeDetails/${data.username}/${data.password}`)
    .then((response)=>{
      console.log(response.data);
      localStorage.setItem("user",JSON.stringify(response.data));
      setShowPopup(true); // Show the popup

        // Wait 2 seconds before navigating
        setTimeout(() => {
          setShowPopup(false);
          navigate('/dashboard');
        }, 2000);
      })
    .catch((err)=>console.log(err));

      
      
  }
  return (
    <div className="login-container">
    
    <form onSubmit={handleSubmit(onLogin)} className="login-card">

      <h1>Login</h1>

        <label htmlFor='userName'>Enter Your UserName : </label><br/>
        <input type='text' id='userName' placeholder='UserName' {...register('username')}></input>
        <br/><br/>

        <label htmlFor='passWord'>Enter Your UserName : </label><br/>
        <input type='text' id='passWord' placeholder='Password' {...register('password')}></input>
        <br/><br/>

        <button type='submit' >Login</button>

    </form>
    {/* Popup message */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <p> Logged in successfully!</p>
          </div>
        </div>
      )}
    </div>

  )
}

export default Login