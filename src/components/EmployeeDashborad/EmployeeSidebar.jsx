import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaTachometerAlt, FaUser } from "react-icons/fa";
import { PiMoneyFill } from "react-icons/pi";
import { IoMdSettings } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import { useAuth } from '../../context/authContext';

const EmployeeSidebar = () => {

    const { user } = useAuth()

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
                        <NavLink to="/employee-dashboard" className={({ isActive }) => `flex items-center space-x-4 py-2.5 px-4 rounded ${isActive ? "bg-teal-500" : ""}`} end>
                            <FaTachometerAlt />
                            <span>Dashboard</span>
                        </NavLink>

                        <NavLink to={`/employee-dashboard/profile/${user._id}`} className={({ isActive }) => `flex items-center space-x-4 py-2.5 px-4 rounded ${isActive ? "bg-teal-500" : ""}`} end>
                            <FaUser />
                            <span>My Profile</span>
                        </NavLink>

                        <NavLink to={`/employee-dashboard/leaves/${user._id}`} className={({ isActive }) => `flex items-center space-x-4 py-2.5 px-4 rounded ${isActive ? "bg-teal-500" : ""}`}>
                            <SlCalender />
                            <span>Leaves</span>
                        </NavLink>

                        <NavLink to={`/employee-dashboard/salary/${user._id}`} className={({ isActive }) => `flex items-center space-x-4 py-2.5 px-4 rounded ${isActive ? "bg-teal-500" : ""}`}>
                            <PiMoneyFill />
                            <span>Salary</span>
                        </NavLink>

                        <NavLink to="/employee-dashboard/setting" className={({ isActive }) => `flex items-center space-x-4 py-2.5 px-4 rounded ${isActive ? "bg-teal-500" : ""}`}>
                            <IoMdSettings />
                            <span>Settings</span>
                        </NavLink>
                    </div>
                </div>
            </div >
        </>
    )
}

export default EmployeeSidebar