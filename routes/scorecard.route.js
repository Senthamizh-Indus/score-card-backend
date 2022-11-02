const express = require('express');
const passport = require('passport');
const router = express.Router();
const scorecardController = require('../controllers/scorecard.controller');

// Add results of the student
router.route('/addResult').post(passport.authenticate('jwt', { session: false }), scorecardController.addResult);

// Get the results
router.route('/result/:id').get(passport.authenticate('jwt', { session: false }), scorecardController.getResult);

module.exports = router;