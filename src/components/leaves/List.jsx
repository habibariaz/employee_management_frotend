import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import axios from 'axios'

const List = () => {

    const { user } = useAuth()
    const [leaves, setLeaves] = useState(null)

    const [filterLeave, setFilterLeaves] = useState([])

    let sno = 1;
    const { id } = useParams()

    useEffect(() => {
        const fetchLeaves = async () => {
            try {
                const url =
                    user.role === "admin"
                        ? "http://localhost:3000/api/leave"
                        : `http://localhost:3000/api/leave/${user._id}`;

                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                console.log(response.data);

                if (response.data.success) {
                    setLeaves(response.data.leaves);
                }
            } catch (error) {
                console.error(error.message);
                alert("Could not fetch leaves");
            }
        };

        if (user?._id) {
            fetchLeaves();
        }
    }, [user]);


    if (!leaves) {
        return <div>Loading...!!!</div>
    }

    return (
        <>
            <div style={{ backgroundColor: "#F5F5F5", height: "100vh" }}>
                <div className="container">
                    <div>
                        <div className='pt-5'>
                            <h3 className='text-2xl font-bold text-center pb-2 font-serif'>Manage Leaves</h3>
                            <div className="row mb-4">
                                {user.role === "employee" &&
                                    <div className="col-sm-3 ">
                                        <div className="card borderNone shadow">
                                            <div className="card-body" style={{ backgroundColor: "#F5F5F5" }}>
                                                <Link to="/employee-dashboard/add-leave" className='px-4 py-1 bg-teal-600 rounded text-white btn btn-success w-full'>Add Leave</Link>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>

                        <div style={{ maxHeight: "400px", overflowY: "auto", overflowX: "auto" }}>
                            <table className='table table-hover w-full text-sm text-left text-gray-500 pb-10'>
                                <thead>
                                    <tr>
                                        <th className='px-6 py-3'>SNO</th>
                                        <th className='px-6 py-3'>Leave Type</th>
                                        <th className='px-6 py-3'>From</th>
                                        <th className='px-6 py-3'>To</th>
                                        <th className='px-6 py-3'>Description</th>
                                        <th className='px-6 py-3'>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leaves.map((leave) => (
                                        <tr
                                            key={leave._id}
                                            className='bg-white border-b dark:bg-graay-800 dark:border-gray-700'
                                        >
                                            <td className='px-6 py-3'>{sno++}</td>
                                            <td className='px-6 py-3'>{leave.leaveType}</td>
                                            <td className='px-6 py-3'>{new Date(leave.startDate).toLocaleDateString()}</td>
                                            <td className='px-6 py-3'>{new Date(leave.endDate).toLocaleDateString()}</td>
                                            <td className='px-6 py-3'>{leave.reason}</td>
                                            <td className='px-6 py-3'>{leave.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default List