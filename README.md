# Employee Management App

Welcome to the Employee Management App 👨‍💼👩‍💼! This app allows users to efficiently manage a collection of employees. Users can add, edit, delete, and search employees by name, upload a profile image for each employee, and view detailed information about each employee.
---

## Testing and Dummy User
- **Email:** user1@gmail.com  
- **Password:** 123456

---

## Features

1. **Add, Edit, and Delete Employees:** Users can add new employees with name, email, mobile, designation, gender, course, and profile image. Each employee can be edited or deleted as needed.
2. **Search Functionality:** Easily search employees by name, email, or designation to quickly find relevant records.
3. **Profile Image Uploads:** Upload a profile image for each employee.
4. **User Authentication:** Secure access with login and signup capabilities.
5. **Responsive Design:** Seamless experience across devices.

---

## Getting Started

### Prerequisites

- **Node.js** (version 14 or higher recommended)
- **npm** (version 6 or higher)
- **MongoDB**: Required as the database for storing employee information

---

### Installation

Follow these steps to run the project locally:

1. Clone the repository:

   git clone https://github.com/Ayush76a/Employee_App

   cd Employee_App

3. Install backend dependencies and start the server:

   cd Backend

   npm install

   npm start

5. Install frontend dependencies and start the server:

   cd ../Frontend

   npm install

   npm start

7. Environment Variables:

   Create a .env file in the Backend directory.

   Add necessary environment variables for JWT secret, MongoDB URI,  PORT, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET.
   

## Folder Structure

### Backend
- `routes/`: API routes for employee and user management
- `models/`: Data models for employee and user.
- `middleware/`: Authentication middleware.
- `controllers/`: Logic for handling actions like adding, editing, and searching employees
### Frontend
- `components/`: Reusable UI components like EmployeeCard, Navbar, etc.
- `pages/`: Main pages like Employee List, Employee Creation, and Employee Edit.
- `services/`: api.js for managing API requests.
- `styles.css`: CSS files for every component.
- `assets/`: Contains necessary images like logo, default employee photo and the tailwind Css file.

## Usage

- **Add an Employee:** Fill in employee details in the Add Employee form, including name, email, mobile, designation, gender, course, and profile image.
- **View Details:** Click on an employee to see their full details.
- **Edit an Employee:** Update the information of an existing employee.
- **Delete an Employee:** Remove an employee from the system.
- **Search Employees:** Use the search bar to find employees by name, email, or designation.
- **User Authentication:** Login to access the app. New users can register.

## Technologies Used

- **Frontend:** 
  - React for building user interfaces
  - Axios for API requests
  - Tailwind CSS for styling components

- **Backend:**
  - Node.js and Express for creating the server and API endpoints
  - MongoDB for storing car and user data
  - JWT for secure user authentication
  - Cloudinary SDK and Multer for file upload

## Future Enhancements

1. **Add Sorting and Filtering Options:** Enable users to sort and filter employees based on attributes like designation or course.
2. **Notifications:** Notify users about upcoming deadlines or employee anniversaries.
3. **User Profiles:** Allow users to manage and update their profiles.

## Known Issues

1. **Error Handling:** Improve error messages and validations for a better user experience.
2. **Image Optimization:** Optimize profile image uploads for faster load times.
