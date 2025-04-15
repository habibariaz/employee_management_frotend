import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper';
import DataTable from 'react-data-table-component';

const List = () => {

    const [employees, setEmployees] = useState([]);
    const [empLoading, setEmpLoading] = useState(false)
    const [filterEmp, setFilterEmp] = useState([])


    useEffect(() => {
        const fetchEmployees = async () => {
            setEmpLoading(true)
            try {
                const response = await axios.get("http://localhost:3000/api/employees", {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    }
                })

                console.log(response.data)

                if (response.data.success) {
                    let sno = 1;
                    const data = response.data.employees.map((emp, index) => ({
                        _id: emp._id,
                        sno: index + 1,
                        dep_name: emp.department.dep_name,
                        name: emp.userId.name,
                        dob: new Date(emp.dob).toLocaleDateString(),
                        profileImage: <img width={40} className='rounded-full' src={`http://localhost:3000/${emp.userId.profileImage}`} />,
                        action: <EmployeeButtons id={emp._id} />
                    }));

                    setEmployees(data)
                    setFilterEmp(data)

                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            } finally {
                setEmpLoading(false)
            }
        }
        fetchEmployees()
    }, [])

    const filterEmployees = (e) => {
        const records = employees.filter((emp) =>
            emp.name.toLowerCase().includes(e.target.value.toLowerCase()))
        setFilterEmp(records)
    }

    return (
        <>
            <div style={{ backgroundColor: "#F5F5F5", height: "100vh" }}>
                <div className="container">
                    <div>
                        <div >
                            <h3 className='text-2xl font-bold font-serif pb-2 pt-10'>Manage Employees</h3>
                            <div className="row" style={{ boxShadow:"0 2px 8px rgba(21, 20, 20, 0.2"}}>
                                <div className="col-sm-6 mb-3 mb-sm-0">
                                    <div className="card borderNone" style={{ backgroundColor: "#F5F5F5" }} >
                                        <div className="card-body">
                                            <input
                                                type="text"
                                                placeholder='Search By Department'
                                                className='px-4 py-0.5 border form-control '
                                                onChange={filterEmployees}
                                                required />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="card borderNone" style={{ backgroundColor: "#F5F5F5" }}>
                                        <div className="card-body " >
                                            <div>
                                                <Link to="/admin-dashboard/employees/addEmployee" className='px-4 py-1 bg-teal-600 rounded text-white btn btn-success w-100'>Add Employee</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 overflow-x-auto">
                            <DataTable
                                columns={columns}
                                data={filterEmp}
                                responsive
                                pagination
                                highlightOnHover
                            />
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default List