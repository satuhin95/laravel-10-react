import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import axiosClient from '../axiosClient';
import { useStateContext } from '../context/ContextProvider';

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errors, setErrors] = useState(null);

  const {setUser,setToken } = useStateContext();

  const formSubmit = (e)=>{
    e.preventDefault();

    const  payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    
    axiosClient.post('/login',payload)
    .then(({data})=>{
      setToken(data.token);
      setUser(data.user);
      setErrors(null);
    })
    .catch(err=>{
      const response = err.response;
      if(response && response.status ===422){
        if(response.data.errors){

          setErrors(response.data.errors)
        }else{
          setErrors({
            email:[response.data.message]
        })
        }
        
      }
    })
  }
  return (
    <div className='login-signup-form animated fadeInDown'>
      <div className='form'>
        <form onSubmit={formSubmit}>
          <h1 className='title'>
            Login into your account
          </h1>
          {errors && <div className='alert'>
          {Object.keys(errors).map(key=>(
            <p key={key}>{errors[key][0]}</p>
          ))}
          </div>}
          <input ref={emailRef} type="email" placeholder='Email' />
          <input ref={passwordRef} type="password" placeholder='Password' />
          <button className='btn btn-block'>Login</button>
          <p className='message'>
            Not Registered? <Link to="/signup">Create an Account</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
