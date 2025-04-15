import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const AddDepartment = () => {

    const navigate = useNavigate();

    const [department, setDepartment] = useState({
        dep_name: '',
        description: ''
    })

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setDepartment({ ...department, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post("http://localhost:3000/api/department/add", department, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (response.data.success) {
                alert("Department Added Successfully...!!!")
                navigate("/admin-dashboard/departments")
            }
        } catch (error) {
            if (error.response && error.response.data.success) {
                alert(error.response.data.error)
            }
        }
    }

    return (
        <>
            <div style={{ backgroundColor: "#F5F5F5", height: "92vh" }}>
              <div style={{ backgroundColor: "#F5F5F5"}}>
                <br />
                <br />
              <div className='max-w-3xl mx-auto bg-white p-8 rounded-md shadow-md w-96'>
                    <h3 className='text-2xl font-bold mb-6'>Add Department</h3>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="dep_name" className="text-sm font-medium text-gray-700">Department Name</label>
                            <input className='mt-1 w-full p-2 border border-gray-300 rounded-md' type="text" name="dep_name" id="dep_name" placeholder='Enter Dept Name' required onChange={handleOnChange} />
                        </div>
a
                        <div className='mt-3'>
                            <label className="text-sm font-medium text-gray-700" htmlFor="description">Description</label>
                            <textarea className='mt-1 w-full p-2 border border-gray-300 rounded-md' name="description" id="description" placeholder='Description' required onChange={handleOnChange}></textarea>
                        </div>
                        <button type='submit' className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'>Add Department</button>
                    </form>
                </div>
              </div>
            </div>
        </>
    )
}

export default AddDepartment