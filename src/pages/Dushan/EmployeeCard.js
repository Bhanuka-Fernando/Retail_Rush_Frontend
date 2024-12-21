import React from 'react';
import './EmployeeCard.css'; // Import the CSS file for styling

const EmployeeCard = ({ employee, onEdit, onDelete }) => {
  const handleEdit = () => {
    onEdit(employee._id); // Pass the employee ID to the parent component
  };

  const handleDelete = () => {
    onDelete(employee._id); // Pass the employee ID to the parent component
  };

  return (
    <div className="employee-card">
      {employee.imageUrl && (
        <img src={employee.imageUrl} alt={employee.name} className="employee-image" />
      )}
      <div className="employee-details">
        <h3>{employee.name}</h3>
        <p><strong>Position:</strong> {employee.position}</p>
        <p><strong>Contact No:</strong> {employee.contactNo}</p>
        <p><strong>Address:</strong> {employee.address}</p>
        <p><strong>Store ID:</strong> {employee.storeID}</p>
        <div className="button-group">
          <button className="modify-button" onClick={handleEdit}>Modify</button>
          <button className="delete-button" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
