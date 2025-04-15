import axios from "axios"
import { useNavigate } from "react-router-dom"

export const columns = [
    {
        name: "sno",
        selector: (row) => row.sno,
    },
    {
        name: "Department Name",
        selector: (row) => row.dep_name,
        sortable: true
    },
    {
        name: "Action",
        selector: (row) => row.action
    }
]

export const DepartmentButtons = ({ id, onDepartmentDelete }) => {
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Do you want to delete this department?");

        if (confirmDelete) {
            try {
                const response = await axios.delete(`http://localhost:3000/api/department/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });

                if (response.data.success) {
                    onDepartmentDelete();
                }
            } catch (error) {
                alert(error.response?.data?.error || "Failed to delete department");
            }
        }
    };

    return (
        <div className="flex space-x-2">
            <button
                onClick={() => navigate(`/admin-dashboard/department/${id}`)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Edit
            </button>
            <button
                onClick={() => handleDelete(id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
            >
                Delete
            </button>
        </div>
    );
};