const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema(
  {
    Id: { type: Number},
    Image: {
      type: String,
      validate: {
        validator: function (v) {
          return /\.(jpg|jpeg|png)$/i.test(v); // Only jpg/jpeg/png extensions are allowed
        },
        message: 'Only .jpg/.jpeg/.png files are allowed',
      },
    },
    Name: { type: String, required: true },
    Email: {
      type: String,
      required: true,
      unique: true, // Ensure Email is unique
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Email validation
    },
    Mobile: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/, // Numeric validation (10-digit mobile number)
    },
    Designation: {
      type: String,
      required: true,
      enum: ['HR', 'Manager', 'Sales'], // Restricted to these values
    },
    Gender: {
      type: String,
      required: true,
      enum: ['Male', 'Female'], // Restricted to Male (M) or Female (F)
    },
    Course: {
      type: [String], // Allows multiple values (array of strings)
      enum: ['MCA', 'BCA', 'BSC'], // Restricted to these options
    },
    CreatedDate: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Employee', employeeSchema);
