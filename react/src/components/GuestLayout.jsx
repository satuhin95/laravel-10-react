import React from 'react'
import { Outlet } from 'react-router-dom'

export default function GuestLayout() {
  return (
    <div>
        <div>
            Gest User Only
        <Outlet/>
        </div>
    </div>
  )
}
