import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaTachometerAlt, FaUsers, FaBuilding } from "react-icons/fa";
import { PiMoneyFill } from "react-icons/pi";
import { IoMdSettings } from "react-icons/io";
import { SlCalender } from "react-icons/sl";

const AdminSidebar = () => {
    return (
        <>
            <button className="btn btn-primary bg-teal-600 text-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">=</button>

            <div className="offcanvas offcanvas-end bg-dark text-white" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header">
                    <h3 className='text-2xl text-center font-pacific'>Employee MS</h3>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div className='px-1'>
                        <NavLink to="/admin-dashboard" className={({ isActive }) => `flex items-center space-x-4 py-2.5 px-4 rounded ${isActive ? "bg-teal-500" : ""}`} end>
                            <FaTachometerAlt />
                            <span>Dashboard</span>
                        </NavLink>

                        <NavLink to="/admin-dashboard/employees" className={({ isActive }) => `flex items-center space-x-4 py-2.5 px-4 rounded ${isActive ? "bg-teal-500" : ""}`}>
                            <FaUsers />
                            <span>Employees</span>
                        </NavLink>

                        <NavLink to="/admin-dashboard/departments" className={({ isActive }) => `flex items-center space-x-4 py-2.5 px-4 rounded ${isActive ? "bg-teal-500" : ""}`}>
                            <FaBuilding />
                            <span>Departments</span>
                        </NavLink>

                        <NavLink to="/admin-dashboard/leaves" className={({ isActive }) => `flex items-center space-x-4 py-2.5 px-4 rounded ${isActive ? "bg-teal-500" : ""}`}>
                            <SlCalender />
                            <span>Leaves</span>
                        </NavLink>

                        <NavLink to="/admin-dashboard/salary/add" className={({ isActive }) => `flex items-center space-x-4 py-2.5 px-4 rounded ${isActive ? "bg-teal-500" : ""}`}>
                            <PiMoneyFill />
                            <span>Salary</span>
                        </NavLink>

                        <NavLink to="/admin-dashboard/setting" className={({ isActive }) => `flex items-center space-x-4 py-2.5 px-4 rounded ${isActive ? "bg-teal-500" : ""}`}>
                            <IoMdSettings />
                            <span>Settings</span>
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminSidebar