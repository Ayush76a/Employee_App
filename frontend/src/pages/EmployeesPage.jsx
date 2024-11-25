import React, { useEffect, useState } from 'react';
import api from '../services/api'; // Import the centralized Axios instance
import EmployeeCard from '../components/EmployeeCard';

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State to store the search query

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { data } = await api.get('/employees'); // Use centralized Axios instance
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employees:', error.response?.data || error.message);
      }
    };
    fetchEmployees();
  }, []);

  // Filter employees based on the search query
  const filteredEmployees = employees.filter((employee) =>
    employee.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.Email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.Designation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto ml-20 mt-4 pr-8"> {/* Added 'pr-8' for right padding */}
      {/* Heading and Search Bar */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Employee List</h2>
        <div className="flex items-center space-x-2 mr-28"> {/* Added 'mr-4' for right margin */}
          <label htmlFor="search" className="font-semibold">
            Search:
          </label>
          <input
            id="search"
            type="text"
            placeholder="Enter keywords..."
            className="w-80 p-2 border rounded" // Increased width to 'w-80'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Employee Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEmployees.length > 0 ? (
          filteredEmployees.map((employee) => (
            <EmployeeCard key={employee._id} employee={employee} />
          ))
        ) : (
          <p className="text-gray-600 text-center">No employees found matching your search.</p>
        )}
      </div>
    </div>
  );
};

export default EmployeesPage;
