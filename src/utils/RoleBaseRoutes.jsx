import React from 'react'
import { useAuth } from '../context/authContext'
import { Navigate } from 'react-router-dom'

const RoleBaseRoutes = ({ children, requiredRole }) => {

    const { user, loading } = useAuth()

    if (loading) {
        <div>Loading...</div>
    }

    //requiredRole is the array of admin & employee...
    // if the privateroute is accessed by admin then admin is passed to the requiredRole 
    // in array then check the role of the user if matched then navigate to admin otherwise navigate to login
    if (!requiredRole.includes(user.role)) {
        <Navigate to='/unauthorized' />
    }

    //if the user is null return back to the login page
    return user ? children : <Navigate to="/login" />



}

export default RoleBaseRoutes