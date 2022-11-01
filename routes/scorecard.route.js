const express = require('express');
const passport = require('passport');
const router = express.Router();
const scorecardController = require('../controllers/scorecard.controller');

// Add results of the student
router.route('/addResult').post(passport.authenticate('jwt', { session: false }), scorecardController.addResult);

// Get the results
router.route('/results').get(passport.authenticate('jwt', { session: false }), scorecardController.getResults);

// Get the results
router.route('/result/:id').get(scorecardController.getResult);

// Update the result
router.route('/updateResult').put(scorecardController.updateResult);

// Delete the result
router.route('/deleteResult').put(scorecardController.deleteResult);

module.exports = router;