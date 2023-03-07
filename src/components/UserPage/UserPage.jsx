import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import { useState, useEffect } from "react";
import {useHistory} from 'react-router-dom';


function UserPage() {
  const user = useSelector((store) => store.user);
  
  const dispatch = useDispatch();
  
  const [vehYear, setVehYear] = useState('');
  const [vehMake, setVehMake] = useState('');
  const [vehModel, setVehModel] = useState('');
  const history = useHistory();
  const vehicles = useSelector((store) => store.vehicleReducer);

  useEffect(() => {
    dispatch({ type: 'GET_VEHICLE' });
  }, [dispatch]);

  //after hitting submit run this to save new vehicle info.
  function handleSubmit(event) {
      event.preventDefault();

      dispatch({
          type: 'ADD_VEHICLE',
          payload: {vehYear, vehMake, vehModel}
      })
      history.push('')
      console.log('vehicle information', vehYear, vehMake, vehModel);
  }

  //clicking delete will run this delete function to remove vehicle.
  function vehDeleteBtn(vehicle){
    console.log('inside vehDeleteBtn', vehicle.id);

    dispatch({
      type: 'DELETE_VEHICLE',
      payload: {vehicle}
    })
  }

  return (
    <div className="container">
      {/* if there are any vehicles that user has input display here */}
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>

      <h2>Select Your Vehicle</h2>

    {vehicles.length > 0
      ? <> 
      {/* ^^this is only going to run once there is something in the array */}
      {vehicles.map((vehicle, index) => {
        return (
          <div key={vehicle.id} className='vehicleDisplay'>
            <p onClick = {() => history.push(`/mainDetails/${vehicle.id}`) }>{vehicle.year} {vehicle.make} {vehicle.model}</p>
            <button>Edit Vehicle</button> <button onClick={() => {vehDeleteBtn(vehicle)}}>Delete Vehicle</button>
          </div>
        )
      })}
      </>
      : null} 
      {/* ^^this has the block do nothing if the array has nothing in it yet. */}

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
