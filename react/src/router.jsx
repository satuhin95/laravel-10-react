import {createBrowserRouter, Navigate} from 'react-router-dom'
import DefaultLayout from './components/DefaultLayout'
import GuestLayout from './components/GuestLayout'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Signup from './pages/Signup'
import Users from './pages/Users'

const router = createBrowserRouter([
    {
        path:'/',
        element:<DefaultLayout/>,
        children:[
            {
                path:'/',
                element: <Navigate to="/users" />
            },
            {
                path:'/dashboard',
                element:<Dashboard/>
            },
            {
                path:'/users',
                element:<Users/>
            }
        ]
    },
    {
        path:'/',
        element:<GuestLayout/>,
        children:[
            {
                path:'/login',
                element:<Login/>
            },
            {
                path:'/signup',
                element:<Signup/>
            }
        ]
    },
   
    {
        path:'*',
        element:<NotFound/>
    }
])

export default router