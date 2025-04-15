import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Login from './pages/Login';

import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import PrivateRoutes from './utils/PrivateRoutes';
import RoleBaseRoutes from './utils/RoleBaseRoutes';
import AdminSummary from './components/dashboard/AdminSummary';
import DepartmentList from './components/departments/DepartmentList';
import AddDepartment from './components/departments/AddDepartment';
import EditDepartment from './components/departments/EditDepartment';
import AddEmployee from './components/employee/AddEmployee';
import List from './components/employee/List'
import EditEmployee from './components/employee/EditEmployee';
import ViewEmployee from './components/employee/ViewEmployee';
import AddSalary from './components/salary/AddSalary';
import ViewSalary from './components/salary/ViewSalary';
import SummaryCard from './components/EmployeeDashborad/SummaryCard';
import LeaveList from './components/leaves/List'
import AddLeave from './components/leaves/AddLeave';
import Setting from './components/EmployeeDashborad/Setting';
import Table from './components/leaves/Table';
import LeaveDetail from './components/leaves/LeaveDetail';
import Admin_Setting from './components/dashboard/Admin_Setting';

function App() {
  return (

    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route exact path="/login" element={<Login />}></Route>

        {/* Employee Dashboard */}
        <Route path='/' element={<Navigate to="/admin-dashboard" />}></Route>

        {/* Employee Dashboard Private Routes */}
        <Route path='/employee-dashboard' element={
          <PrivateRoutes>
            <RoleBaseRoutes requiredRole={["admin", "employee"]}>
              <EmployeeDashboard />
            </RoleBaseRoutes>
          </PrivateRoutes>
        }>
          <Route index element={<SummaryCard />}></Route>
          {/* child routes of Employee dashboard */}
          <Route path="/employee-dashboard/profile/:id" element={< ViewEmployee />}></Route>
          <Route path="/employee-dashboard/leaves/:id" element={< LeaveList />}></Route>
          <Route path="/employee-dashboard/add-leave" element={< AddLeave />}></Route>
          <Route path="/employee-dashboard/salary/:id" element={< ViewSalary />}></Route>
          <Route path="/employee-dashboard/setting" element={< Setting />}></Route>
        </Route>
        {/* Employee Dashboard Private Routes Ended*/}

        {/* Admin Dashboard Private Routes */}
        <Route path='/admin-dashboard' element={
          <PrivateRoutes>
            <RoleBaseRoutes requiredRole={["admin"]}>
              <AdminDashboard />
            </RoleBaseRoutes>
          </PrivateRoutes>
        }>
          <Route index element={<AdminSummary />}></Route>
          {/* child routes of Admin dashboard */}
          <Route path="/admin-dashboard/departments" element={<DepartmentList />}></Route>
          <Route path="/admin-dashboard/add-departments" element={<AddDepartment />}></Route>
          <Route path="/admin-dashboard/department/:id" element={<EditDepartment />}></Route>
          <Route path="/admin-dashboard/employees" element={<List />}></Route>
          <Route path="/admin-dashboard/employees/addEmployee" element={<AddEmployee />}></Route>
          <Route path="/admin-dashboard/employees/:id" element={<ViewEmployee />}></Route>
          <Route path="/admin-dashboard/employees/edit/:id" element={<EditEmployee />}></Route>
          <Route path="/admin-dashboard/salary/add" element={<AddSalary />}></Route>
          <Route path="/admin-dashboard/salary/:id" element={<ViewSalary />}></Route>
          <Route path="/admin-dashboard/leaves" element={<Table />}></Route>
          <Route path="/admin-dashboard/leaves/:id" element={<LeaveDetail />}></Route>
          <Route path="/admin-dashboard/employee/:id" element={<LeaveList />}></Route>
          <Route path="/admin-dashboard/setting" element={<Admin_Setting />}></Route>



        </Route>
        {/* Admin Dashboard Private Routes Ended*/}
      </Routes>
    </BrowserRouter >
  )
}

export default App
