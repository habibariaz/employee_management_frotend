import React, { useEffect, useState } from 'react'
import { fetchDepartments, getEmployees } from '../../utils/EmployeeHelper';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const AddSalary = () => {

    const [departments, setDepartments] = useState([])
    const [employees, setEmployees] = useState([])
    const navigate = useNavigate();

    const [employee, setEmployee] = useState({
        employeeId: null,
        salary: 0,
        deduction: 0,
        allowances: 0,
        payDate: null
    })


    useEffect(() => {
        const getDepartments = async () => {
            const departments = await fetchDepartments();
            setDepartments(departments)
        };
        getDepartments();
    }, [])

    const handleDepartment = async (e) => {
        const emps = await getEmployees(e.target.value);
        setEmployees(emps)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:3000/api/salary/add`,
                employee, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (response.data.success) {
                alert("Salary Added Successfully...!!!")
                navigate("/admin-dashboard/salary/add")
            }
        } catch (error) {
            if (error.response && error.response.data.success) {
                alert(error.response.data.error)
            }
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prevData) => ({ ...prevData, [name]: value }))
    }

    return (
        <>
            <div style={{ backgroundColor: "#F5F5F5", height: "80vh" }}>
                {departments ? (<div className="container pt-10">
                    <div>
                        <h3 className='text-2xl font-bold mb-6'>Add New Salary</h3>
                    </div>

                    <div className=''>
                        <div className="row shadow borderNone">
                            <div className="col-sm-12 mb-3 mb-sm-0">
                                <div className="card borderNone">
                                    <div className="card-body">

                                        <form onSubmit={handleSubmit}>
                                            <div className="row borderNone">
                                                <div className="col-sm-6 mb-3 mb-sm-0">

                                                    {/* Department */}
                                                    <div className="card borderNone">
                                                        <div className="card-body">
                                                            <label htmlFor="">Department</label><br />
                                                            <select
                                                                name="department"
                                                                id="department"
                                                                className='form-control'
                                                                onChange={handleDepartment}
                                                            // value={employee.department}
                                                            >
                                                                <option value="">Select Department</option>
                                                                {departments.map((dep) => (
                                                                    <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>

                                                    {/* Basic Salary */}
                                                    <div className="card borderNone">
                                                        <div className="card-body">
                                                            <label htmlFor="">Basic Salary</label>
                                                            <input type="number" className='form-control' name="salary" placeholder='Insert Salary' onChange={handleChange} />
                                                        </div>
                                                    </div>

                                                    {/* Deduction */}
                                                    <div className="card borderNone">
                                                        <div className="card-body">
                                                            <label htmlFor="">Deduction</label>
                                                            <input type="number" className='form-control' name="deduction" id="deduction" placeholder='Monthly Deduction' onChange={handleChange} />
                                                        </div>
                                                    </div>
                                                </div>


                                                <div className="col-sm-6 mb-3 mb-sm-0">
                                                    {/* Employee */}
                                                    <div className="card borderNone">
                                                        <div className="card-body">
                                                            <label htmlFor="">Employee</label><br />
                                                            <select name="employeeId" id="employee" className='form-control' onChange={handleChange}>
                                                                <option value="">Select Employee</option>
                                                                {employees.map((emp) => (
                                                                    <option
                                                                        key={emp._id}
                                                                        value={emp._id}
                                                                    >
                                                                        {emp.employeeId}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>

                                                    {/* Allowances */}
                                                    <div className="card borderNone">
                                                        <div className="card-body">
                                                            <label htmlFor="">Allowances</label>
                                                            <input type="text" className='form-control' name="allowances" id="allowances" placeholder='Monthly Allowances' onChange={handleChange} />
                                                        </div>
                                                    </div>

                                                    {/* Pay Date */}
                                                    <div className="card borderNone">
                                                        <div className="card-body">
                                                            <label htmlFor="">Pay Date</label>
                                                            <input type="date" className='form-control' name="payDate" id="payDate" onChange={handleChange} />
                                                        </div>
                                                    </div>
                                                </div>

                                                <button type="submit" className='btn btn-success mt-2'>Add Salary</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>)
                    :
                    (
                        <div>Loading...</div>
                    )}
            </div>
        </>
    )
}

export default AddSalary