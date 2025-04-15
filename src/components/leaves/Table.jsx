import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import axios from 'axios'
import { columns, LeaveButtons } from './LeaveHelper'

const Table = () => {

    const [leaves, setLeaves] = useState([])
    const [filterLeaves, setFilterLeaves] = useState([])

    const fetchLeaves = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/leave", {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            })

            console.log(response.data)

            if (response.data.success) {
                let sno = 1;
                const data = response.data.leaves.map((leave) => ({
                    _id: leave._id,
                    sno: sno++,
                    employeeId: leave.employeeId.employeeId,
                    name: leave.employeeId.userId.name,
                    leaveType: leave.leaveType,
                    department: leave.employeeId.department.dep_name,
                    days: Math.ceil(
                        (new Date(leave.endDate) - new Date(leave.startDate)) / (1000 * 60 * 60 * 24)
                    ) + 1,
                    status: leave.status,
                    action: <LeaveButtons Id={leave._id} />
                }));

                setLeaves(data);
                setFilterLeaves(data);

            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
        }
    }

    useEffect(() => {
        fetchLeaves()
    }, [])

    const filterbyInput = (e) => {
        const data = leaves.filter((leave) =>
            leave.employeeId
                .toLowerCase()
                .includes(e.target.value.toLowerCase())
        )
        setFilterLeaves(data)
    }

    const filterByButton = (status) => {
        const data = leaves.filter((leave) =>
            leave.status
                .toLowerCase()
                .includes(status.toLowerCase())
        )
        setFilterLeaves(data)
    }

    return (
        <>
            <div style={{ backgroundColor: "#F5F5F5", height: "110vh" }}>
                {setFilterLeaves ? (
                    <div className="container">
                        <div>
                            <div className='pt-5'>
                                <h3 className='text-2xl font-bold text-center pb-4'>Manage Leaves</h3>
                                <div className="row">
                                    <div className="col-sm-3 mb-3 mb-sm-0">
                                        <div className="card borderNone shadow" style={{ backgroundColor: "#F5F5F5"}}>
                                            <div className="card-body">
                                                <input
                                                    type="text"
                                                    placeholder='Search By Emp Id'
                                                    className='px-4 py-1 border form-control'
                                                    onChange={filterbyInput}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-9">
                                        <div className="card shadow borderNone" style={{ backgroundColor: "#F5F5F5"}}>
                                            <div className="card-body">
                                                <div className='flex justify-center items-center'>
                                                    <button
                                                        className='btn btn-primary ml-2 w-50'
                                                        onClick={() => filterByButton("Pending")}

                                                    >
                                                        Pending
                                                    </button>
                                                    <button
                                                        className='btn btn-success ml-2 w-50'
                                                        onClick={() => filterByButton("Approved")}

                                                    >
                                                        Approved
                                                    </button>
                                                    <button
                                                        className='btn btn-danger ml-2 w-50'
                                                        onClick={() => filterByButton("Rejected")}
                                                    >
                                                        Rejected
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <DataTable style={{ maxHeight: "400px", overflowY: "auto", overflowX: "auto" }} className='mt-3' columns={columns} data={filterLeaves} pagination />
                        </div>
                    </div>
                ) :
                    (<div>Loading</div>)
                }
            </div>
        </>
    )



}

export default Table

