import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';


function MainDetails() {
  const vehicle = useSelector((store) => store.vehicleReducer);
  const mpgStats = useSelector((store) => store.fuelReducer);
  const {id} = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  
  console.log('mpg stats from reducer', mpgStats)

  useEffect(() => {
    dispatch({ type: 'VEHICLE_DETAILS', payload: id });
  }, []);
 
  useEffect(() => {
    dispatch({ type: 'GET_FUEL_INPUTS', payload: id });
  }, []);

  const clickHandler = () => {
    history.push(`/FuelInputs/${id}`)
  }
  
  {/* {vehicle.map((vehicle, index) => { */}
      return (
        <div className="container">
          {/* 3 boxes for lest mpg/average mpg/best mpg */}


          {/* display vehicle that was selected */}
          <p>{vehicle.year} {vehicle.make} {vehicle.model}</p>

          {/* button that takes user to fill up inputs Page*/}
          <button onClick={clickHandler}>Add New Fill Up</button>

          {/* displays all mpg that has been logged */}
          {mpgStats.map((mpgList, index) => {
            return (
              <>
                <p>{mpgList.date} {mpgList.odometer} {mpgList.fuel_QTY} {mpgList.price_per_gallon}</p>
                <button>Edit Vehicle</button> <button>Delete Vehicle</button>
              </>
            )
            })}
        </div>
      )
 }



export default MainDetails;
