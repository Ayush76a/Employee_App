import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // Import the centralized Axios instance

const CreateEmployeePage = ({ editMode, existingData }) => {
  const [formData, setFormData] = useState(
    existingData || {
      Name: '',
      Email: '',
      Mobile: '',
      Designation: '',
      Gender: '',
      Course: [], // Initialize as an empty array
      Image: null, // Use null for file upload
    }
  );
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      Image: e.target.files[0], // Store the selected file
    });
  };

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      Course: prevState.Course.includes(value)
        ? prevState.Course.filter((course) => course !== value)
        : [...prevState.Course, value],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData(); // Create FormData object
      Object.keys(formData).forEach((key) => {
        if (key === 'Course') {
          // Append Course array properly
          formData[key].forEach((course) => data.append('Course', course));
        } else {
          data.append(key, formData[key]);
        }
      });

      if (editMode) {
        await api.put(`/employees/edit/${existingData._id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Employee updated successfully');
      } else {
        await api.post('/employees/add', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Employee added successfully');
      }
      navigate('/employees');
    } catch (error) {
      console.error('Error submitting form:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Error submitting employee form');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mt-4 ml-20">
        {editMode ? 'Edit Employee' : 'Create Employee'}
      </h1>
    <div className="max-w-lg mx-auto mt-4">
      <form
        onSubmit={handleSubmit}
        className="p-6 border-2 border-gray-300 rounded-lg shadow-lg"
      >
        <div className="mb-4">
          <label className="block mb-1">Name</label>
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
          <label className="block mb-1">Email</label>
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
          <label className="block mb-1">Mobile</label>
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
          <label className="block mb-1">Designation</label>
          <select
            name="Designation"
            value={formData.Designation}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Designation</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Gender</label>
          <div className="flex items-center">
            <label className="mr-4">
              <input
                type="radio"
                name="Gender"
                value="Male"
                checked={formData.Gender === 'Male'}
                onChange={handleChange}
              />
              Male
            </label>
            <label>
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
          <label className="block mb-1">Course</label>
          <div className="flex items-center">
            {['MCA', 'BCA', 'BSC'].map((course) => (
              <label key={course} className="mr-4">
                <input
                  type="checkbox"
                  name="Course"
                  value={course}
                  checked={formData.Course.includes(course)}
                  onChange={handleCheckboxChange}
                />
                {course}
              </label>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Image</label>
          <input
            type="file"
            name="Image"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          {editMode ? 'Update Employee' : 'Create Employee'}
        </button>
      </form>
    </div>
    </div>
  );
};

export default CreateEmployeePage;
