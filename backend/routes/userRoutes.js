const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController'); // Ensure correct import path
const router = express.Router();

router.post('/register', registerUser); // Ensure `registerUser` is defined
router.post('/login', loginUser);       // Ensure `loginUser` is defined

module.exports = router;
