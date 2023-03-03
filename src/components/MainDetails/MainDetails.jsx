import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";


function MainDetails() {
  const vehicle = useSelector((store) => store.vehicleReducer);
  const {id} = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'VEHICLE_DETAILS', payload: id });
  }, []);

    {/* {vehicle.map((vehicle, index) => { */}
      return (
        <div className="container">
          <p>{vehicle.year} {vehicle.make} {vehicle.model}</p>
        </div>
      )
 }



export default MainDetails;
