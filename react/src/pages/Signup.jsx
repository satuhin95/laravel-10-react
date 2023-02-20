import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import axiosClient from '../axiosClient';
import { useStateContext } from '../context/ContextProvider';
export default function Signup() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const [errors, setErrors] = useState(null);

  const {setUser,setToken } = useStateContext();

  const formSubmit = (e)=>{
    e.preventDefault();

    const  payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    }

    axiosClient.post('/signup',payload)
    .then(({data})=>{
      setToken(data.token);
      setUser(data.user);
      console.log('ddd', data.token , data.user )

    })
    .catch(err=>{
      const response = err.response;
      if(response && response.status ===422){
        setErrors(response.data.errors)
        
      }
    })
  }
  return (
    <div className='login-signup-form animated fadeInDown'>
    <div className='form'>
      <form onSubmit={formSubmit}>
        <h1 className='title'>
          Create your account
        </h1>
        {errors && <div className='alert'>
          {Object.keys(errors).map(key=>(
            <p key={key}>{errors[key][0]}</p>
          ))}
          </div>}
        <input  ref={nameRef} type="text" placeholder='Your Name' />
        <input ref={emailRef} type="email" placeholder='Email' />
        <input  ref={passwordRef} type="password" placeholder='Password' />
        <input  ref={passwordConfirmationRef} type="password" placeholder='Password Confirmation' />
        <button type='submit' className='btn btn-block'>Sign Up</button>
        <p className='message'>
          Already Registered? <Link to="/login">Slgin In</Link>
        </p>
      </form>
    </div>
  </div>
  )
}
