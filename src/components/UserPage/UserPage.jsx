import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import { useState, useEffect } from "react";
import {useHistory} from 'react-router-dom';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  
  const dispatch = useDispatch();
  
  const [vehYear, setVehYear] = useState('');
  const [vehMake, setVehMake] = useState('');
  const [vehModel, setVehModel] = useState('');
  const history = useHistory();
  const vehicles = useSelector((store) => store.vehicleReducer);

  function handleSubmit(event) {
      event.preventDefault();

      dispatch({
          type: 'ADD_VEHICLE',
          payload: {vehYear, vehMake, vehModel}
      })
      history.push('')
      console.log('vehicle information', vehYear, vehMake, vehModel);
  }

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>

      <h2>Select Your Vehicle</h2>

      {vehicles.map((vehicle, index) => {
        return (
          <p>{vehicle.year} {vehicle.make} {vehicle.model}</p>
        )
      })}
      {/* <p>{vehicle[0].year} {vehicle[0].make} {vehicle[0].model}</p> */}
      {/* if there are any vehicles that user has input display here */}


      <br />
      <form className="newVehicleInput" onSubmit={handleSubmit}>

        <h2>Input New Vehicle</h2>

        {/* input for vehicle year */}
        <input value={vehYear} placeholder="Vehicle Year" onChange={(event) => setVehYear(event.target.value)} /><br />

        {/* input for vehicle make */}
        <input value={vehMake} placeholder="Vehicle Year" onChange={(event) => setVehMake(event.target.value)} /><br />

        {/* input for vehicle model */}
        <input value={vehModel} placeholder="Vehicle Year" onChange={(event) => setVehModel(event.target.value)} /><br />

        {/* button to submit vehicle */}
        <button type="Submit">Submit</button>

      </form>
      <br />
      <br />
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;



//post route saves into database
//get route gets from database
//add axios.get to saga
//pass results to reducer
//display info from reducer in component