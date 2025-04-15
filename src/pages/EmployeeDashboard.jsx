import React from 'react'
import Navbar from '../components/EmployeeDashborad/Navbar'
import { Outlet } from 'react-router-dom'

const EmployeeDashboard = () => {

  return (
    <>
      <div>
        <div>
          <Navbar />
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default EmployeeDashboard