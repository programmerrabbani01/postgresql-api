import asyncHandler from "express-async-handler";
import pool from "../config/db.js";
import queries from "../queries/queries.js";

/**
 * @desc  get all students
 * @route GET /api/v1/students
 * @access PUBLIC
 */
export const getAllStudents = asyncHandler(async (req, res) => {
  pool.query(queries.getAllStudents, (err, students) => {
    if (err) throw err;
    res.status(200).json(students.rows);
  });
});

/**
 * @desc  get a single student
 * @route GET /api/v1/students/:id
 * @access PUBLIC
 */
export const getASingleStudent = asyncHandler(async (req, res) => {
  const id = req.params.id;
  pool.query(queries.getASingleStudent, [id], (err, students) => {
    if (err) throw err;
    res.status(200).json(students.rows);
  });
});

/**
 * @desc  create a student
 * @route POST /api/v1/students
 * @access PUBLIC
 */
export const createAStudent = asyncHandler(async (req, res) => {
  const { name, email, age, dob } = req.body;

  //  check if the email exists
  //   const existingStudent = await pool.query(queries.getStudentByEmail, [email]);

  //   if (existingStudent.rows.length > 0) {
  //     return res.status(400).json({ message: "Email already exists" });
  //   }

  pool.query(queries.checkEmailExists, [email], (err, results) => {
    if (results.rows.length) {
      res.send("Email already exists");
    }

    // add student to database

    pool.query(
      queries.createStudent,
      [name, email, age, dob],
      (err, result) => {
        if (err) throw err;
        res.status(201).json({ message: "Student created successfully" });
      }
    );
  });
});

/**
 * @desc  create a student
 * @route POST /api/v1/students
 * @access PUBLIC
 */
export const deleteAStudent = asyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
    const results = await pool.query(queries.deleteAStudent, [id]);

    // Check if no rows were returned
    if (!results.rows.length) {
      return res.status(404).json({ message: "Student not found in database" });
    }

    // Success response
    res.status(200).json({
      message: "Student deleted successfully",
      student: results.rows[0],
    });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/**
 * For PUT
 */

/**
 * @desc  update a student
 * @route PUT /api/v1/students
 * @access PUBLIC
 */

// export const updateAStudent = asyncHandler(async (req, res) => {
//   const id = req.params.id;
//   const { name, email, age, dob } = req.body;

//   const { name} = req.body;

//   try {
//     // Check if the student exists
//     const student = await pool.query(queries.getASingleStudent, [id]);
//     if (!student.rows.length) {
//       return res.status(404).json({ message: "Student not found in database" });
//     }

//     // Update the student
//     const updatedStudent = await pool.query(queries.updateStudent, [
//       name,
//       id, // Ensure the ID is passed as the last parameter
//     ]);

//     res.status(200).json({
//       message: "Student updated successfully",
//       student: updatedStudent.rows[0], // Returning the updated student
//     });
//   } catch (err) {
//     console.error("Error updating student:", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

/**
 * For PATCH
 */

/**
 * @desc  update a student
 * @route PATCH /api/v1/students
 * @access PUBLIC
 */
export const updateAStudent = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { name, email, age, dob } = req.body;

  // Dynamically build the query
  const fields = [];
  const values = [];
  let counter = 1;

  if (name !== undefined) {
    fields.push(`name = $${counter}`);
    values.push(name);
    counter++;
  }
  if (email !== undefined) {
    fields.push(`email = $${counter}`);
    values.push(email);
    counter++;
  }
  if (age !== undefined) {
    fields.push(`age = $${counter}`);
    values.push(age);
    counter++;
  }
  if (dob !== undefined) {
    fields.push(`dob = $${counter}`);
    values.push(dob);
    counter++;
  }

  // If no fields are provided, return an error
  if (fields.length === 0) {
    return res.status(400).json({ message: "No fields provided for update" });
  }

  // Add the ID as the last parameter
  values.push(id);

  // Construct the SQL query
  const query = `UPDATE students SET ${fields.join(
    ", "
  )} WHERE id = $${counter} RETURNING *`;

  try {
    // Execute the query
    const result = await pool.query(query, values);

    if (!result.rows.length) {
      return res.status(404).json({ message: "Student not found in database" });
    }

    res.status(200).json({
      message: "Student updated successfully",
      student: result.rows[0],
    });
  } catch (err) {
    console.error("Error updating student:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
