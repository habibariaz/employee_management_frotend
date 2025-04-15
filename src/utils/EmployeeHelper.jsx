import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export const columns = [
    {
        name: "S.No",
        selector: (row) => row.sno,
        width: "150px",
    },
    {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
        width: "150px",
    },
    {
        name: "Image",
        selector: (row) => row.profileImage,
        sortable: true,
        width: "150px",
    },
    {
        name: "Department",
        selector: (row) => row.dep_name,
        sortable: true,
        width: "150px",
    },
    {
        name: "DOB",
        selector: (row) => row.dob,
        sortable: true,
        width: "200px",
    },
    {
        name: "Action",
        selector: (row) => row.action,
        center: true
    }
];

export const fetchDepartments = async () => {
    let departments
    try {
        const response = await axios.get("http://localhost:3000/api/department", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        if (response.data.success) {
            departments = response.data.departments
        }
    } catch (error) {
        if (error.response && !error.response.data.success) {
            alert(error.response.data.error)
        }
    }
    return departments
}

export const getEmployees = async (id) => {
    let employees
    try {
        const response = await axios.get(`http://localhost:3000/api/employees/department/${id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        if (response.data.success) {
            employees = response.data.employees
        }
    } catch (error) {
        if (error.response && !error.response.data.success) {
            alert(error.response.data.error)
        }
    }
    return employees
}


export const EmployeeButtons = ({ id }) => {
    const navigate = useNavigate();

    return (
        <div className="flex space-x-2">
            <button
                onClick={() => navigate(`/admin-dashboard/employees/${id}`)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                View
            </button>
            <button
                onClick={() => navigate(`/admin-dashboard/employees/edit/${id}`)}
                className="bg-green-600 text-white px-4 py-2 rounded"
            >
                Edit
            </button>
            <button
                onClick={() => navigate(`/admin-dashboard/salary/${id}`)}
                className="bg-yellow-600 text-white px-4 py-2 rounded"
            >
                Salary
            </button>
            <button
                onClick={() => navigate(`/admin-dashboard/employee/${id}`)}
                className="bg-red-600 text-white px-4 py-2 rounded"
            >
                Leave
            </button>
        </div>
    );
};