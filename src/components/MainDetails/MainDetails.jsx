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

  
  useEffect(() => {
    dispatch({ type: 'VEHICLE_DETAILS', payload: id });
  }, [id]);
  
  useEffect(() => {
    dispatch({ type: 'GET_FUEL_INPUTS', payload: id });
  }, [id])
  

  
  // need to do math. likely need to take specific index id out of the array and then index-1 to get the previous 
  // id and subtract them to get the miles traveled between fill ups. then divide by gallons put in to find mpg
  
  

  function fuelLogDeleteBtn(mpgList){
    console.log('inside fuelLogDeleteBtn', mpgList.id);
    dispatch({
      type: 'DELETE_FUEL_INPUT',
      payload: {mpgList, id}
    })
  }

  const editFuelInputBtn = () => {
    history.push(`/FuelInputs/${id}`)
  }

  const clickHandler = () => {
    history.push(`/FuelInputs/${id}`)
  }
  
  {/* {vehicle.map((vehicle, index) => { */}
      return (
       <div className="container">
        
          {/* 3 boxes for lest mpg/average mpg/best mpg */}


          {/* display vehicle that was selected */}
          <h2>{vehicle.year} {vehicle.make} {vehicle.model}</h2>

          {/* button that takes user to fill up inputs Page*/}
          <button onClick={clickHandler}>Add New Fill Up</button>

          {/* displays all mpg that has been logged */}
          {mpgStats.map(mpgList => {
            return (              
              <div key={mpgList.id} className='fuelInputs' >
                <p>
                  MPG: <br />
                  Date: {mpgList.date} <br />
                  Odometer: {mpgList.odometer} <br />
                  # of Gallons: {mpgList.fuel_QTY} <br />
                  Price Per Gallon: {mpgList.price_per_gallon} <br/>
                  Cost of Fill up: </p>
                <button onClick={() => history.push(`/editFuelInput/${mpgList.id}`)}>Edit Record</button> <button onClick={() => {fuelLogDeleteBtn(mpgList)}}>Delete Record</button>
              </div>              
            )
          })}
        </div>
      )
 }



export default MainDetails;
