import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api'; // Use centralized API instance

const EditEmployeePage = () => {
  const { id } = useParams(); // Employee ID from the route
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Mobile: '',
    Designation: '',
    Gender: '',
    Course: [],
    Image: null, // Updated to handle file upload
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const { data } = await api.get(`/employees/${id}`);
        setFormData({
          Name: data.Name,
          Email: data.Email,
          Mobile: data.Mobile,
          Designation: data.Designation,
          Gender: data.Gender,
          Course: data.Course || [],
          Image: null, // Reset to null for file upload
        });
      } catch (error) {
        alert('Failed to fetch employee details');
        navigate('/employees');
      }
    };

    fetchEmployee();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      Course: checked
        ? [...prev.Course, value]
        : prev.Course.filter((course) => course !== value),
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      Image: e.target.files[0], // Capture the selected file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData(); // Create FormData for multipart upload
      Object.keys(formData).forEach((key) => {
        if (key === 'Course') {
          // Append Course array properly
          formData[key].forEach((course) => data.append('Course', course));
        } else {
          data.append(key, formData[key]);
        }
      });

      await api.put(`/employees/edit/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Employee updated successfully');
      navigate('/employees');
    } catch (error) {
      console.error('Error updating employee:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Error updating employee');
    }
  };

  return (
    <form className="max-w-lg mx-auto my-8 p-4 border rounded" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4">Edit Employee</h2>
      <div className="mb-4">
        <label>Name</label>
        <input
          type="text"
          name="Name"
          value={formData.Name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label>Email</label>
        <input
          type="email"
          name="Email"
          value={formData.Email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label>Mobile</label>
        <input
          type="text"
          name="Mobile"
          value={formData.Mobile}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label>Designation</label>
        <select
          name="Designation"
          value={formData.Designation}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select</option>
          <option value="HR">HR</option>
          <option value="Manager">Manager</option>
          <option value="Sales">Sales</option>
        </select>
      </div>
      <div className="mb-4">
        <label>Gender</label>
        <div>
          <label>
            <input
              type="radio"
              name="Gender"
              value="Male"
              checked={formData.Gender === 'Male'}
              onChange={handleChange}
            />
            Male
          </label>
          <label className="ml-4">
            <input
              type="radio"
              name="Gender"
              value="Female"
              checked={formData.Gender === 'Female'}
              onChange={handleChange}
            />
            Female
          </label>
        </div>
      </div>
      <div className="mb-4">
        <label>Courses</label>
        <div>
          <label>
            <input
              type="checkbox"
              value="MCA"
              onChange={handleCheckboxChange}
              checked={formData.Course.includes('MCA')}
            />
            MCA
          </label>
          <label className="ml-4">
            <input
              type="checkbox"
              value="BCA"
              onChange={handleCheckboxChange}
              checked={formData.Course.includes('BCA')}
            />
            BCA
          </label>
          <label className="ml-4">
            <input
              type="checkbox"
              value="BSC"
              onChange={handleCheckboxChange}
              checked={formData.Course.includes('BSC')}
            />
            BSC
          </label>
        </div>
      </div>
      <div className="mb-4">
        <label>Image</label>
        <input
          type="file"
          name="Image"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
    </form>
  );
};

export default EditEmployeePage;
