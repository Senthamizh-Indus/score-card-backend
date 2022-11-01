const express = require('express');
const passport = require('passport');
const router = express.Router();
const studentController = require('../controllers/student.controller');
const { ReqBodyValidator } = require('../middlewares/validate');

// Add student
router.route('/student').post(passport.authenticate('jwt', { session: false }), ReqBodyValidator('student'), studentController.addStudent);

// Get student details
router.route('/students').get(passport.authenticate('jwt', { session: false }), studentController.getStudents);

// Get student detail
router.route('/getStudent').get(studentController.getStudent);

// Update student
router.route('/updateStudent').put(studentController.updateStudent);

// Get student details
router.route('/deleteStudent').put(studentController.deleteStudent);

module.exports = router;