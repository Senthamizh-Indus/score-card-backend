const express = require('express');
const passport = require('passport');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { ReqBodyValidator } = require('../middlewares/validate');

// Add the admin
router.route('/signUp').post(ReqBodyValidator('admin'), adminController.signUpAdmin);

// Login for admin
router.route('/signIn').post(ReqBodyValidator('login'), adminController.login);

// // Get all the admins
// router.route('/admins').get(passport.authenticate('jwt', { session: false }), adminController.getAllAdmin);

module.exports = router;