import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchDepartments } from '../../utils/EmployeeHelper';

const EditEmployee = () => {

  const navigate = useNavigate();
  const { id } = useParams()
  const [departments, setDepartments] = useState(null)

  const [employee, setEmployee] = useState({
    name: '',
    maritalStatus: '',
    designation: '',
    salary: 0,
    department: ''
  })

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/employees/${id}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        })
        if (response.data.success) {
          const employee = response.data.employee;
          setEmployee((prev) => ({
            ...prev,
            name: employee.userId.name,
            maritalStatus: employee.maritalStatus,
            designation: employee.designation,
            salary: employee.salary,
            department: employee.department
          }))
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error)
        }
      }
    }
    fetchEmployee()
  }, [])

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments)
    };
    getDepartments();
  }, [])


  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:3000/api/employees/${id}`,
        employee, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
      if (response.data.success) {
        alert("Employee Updated Successfully...!!!")
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

      {departments && employee ? (
        <div style={{ backgroundColor: "#F5F5F5", height: "92vh" }}>
          <div className="container">
            <div>
              <h3 className='text-2xl font-bold mb-6 pt-10'>Edit Employee</h3>
            </div>

            <div className=''>
              <div className="row">
                <div className="col-sm-12 mb-3 mb-sm-0">
                  <div className="card borderNone">
                    <div className="card-body">
                      <form onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-sm-6 mb-3 mb-sm-0">

                            {/* Name */}
                            <div className="card borderNone">
                              <div className="card-body">
                                <label htmlFor="">Name</label>
                                <input
                                  type="text"
                                  value={employee.name}
                                  className='form-control'
                                  name="name"
                                  placeholder='Enter Name'
                                  onChange={handleChange} />
                              </div>
                            </div>

                            {/* Designation */}
                            <div className="card borderNone">
                              <div className="card-body">
                                <label htmlFor="">Designation</label>
                                <input
                                  type="text"
                                  className='form-control'
                                  name="designation"
                                  id="designation"
                                  placeholder='Designation'
                                  onChange={handleChange}
                                  value={employee.designation} />
                              </div>
                            </div>

                            {/* Department */}
                            <div className="card borderNone">
                              <div className="card-body">
                                <label htmlFor="">Department</label><br />
                                <select name="department" value={employee.department} id="department" className='form-control' onChange={handleChange}>
                                  <option value="Select">Select Department</option>
                                  {departments.map((dep) => (
                                    <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                                  ))}
                                </select>
                              </div>
                            </div>

                          </div>

                          <div className="col-sm-6 mb-3 mb-sm-0">

                            {/* Marital Status */}
                            <div className="card borderNone">
                              <div className="card-body">
                                <label htmlFor="">Marital Status</label><br />
                                <select name="maritalStatus" id="maritalStatus" className='form-control' onChange={handleChange} value={employee.maritalStatus}>
                                  <option value="Select" selected disabled>Select</option>
                                  <option value="married">Married</option>
                                  <option value="single">Single</option>
                                </select>
                              </div>
                            </div>

                            {/* Salary */}
                            <div className="card borderNone">
                              <div className="card-body">
                                <label htmlFor="">Salary</label>
                                <input
                                  type="text"
                                  value={employee.salary}
                                  className='form-control'
                                  name="salary"
                                  id="salary"
                                  placeholder='Salary'
                                  onChange={handleChange} />
                              </div>
                            </div>

                          </div>
                          <button type="submit" className='btn btn-success mt-2'>Edit Employee</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      )
        :
        <div>
          Loading...
        </div>
      }

    </>
  )
}

export default EditEmployee