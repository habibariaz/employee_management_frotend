import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';
import axios from 'axios';

const AddLeave = () => {

    const { user } = useAuth();

    const [leave, setLeave] = useState({
        userId: user._id,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3000/api/leave/add`, leave, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (response.data.success) {
                alert("Leave Submitted Successfully...!!!")
                window.location.reload()
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLeave((prevState) => ({ ...prevState, [name]: value }))
    };

    return (
        <div style={{ backgroundColor: "#F5F5F5", height: "92vh" }}>
            <div className="container pt-10">
            <h3 className="text-2xl font-bold mb-6">Request for Leaves</h3>

            <div className="row">
                <div className="col-sm-12 mb-3">
                    <div className="card shadow">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                {/* Leave Type Selection */}
                                <div className="mb-3">
                                    <label htmlFor="leave">Leave Type</label>
                                    <select
                                        name="leaveType"
                                        id="leaveType"
                                        className="form-control"
                                        onChange={handleChange}
                                        defaultValue="Select"
                                        required
                                    >
                                        <option value="Select" disabled>Select Leave Type</option>
                                        <option value="Sick Leave">Sick Leave</option>
                                        <option value="Casual Leave">Casual Leave</option>
                                        <option value="Annual Leave">Annual Leave</option>
                                    </select>
                                </div>

                                {/* Date Selection Row */}
                                <div className="row g-3">
                                    <div className="col-sm-6">
                                        <div className="card borderNone">
                                            <div className="card-body">
                                                <label htmlFor="from">From Date</label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    name="startDate"
                                                    id="startDate"
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-6">
                                        <div className="card borderNone">
                                            <div className="card-body">
                                                <label htmlFor="to">To Date</label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    name="endDate"
                                                    id="endDate"
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="mb-3 pt-2">
                                    <label htmlFor="description">Description</label>
                                    <textarea
                                        name="reason"
                                        id="reason"
                                        className="form-control"
                                        placeholder="Enter leave reason..."
                                        rows="3"
                                        required
                                        onChange={handleChange}
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <button type="submit" className="btn btn-success mt-2 w-100">
                                    Request Leave
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default AddLeave;
