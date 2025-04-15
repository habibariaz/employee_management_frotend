import { useNavigate } from "react-router-dom"


export const columns = [
    {
        name: "S.No",
        selector: (row) => row.sno,
        width: "150px",
    },
    {
        name: "Emp ID",
        selector: (row) => row.employeeId,
        sortable: true,
        width: "150px",
    },
    {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
        width: "150px",
    },
    {
        name: "Leave Type",
        selector: (row) => row.leaveType,
        sortable: true,
        width: "150px",
    },
    {
        name: "Department",
        selector: (row) => row.department,
        sortable: true,
        width: "150px",
    },    
    {
        name: "Days",
        selector: (row) => row.days,
        sortable: true,
        width: "200px",
    },
    {
        name: "Status",
        selector: (row) => row.status,
        sortable: true,
        width: "200px",
    },
    {
        name: "Action",
        selector: (row) => row.action,
        center: true
    }
];

export const LeaveButtons = ({ Id }) => {
    const navigate = useNavigate();

    const handleView = (id) => {
        navigate(`/admin-dashboard/leaves/${id}`);
    }

    return (
        <>
            <button
                className="px-4 py-1 bg-teal-500 rounded text-white hover:bg-teal-600"
                onClick={() => handleView(Id)}
            >
                View
            </button>
        </>
    )
}