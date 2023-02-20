import React, { useEffect, useState } from 'react'
import axiosClient from '../axiosClient';

export default function Users() {
  const [users,setUsers] = useState();
  const [loading, setLoading] = useState();

  useEffect(()=>{
    getUsers();
  },[]);

  const getUsers = ()=>{
    setLoading(true);
    axiosClient.get('/users')
    .then(({data})=>{
      setUsers(data.response.users);
      setLoading(false)
    })
    .catch((e)=>{
      setLoading(false)
    })
  }
  return (
    <div>Users</div>
  )
}
