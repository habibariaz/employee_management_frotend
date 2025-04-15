import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const EditDepartment = () => {

    const { id } = useParams()
    const [department, setDepartment] = useState([]);
    const [depLoading, setDepLoading] = useState(false)

    const navigate = useNavigate()

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setDepartment({ ...department, [name]: value })
    }

    useEffect(() => {
        const fetchDepartments = async () => {
            setDepLoading(true)
            try {
                const response = await axios.get(`http://localhost:3000/api/department/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                })
                if (response.data.success) {
                    setDepartment(response.data.department)
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            } finally {
                setDepLoading(false)
            }
        }
        fetchDepartments()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.put(`http://localhost:3000/api/department/${id}`, department, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (response.data.success) {
                alert("Department Edit Successfully...!!!")
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

            {depLoading ? <div>Loading...</div>
                :
                <div style={{ backgroundColor: "#F5F5F5", height: "92vh" }}>
                    <br /><br />
                    <div className='max-w-3xl mx-auto bg-white p-8 rounded-md shadow-md w-96'>
                        <h3 className='text-2xl font-bold mb-6'>Add Department</h3>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="dep_name" className="text-sm font-medium text-gray-700">Department Name</label>
                                <input className='mt-1 w-full p-2 border border-gray-300 rounded-md' value={department.dep_name} type="text" name="dep_name" id="dep_name" placeholder='Enter Dept Name' required onChange={handleOnChange} />
                            </div>

                            <div className='mt-3'>
                                <label className="text-sm font-medium text-gray-700" htmlFor="description">Description</label>
                                <textarea value={department.description} className='mt-1 w-full p-2 border border-gray-300 rounded-md' name="description" id="description" placeholder='Description' required onChange={handleOnChange}></textarea>
                            </div>
                            <button type='submit' className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'>Edit Department</button>
                        </form>
                    </div>

                </div>
            }

        </>
    )
}

export default EditDepartment