const express = require('express');
const { storage, upload } = require('../config/cloudinary'); // Import Cloudinary storage

const {
  addEmployee,
  getEmployees,
  editEmployee,
  deleteEmployee,
  getEmployeeById
} = require('../controllers/employeeController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/add', protect, upload.single('Image'), addEmployee);

router.put('/edit/:id', protect, upload.single('Image'), editEmployee);
router.get('/:id', protect, getEmployeeById); // Fetch a single employee by ID

router.get('/', protect, getEmployees); // Get all employees
router.delete('/delete/:id', protect, deleteEmployee); // Delete employee by ID

module.exports = router;
