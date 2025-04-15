import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import axios from 'axios'

const Setting = () => {

    const navigate = useNavigate()
    const { user } = useAuth()

    const [setting, setSetting] = useState({
        userId: user._id,
        oldPassword: "",
        newPassword: ""
    })

    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.put("http://localhost:3000/api/setting/change-password", setting,
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                }
            );
            if (response.data.success) {
                alert("Password Changed Successfully...!!!")
                navigate("/employee-dashboard")
                setError("")
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                setError(error.response.data.error)
            }
        }

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSetting({ ...setting, [name]: value });
    }

    return (
        <>
            <div style={{ backgroundColor: "#F5F5F5", height: "92vh" }}>
                <div className="container">
                    <div className='text-2xl font-semibold mb-6 text-center pt-5'>
                        <h1 className='font-serif'>Change Password</h1>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div class="row">
                            <div class="col-sm-4 mb-3 mb-sm-0">
                                <div class="card borderNone">
                                </div>
                            </div>

                            <div class="col-sm-4 mb-3 mb-sm-0">
                                <div class="card shadow">
                                    <div class="card-body">
                                        <label>Old Password</label>
                                        <input required placeholder="Enter Old Password" type="password" className='form-control' name="oldPassword" onChange={handleChange} />
                                    </div>
                                </div>
                            </div>

                            <div class="col-sm-4 mb-3 mb-sm-0">
                                <div class="card borderNone">
                                </div>
                            </div>

                            <div class="col-sm-4 mb-3 mb-sm-0">
                                <div class="card borderNone">
                                </div>
                            </div>

                            <div class="col-sm-4 mb-3 mb-sm-0">
                                <div class="card shadow">
                                    <div class="card-body">
                                        <label>New Password</label>
                                        <input required placeholder="Enter New Password" type="password" className='form-control' name="newPassword" onChange={handleChange} />
                                    </div>
                                </div>
                            </div>

                            <div class="col-sm-4 mb-3 mb-sm-0">
                                <div class="card borderNone">
                                </div>
                            </div>
                        </div>

                        <div className="d-flex justify-content-center mt-4">
                            <div className="col-sm-4">
                                <button type='submit' className='btn btn-success w-100'>Submit</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>

        </>
    )
}

export default Setting