import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // Use the centralized Axios instance
import defaultAvatar from '../assets/images/user.png'; // Default avatar

const EmployeeCard = ({ employee }) => {
  const navigate = useNavigate();

  // Delete Employee Handler
  const handleDelete = async () => {
    try {
      await api.delete(`/employees/delete/${employee._id}`); // Use the API instance
      alert('Employee deleted successfully');
      window.location.reload();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete employee');
    }
  };

  return (
    <div className="border rounded p-4 flex items-center space-x-4">
      {/* Employee Image */}
      <img
        src={employee.Image || defaultAvatar}
        alt={employee.Name}
        className="h-16 w-16 rounded-full object-cover border"
      />

      {/* Employee Details */}
      <div>
        <h3 className="font-bold text-lg">{employee.Name}</h3>
        <p className="text-gray-600">{employee.Email}</p>
        <p className="text-gray-600">{employee.Mobile}</p>
        <p className="text-gray-600">Designation: {employee.Designation}</p>
        <p className="text-gray-600">Gender: {employee.Gender}</p>
      </div>

      {/* Action Buttons */}
      <div className="ml-auto flex space-x-2">
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          onClick={() => navigate(`/edit/${employee._id}`)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EmployeeCard;
