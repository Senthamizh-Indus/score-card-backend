const express = require('express');
const passport = require('passport');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { ReqBodyValidator } = require('../middlewares/validate');

router.route('/signUp').post(ReqBodyValidator('admin'), adminController.signUpAdmin);

router.route('/signIn').post(ReqBodyValidator('login'), adminController.login);

router.route('/admins').get(passport.authenticate('jwt', { session: false }), adminController.getAllAdmin);

router.route('/addResult').post(passport.authenticate('jwt', { session: false }), ReqBodyValidator('result'), adminController.addResults);

router.route('/results').get(passport.authenticate('jwt', { session: false }), adminController.getResults);

module.exports = router;