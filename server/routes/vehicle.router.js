const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  console.log('in GET request, vehicle.router')
  //switch to database
  let sampleData = [{year: 2018, make: 'Ford', model:'F150'}];
  res.send(sampleData);
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
  console.log('in the server POST, vehicle router')
  //TODO add data to the database
  res.sendStatus(201);
});

module.exports = router;
