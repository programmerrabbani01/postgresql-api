// Get all students
const getAllStudents = "SELECT * FROM students";

// Get a single student by ID
const getASingleStudent = "SELECT * FROM students WHERE id = $1";

// Check if an email exists
const checkEmailExists = "SELECT s FROM students s WHERE s.email = $1";

// Create a new student
const createStudent =
  "INSERT INTO students (name, email, age, dob) VALUES ($1, $2, $3, $4)";

// Delete a student
const deleteAStudent = "DELETE FROM students WHERE id = $1 RETURNING *";

// Update a student
const updateStudent =
  "UPDATE students SET name = $1, email = $2, age = $3, dob = $4 WHERE id = $5 RETURNING *";

export default {
  getAllStudents,
  getASingleStudent,
  checkEmailExists,
  createStudent,
  deleteAStudent,
  updateStudent,
};
