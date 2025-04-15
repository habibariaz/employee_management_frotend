import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { columns, DepartmentButtons } from '../../utils/DepartmentHelper'
import axios from 'axios'

const DepartmentList = () => {

  const [departments, setDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(false)
  const [filterDep, setFilterDep] = useState([])

  const onDepartmentDelete = () => {
    fetchDepartments()
  }

  useEffect(() => {
    fetchDepartments()
  }, [])

  const fetchDepartments = async () => {
    setDepLoading(true)
    try {
      const response = await axios.get("http://localhost:3000/api/department", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
      if (response.data.success) {
        const sno = 1;

        const data = await response.data.departments.map((dep, index) => (
          {
            _id: dep._id,
            sno: index + 1,
            dep_name: dep.dep_name,
            action: (<DepartmentButtons id={dep._id} onDepartmentDelete={onDepartmentDelete} />)
          }
        ))
        setDepartments(data)
        setFilterDep(data)
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error)
      }
    } finally {
      setDepLoading(false)
    }
  }

  const filterDepartments = (e) => {
    const records = departments.filter((dep) => dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()))
    setFilterDep(records)
  }

  return (

    <>
      {depLoading ? <div>Loading...</div> :
        <div style={{ backgroundColor: "#F5F5F5", height: "92vh" }}>
          <div className='container'>
            <div className='pt-5'>
              <h3 className='text-2xl font-bold pb-3'>Manage Department</h3>
              <div className="row" style={{ boxShadow: "0 2px 8px rgba(21, 20, 20, 0.2" }}>
                <div className="col-sm-6 mb-3 mb-sm-0">
                  <div className="card borderNone" style={{ backgroundColor: "#F5F5F5" }}>
                    <div className="card-body">
                      <input type="text" placeholder='Search By Department' className='px-4 py-0.5 border form-control ' required
                        onChange={filterDepartments} />
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="card borderNone" style={{ backgroundColor: "#F5F5F5" }}>
                    <div className="card-body">
                      <Link to="/admin-dashboard/add-departments" className='px-4 py-1 bg-teal-600 rounded text-white btn btn-success w-full'>Add Department</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div >
            <div className="mt-10 overflow-x-auto">
              <div className="min-w-[800px]">
                <DataTable
                  columns={columns}
                  data={filterDep}
                  responsive
                  pagination
                  highlightOnHover
                />
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default DepartmentList