import React from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider'

export default function DefaultLayout() {
  const {user,token} = useStateContext();
  if(!token){
    return <Navigate to="/login"/>
  }
  const logout =(e)=>{
    e.preventDefault();
  }
  return (
    <div id='defaultLayout'>
      <aside>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/users">Users</Link>
      </aside>
      <div className='content'>
        <header>
          <div>
            Header
          </div>
          <div>
            {user.name}
            <a href='#' onClick={logout} className='btn-logout '>LogOut</a>
          </div>
        </header>
        <main>
         <Outlet/>
        </main>
      </div>
    </div>
  )
}
