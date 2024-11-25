const Employee = require('../models/employeeModel');
const cloudinary = require('cloudinary').v2;

// Add Employee
const addEmployee = async (req, res) => {
  const { Id, Name, Email, Mobile, Designation, Gender, Course } = req.body;

  // console.log('Cloudinary Config:', {
  //   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  //   api_key: process.env.CLOUDINARY_API_KEY,
  //   api_secret: process.env.CLOUDINARY_API_SECRET,
  // });


  // Validate required fields
  if (!Name || !Email || !Mobile || !Designation || !Gender) {
    return res.status(400).json({ message: 'All required fields must be filled' });
  }

  try {
    // Check if email already exists
    const emailExists = await Employee.findOne({ Email });
    if (emailExists) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Create employee entry
    const employee = await Employee.create({
      Id,
      Image: req.file ? req.file.path : null, // Save Cloudinary URL or null if no file uploaded
      Name,
      Email,
      Mobile,
      Designation,
      Gender,
      Course,
      CreatedDate: new Date(),
    });

    res.status(201).json(employee);
  } catch (error) {
    console.error('Error creating employee:', error.message);
    res.status(500).json({ message: 'Failed to add employee', error: error.message });
  }
};


// Get All Employees
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error.message);
    res.status(500).json({ message: 'Failed to fetch employees', error: error.message });
  }
};


// Edit Employee
const editEmployee = async (req, res) => {
  // console.log('Cloudinary:', cloudinary);
  // console.log('Cloudinary uploader:', cloudinary.uploader);

  const { id } = req.params; // Get employee ID from the URL
  const { Name, Email, Mobile, Designation, Gender, Course } = req.body; // Extract fields from request body

  try {
    // Find the employee by ID
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Handle file upload
    if (req.file) {
      // Delete the old image from Cloudinary if it exists
      if (employee.Image) {
        const publicId = employee.Image.split('/').pop().split('.')[0]; // Extract public ID from image URL
        await cloudinary.uploader.destroy(publicId); // Delete the old image
      }

      // Update the image field with the new Cloudinary URL
      employee.Image = req.file.path;
    }

    // Update other fields
    employee.Name = Name || employee.Name;
    employee.Email = Email || employee.Email;
    employee.Mobile = Mobile || employee.Mobile;
    employee.Designation = Designation || employee.Designation;
    employee.Gender = Gender || employee.Gender;
    employee.Course = Course;

    // Save the updated employee
    const updatedEmployee = await employee.save();
    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error('Error updating employee:', error.message);
    res.status(500).json({ message: 'Failed to update employee', error: error.message });
  }
};


// Get Employee by ID
const getEmployeeById = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json(employee);
  } catch (error) {
    console.error('Error fetching employee:', error.message);
    res.status(500).json({ message: 'Failed to fetch employee', error: error.message });
  }
};


// Delete Employee
const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    await Employee.findByIdAndDelete(id);
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee:', error.message);
    res.status(500).json({ message: 'Failed to delete employee', error: error.message });
  }
};

module.exports = { addEmployee, getEmployees, editEmployee, deleteEmployee, getEmployeeById };

