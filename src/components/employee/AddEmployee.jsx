import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { fetchDepartments } from '../../utils/EmployeeHelper';

const AddEmployee = () => {

    const navigate = useNavigate();

    const [departments, setDepartments] = useState([])
    const [formData, setFormData] = useState({})


    useEffect(() => {
        const getDepartments = async () => {
            const departments = await fetchDepartments();
            setDepartments(departments)
        };
        getDepartments();
    }, [])


    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "image") {
            setFormData((prevData) => ({ ...prevData, [name]: files[0] }))
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataObj = new FormData()

        Object.keys(formData).forEach((key) => {
            formDataObj.append(key, formData[key])
        })

        try {
            const response = await axios.post("http://localhost:3000/api/employees/addEmployee",
                formDataObj, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (response.data.success) {
                alert("Employee Added Successfully...!!!")
                navigate("/admin-dashboard/employees")
            }
        } catch (error) {
            if (error.response && error.response.data.success) {
                alert(error.response.data.error)
            }
        }
    }

    return (
        <>
            <div style={{ backgroundColor: "#F5F5F5" }}>
                <div className="container pb-10" >
                    <div className='pt-10'>
                        <h3 className='text-2xl font-bold mb-6 font-serif'>Add New Employee</h3>
                    </div>

                    <div className=''>
                        <div className="row">
                            <div className="col-sm-12 mb-3 mb-sm-0">
                                <div className="card" style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}>
                                    <div className="card-body ">
                                        <form onSubmit={handleSubmit}>
                                            <div className="row">
                                                <div className="col-sm-6 mb-3 mb-sm-0">
                                                    <div className="card borderNone">
                                                        <div className="card-body">
                                                            <label htmlFor="">Name</label>
                                                            <input type="text" className='form-control' name="name" placeholder='Enter Name' onChange={handleChange} />
                                                        </div>
                                                    </div>
                                                    <div className="card borderNone">
                                                        <div className="card-body">
                                                            <label htmlFor="">Employee ID</label>
                                                            <input type="text" className='form-control' name="employeeId" placeholder='Employee ID' onChange={handleChange} />
                                                        </div>
                                                    </div>
                                                    <div className="card borderNone">
                                                        <div className="card-body">
                                                            <label htmlFor="">Gender</label><br />
                                                            <select name="gender" id="gender" className='form-control' onChange={handleChange} defaultValue="Select Gender">
                                                                <option value="Select Gender" >Select Gender</option>
                                                                <option value="male">Male</option>
                                                                <option value="female">Female</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="card borderNone">
                                                        <div className="card-body">
                                                            <label htmlFor="">Designation</label>
                                                            <input type="text" className='form-control' name="designation" id="designation" placeholder='Designation' onChange={handleChange} />
                                                        </div>
                                                    </div>
                                                    <div className="card borderNone">
                                                        <div className="card-body">
                                                            <label htmlFor="">Salary</label>
                                                            <input type="text" className='form-control' name="salary" id="salary" placeholder='Salary' onChange={handleChange} />
                                                        </div>
                                                    </div>
                                                    <div className="card borderNone">
                                                        <div className="card-body">
                                                            <label htmlFor="">Role</label><br />
                                                            <select name="role" id="role" className='form-control' onChange={handleChange}>
                                                                <option value="Select" selected disabled>Select Role</option>
                                                                <option value="admin">Admin</option>
                                                                <option value="employee">Employee</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6 mb-3 mb-sm-0">
                                                    <div className="card borderNone">
                                                        <div className="card-body">
                                                            <label htmlFor="">Email</label>
                                                            <input type="text" className='form-control' name="email" id="email" placeholder='Enter Email' onChange={handleChange} />
                                                        </div>
                                                    </div>
                                                    <div className="card borderNone">
                                                        <div className="card-body">
                                                            <label htmlFor="">DOB</label>
                                                            <input type="date" className='form-control' name="dob" id="dob" onChange={handleChange} />
                                                        </div>
                                                    </div>
                                                    <div className="card borderNone">
                                                        <div className="card-body">
                                                            <label htmlFor="">Marital Status</label><br />
                                                            <select name="maritalStatus" id="maritalStatus" className='form-control' onChange={handleChange}>
                                                                <option value="Select" selected disabled>Select Status</option>
                                                                <option value="married">Married</option>
                                                                <option value="single">Single</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="card borderNone">
                                                        <div className="card-body">
                                                            <label htmlFor="">Department</label><br />
                                                            <select name="department" id="department" className='form-control' onChange={handleChange}>
                                                                <option value="">Select Department</option>
                                                                {departments.map((dep) => (
                                                                    <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="card borderNone">
                                                        <div className="card-body">
                                                            <label htmlFor="">Password</label>
                                                            <input type="password" className='form-control' name="password" id="password" placeholder='*****' onChange={handleChange} />
                                                        </div>
                                                    </div>
                                                    <div className="card borderNone">
                                                        <div className="card-body">
                                                            <label htmlFor="">Upload Image</label>
                                                            <input type="file" className='form-control' name="image" id="image" onChange={handleChange} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <button type="submit" className='btn btn-success mt-2'>Add Employee</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddEmployee