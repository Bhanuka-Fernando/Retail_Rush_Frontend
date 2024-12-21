import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EmployeeCard from './EmployeeCard'; // Import the EmployeeCard component
import './Staff.css'; // Import the CSS file for styling
import Layout from './Layout';

const StoreEmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null); // State to manage employee being edited
  const [editing, setEditing] = useState(false); // Manage edit state

  const storeID = 'S001'; // Hardcoded storeID

  useEffect(() => {
    // Fetch employees based on storeID
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`/api/staff/store/${storeID}`);
        setEmployees(response.data);
      } catch (err) {
        setError('Failed to fetch employees.');
      }
    };

    fetchEmployees();
  }, [storeID]);

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/staff/${id}`);
      setEmployees(employees.filter(emp => emp._id !== id));
    } catch (err) {
      setError('Failed to delete employee.');
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      if (selectedEmployee._id) {
        await axios.put(`/api/staff/${selectedEmployee._id}`, selectedEmployee);
        setEmployees(employees.map(emp => (emp._id === selectedEmployee._id ? selectedEmployee : emp)));
        setEditing(false);
        setSelectedEmployee(null);
      }
    } catch (err) {
      setError('Failed to update employee.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedEmployee({
      ...selectedEmployee,
      [name]: value,
    });
  };

  return (
    <Layout>
    <div className="store-employees-page">
      <h1>Store Employees</h1>
      {error && <div className="error-message">{error}</div>}
      <div className="employee-cards">
        {employees.length === 0 ? (
          <p>No employees found for this store.</p>
        ) : (
          employees.map(employee => (
            <EmployeeCard
              key={employee._id}
              employee={employee}
              onEdit={() => handleEdit(employee)}
              onDelete={() => handleDelete(employee._id)}
            />
          ))
        )}
      </div>
      
      {/* Edit Employee Form */}
      {editing && selectedEmployee && (
        <div className="edit-form">
          <h2>Edit Employee</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={selectedEmployee.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Position:</label>
              <input
                type="text"
                name="position"
                value={selectedEmployee.position}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Contact No:</label>
              <input
                type="text"
                name="contactNo"
                value={selectedEmployee.contactNo}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Address:</label>
              <input
                type="text"
                name="address"
                value={selectedEmployee.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit">Update</button>
            <button type="button" onClick={() => setEditing(false)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
    </Layout>
  );
};

export default StoreEmployeesPage;
