const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// get request for all vehicles on the UserPage
router.get('/', (req, res) => {
  // GET route code here
  // console.log('in GET request, vehicle.router UserPage')
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

// get request for specific vehicle details on MainDetails page
router.get('/details/:id', (req, res) => {
  // console.log('in GET request, vehicle.router MainDetails', req.params.id);
  const query = `SELECT * FROM "vehicle_info" WHERE "id" = $1;`;
  pool.query(query, [req.params.id])
  .then( result => {
    // console.log('GET request result', result);
    res.send(result.rows[0]);
  }).catch(err => {
    console.log('Error getting vehicles', err);
    res.sendStatus(500);
  })
});

//get request from database for fuelinputs
router.get('/fuelInput/:id', (req, res) => {
    console.log('in get request for fuelInputs to be on Main Details', req.params.id);
    const query = `SELECT * FROM "fuel_info" WHERE "vehicle_id" = $1 ORDER BY "odometer" DESC;`;
    pool.query(query, [req.params.id])
  .then( result => {
    console.log('result from GET for fuel inputs', result);
    res.send(result.rows);
  }).catch(err => {
    console.log('error in GET for fuelInputs', err);
    res.sendStatus(500);
  })
});

//post route to add fuel input data to database
router.post('/fuelInput/:id', (req, res) => {
  // console.log('in the server POST for fuel inputs', req.body);
  // console.log('vehicle id', req.params.id);
  const insertFuelLog = `
  INSERT INTO "fuel_info" ("date", "odometer", "fuel_QTY", "price_per_gallon", "vehicle_id")
  VALUES ($1, $2, $3, $4, $5);`
  pool.query(insertFuelLog, [req.body.date, req.body.odometer, req.body.fuel_QTY, req.body.price_per_gallon, req.params.id])
  .then(result => {
    console.log('new fuel log', result);
    res.sendStatus(201);
  }).catch(err => {
    console.log(err);
    res.sendStatus(500);
  })
})

//post route to add vehicles to the database
router.post('/', (req, res) => {
  // console.log('in the server POST, vehicle router', req.body);
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

//delete route to delete vehicle from database
router.delete('/details/:id', (req, res) => {
  const queryText = `DELETE FROM "vehicle_info" WHERE "id" = $1;`;
  pool.query(queryText, [req.params.id])
  .then((result) => {
      console.log('in vehicle delete request', result)
      res.sendStatus(204);
  })
  .catch((error) => {
      console.log('error making query', error);
      res.sendStatus(500);
  });
});

// delete route to delete fuel input from database
router.delete('/fuelInput/:id', (req, res) => {
  const queryText = `DELETE FROM "fuel_info" WHERE "id" = $1;`;
  pool.query(queryText, [req.params.id])
  .then((result) => {
      console.log('in vehicle delete request', result)
      res.sendStatus(204);
  })
  .catch((error) => {
      console.log('error making query', error);
      res.sendStatus(500);
  });
});

// put route to edit vehicle info
router.put('/edit/:id', (req, res) => {
  console.log('put request req', req.body.vehYear, req.body.vehMake, req.body.vehModel, req.params.id)
  const queryText = `UPDATE "vehicle_info" SET "year" = $1, "make" = $2, "model" = $3 WHERE "id" = $4;`;
  pool.query(queryText, [req.body.vehYear, req.body.vehMake, req.body.vehModel, req.params.id])
  .then(result => {
    console.log('updated info', result);
    res.sendStatus(201);
  }).catch(err => {
    console.log(err);
    res.sendStatus(500);
  })
})

module.exports = router;
