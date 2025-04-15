import React from 'react'
import AdminSidebar from '../components/dashboard/AdminSidebar'
import Navbar from '../components/dashboard/Navbar'
import { Outlet } from 'react-router-dom'

const AdminDashboard = () => {

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

export default AdminDashboard