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
  // let sampleData = [{year: 2018, make: 'Ford', model:'F150'}];
  const query = `SELECT * FROM "vehicle_info" WHERE "user_id" = $1 ORDER BY "id" ASC`;
  pool.query(query, [req.user.id])
  .then( result => {
    console.log('GET request result', result);
    res.send(result.rows);
  }).catch(err => {
    console.log('Error getting vehicles', err);
    res.sendStatus(500);
  })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
  //TODO add data to the database
  console.log('in the server POST, vehicle router', req.body);
  const insertVehicle = `
  INSERT INTO "vehicle_info" ("year", "make", "model", "user_id")
  VALUES ($1, $2, $3, $4);`

  pool.query(insertVehicle, [req.body.year, req.body.make, req.body.model, req.user.id])
  .then(result => {
    console.log('new vehicle', result);
    res.sendStatus(201);
  }).catch(err => {
    console.log(err);
    res.sendStatus(500);
  });
})
module.exports = router;
