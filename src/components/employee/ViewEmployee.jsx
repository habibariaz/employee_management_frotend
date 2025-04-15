import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ViewEmployee = () => {

    const { id } = useParams();
    const [employee, setEmployee] = useState(null)

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`https://employee-management-backend-flame.vercel.app/api/employees/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                })
                if (response.data.success) {
                    setEmployee(response.data.employee)
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            }
        }
        fetchEmployee()
    }, [])

    return (
        <>
            {employee ? (
                <div style={{ backgroundColor: "#F5F5F5", height: "100vh" }}>
                    <br /><br />
                    <div className='max-w-3xl mx-auto bg-white p-8 rounded-md shadow-md'>
                        <h2 className='text-2xl font-bold mb-8 text-center font-serif'>
                            Employee Details
                        </h2>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            <div>
                                <img src={`http://localhost:3000/${employee.userId.profileImage}`}
                                    className='rounded-full border w-60'
                                />
                            </div>

                            <div>
                                <div className="flex space-x-3 mb-4">
                                    <p className='text-lg font-bold'>Name:</p>
                                    <p className='font-medium'>{employee.userId.name}</p>
                                </div>

                                <div className="flex space-x-3 mb-4">
                                    <p className='text-lg font-bold'>Employee ID:</p>
                                    <p className='font-medium'>{employee.employeeId}</p>
                                </div>

                                <div className="flex space-x-3 mb-4">
                                    <p className='text-lg font-bold'>Date Of Birth:</p>
                                    <p className='font-medium'>
                                        {new Date(employee.dob).toLocaleDateString()}
                                    </p>
                                </div>

                                <div className="flex space-x-3 mb-4">
                                    <p className='text-lg font-bold'>Gender:</p>
                                    <p className='font-medium'>{employee.gender}</p>
                                </div>

                                <div className="flex space-x-3 mb-4">
                                    <p className='text-lg font-bold'>Department:</p>
                                    <p className='font-medium'>{employee.department.dep_name}</p>
                                </div>

                                <div className="flex space-x-3 mb-4">
                                    <p className='text-lg font-bold'>Marital Status:</p>
                                    <p className='font-medium'>{employee.maritalStatus}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
            )
                :
                <div>Loading...</div>
            }
        </>
    )
}

export default ViewEmployee
