const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Import CORS middleware
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

dotenv.config();

connectDB();

const app = express();

// Enable CORS
app.use(
  cors({
    origin: 'http://localhost:3000', // Allow requests from this frontend origin
    credentials: true, // Allow credentials like cookies
  })
);

// For parsing incoming frontend data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/employees', employeeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
