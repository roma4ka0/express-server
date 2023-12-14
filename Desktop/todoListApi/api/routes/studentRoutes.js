const express = require('express');
const router = express.Router();
const {
  listOfStudents,
  createStudent,
  deleteStudent,
  updateStudent,
  getStudentsWithWorkAndPhoto,
} = require('../controllers/studentController');

/**
 * @swagger
 * /student:
 *   get:
 *     summary: Get a list of students.
 *     description: Retrieve a list of all students in the database.
 *     responses:
 *       200:
 *         description: Successful response. Returns an array of student objects.
 *       500:
 *         description: Internal Server Error. Something went wrong.
 *   post:
 *     summary: Create a new student.
 *     description: Create a new student with the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               group:
 *                 type: string
 *               photo:
 *                 type: string
 *               mark:
 *                 type: number
 *               isDonePr:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Successful response. Returns the created student object.
 *       400:
 *         description: Bad Request. Invalid parameters.
 *       500:
 *         description: Internal Server Error. Something went wrong.
 */
router.route('/student').get(listOfStudents).post(createStudent);

/**
 * @swagger
 * /student/{id}:
 *   delete:
 *     summary: Delete a student by ID.
 *     description: Delete a student with the specified ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the student to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response. Returns the deleted student object.
 *       400:
 *         description: Bad Request. Invalid parameters.
 *       404:
 *         description: Not Found. Student not found.
 *       500:
 *         description: Internal Server Error. Something went wrong.
 *   patch:
 *     summary: Update a student by ID.
 *     description: Update a student with the specified ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the student to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               group:
 *                 type: string
 *               photo:
 *                 type: string
 *               mark:
 *                 type: number
 *               isDonePr:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Successful response. Returns the updated student object.
 *       400:
 *         description: Bad Request. Invalid parameters.
 *       404:
 *         description: Not Found. Student not found.
 *       500:
 *         description: Internal Server Error. Something went wrong.
 */
router.route('/student/:id').delete(deleteStudent).patch(updateStudent);

/**
 * @swagger
 * /student/foto:
 *   get:
 *     summary: Get students with work and photo.
 *     description: Retrieve a list of students with work and photo.
 *     responses:
 *       200:
 *         description: Successful response. Returns an array of student objects.
 *       500:
 *         description: Internal Server Error. Something went wrong.
 */
router.route('/student/foto').get(getStudentsWithWorkAndPhoto);

module.exports = router;