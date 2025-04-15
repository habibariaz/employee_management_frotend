import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper';
import DataTable from 'react-data-table-component';
import { useAuth } from '../../context/authContext';

const ViewSalary = () => {

    const [salaries, setSalaries] = useState([]);
    const [filterSalaries, setFilterSalaries] = useState([]);


    const { id } = useParams()
    let sno = 1;
    const { user } = useAuth()

    useEffect(() => {
        const fetchSalaries = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/salary/${id}/${user.role}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    }
                })

                console.log(response.data)

                if (response.data.success) {
                    setSalaries(response.data.salary)
                    setFilterSalaries(response.data.salary)
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.message)
                }
            }
        }
        fetchSalaries()
    }, [])

    const filterEmpSalaries = (q) => {
        const filterRecords = salaries.filter((salary) =>
            salary.employeeId?.employeeId?.toLowerCase().includes(q.toLowerCase())
        );
        setFilterSalaries(filterRecords);
    };

    return (
        <>
            <div style={{ backgroundColor: "#F5F5F5", height: "90vh" }}>
                <div className="container">
                    <div>
                        <div className='pt-5 pb-5'>
                            <h3 className='text-2xl font-bold text-center'>Salary History</h3>
                            <div className="row">
                                <div className="col-sm-4">
                                    <div className="card">
                                        <div className="card-body">
                                            <input
                                                type="text"
                                                placeholder='Search By Emp ID'
                                                className='px-4 py-0.5 border form-control'
                                                onChange={(e) => filterEmpSalaries(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{ maxHeight: "400px", overflowY: "auto", overflowX: "auto" }}>
                            {filterSalaries.length > 0 ? (
                                <table className='table table-hover w-full text-sm text-left text-gray-500 overflow-scroll'>
                                    <thead>
                                        <tr>
                                            <th className='px-6 py-3'>SNO</th>
                                            <th className='px-6 py-3'>Emp ID</th>
                                            <th className='px-6 py-3'>Salary</th>
                                            <th className='px-6 py-3'>Allowances</th>
                                            <th className='px-6 py-3'>Deduction</th>
                                            <th className='px-6 py-3'>Total</th>
                                            <th className='px-6 py-3'>Pay Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filterSalaries.map((salary) => (
                                            <tr
                                                key={salary.id}
                                                className='bg-white border-b dark:bg-graay-800 dark:border-gray-700'
                                            >
                                                <td className='px-6 py-3'>{sno++}</td>
                                                <td className='px-6 py-3'>{salary.employeeId.employeeId}</td>
                                                <td className='px-6 py-3'>{salary.salary}</td>
                                                <td className='px-6 py-3'>{salary.allowances}</td>
                                                <td className='px-6 py-3'>{salary.deduction}</td>
                                                <td className='px-6 py-3'>{salary.netSalary}</td>
                                                <td className='px-6 py-3'>{new Date(salary.payDate).toLocaleDateString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) :
                                <div>No Records Found...</div>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewSalary