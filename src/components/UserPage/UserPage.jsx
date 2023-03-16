import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import { useState, useEffect } from "react";
import {useHistory} from 'react-router-dom';
import './UserPage.css';
import Button from '@material-ui/core/Button';



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
  }

  //clicking delete will run this delete function to remove vehicle.
  function vehDeleteBtn(vehicle){
    dispatch({
      type: 'DELETE_VEHICLE',
      payload: {vehicle}
    })
  }

  function vehEditBtn(vehicle){
    history.push(`/editVehicle/${vehicle.id}`)
  }

  return (
    <div className="container">
      {/* if there are any vehicles that user has input display here */}
      <h2>Welcome, {user.username}!</h2>

      <h2>Select Your Vehicle</h2>

      {vehicles.length > 0
        ? <> 
          {/* ^^this is only going to run once there is something in the array */}
          {vehicles.map((vehicle, index) => {
            return (
              <div key={vehicle.id} className='vehicleDisplay' >
                <h3 className='vehicleClicker' onClick = {() => history.push(`/mainDetails/${vehicle.id}`) }>{vehicle.year} {vehicle.make} {vehicle.model}</h3>
                <Button variant="contained" onClick={() => {vehEditBtn(vehicle)}}>Edit Vehicle</Button> <Button variant="contained" color="secondary" onClick={() => {vehDeleteBtn(vehicle)}}>Delete Vehicle</Button>
              </div>
            )
          })}
        </>
        : null} 
      {/* ^^this ": null" has the block do nothing if the array has nothing in it yet. */}

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
        <Button variant="contained" color="primary" type="Submit">Submit</Button>

      </form>
      <br />
      <br />
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
