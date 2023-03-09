import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

function EditFuelInputs() {
  const dispatch = useDispatch();
  const history = useHistory();
  const {id} = useParams();

  const [startDate, setStartDate] = useState(new Date());
  const [vehOdometer, setVehOdometer] = useState('');
  const [fuelGallons, setFuelGallons] = useState('');
  const [pricePerGallon, setPricePerGallon] = useState('');


  useEffect(() => {
    
    if (id) {
      console.log('inside edit fuel inputs id', id)
      axios.get(`/api/vehicle/fuelInput/${id}`)
      .then(response => {
          console.log('response fuelinput edit page', response.data);
            const mpgInfo = response.data;
            // setStartDate(mpgInfo.date);
            // setVehOdometer(mpgInfo.odometer);
            // setFuelGallons(mpgInfo.fuel_QTY);
            // setPricePerGallon(mpgInfo.price_per_gallon);
        }).catch(err => {
            console.log('error in get request in editvehicle', err)
            alert('error in get request inside EditVehicle')
        })
    }
}, [id])

function handleSubmit(event) {
    event.preventDefault();
    if(id) {
    dispatch({
        type: 'EDIT_FUEL_INPUT',
        payload: {startDate, vehOdometer, fuelGallons, pricePerGallon, id}, history
    });
}}

return (
    <>
    <button onClick={() => history.goBack()}>Back to Details</button>

    <div className="container">
      <h2>Edit Fuel Record</h2>

      <form className="editFuelInput" onSubmit={handleSubmit}>

        {/* input for date of fill up */}
        <p>Select Date of Fill Up</p><DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />

        {/* input for vehicle odometer at fill up */}
        <p>Odometer Reading </p><input value={vehOdometer} placeholder="Enter Odometer" onChange={(event) => setVehOdometer(event.target.value)} /><br />

        {/* input for number of gallons at fill up */}
        <p>Gallons Quantity</p><input value={fuelGallons} placeholder="Number of Gallons" onChange={(event) => setFuelGallons(event.target.value)} /><br />

        {/* input for price per gallon */}
        <p>Price Per Gallon</p><input value={pricePerGallon} placeholder="Price Per Gallon" onChange={(event) => setPricePerGallon(event.target.value)} /><br />

        {/* button to submit vehicle */}
        <button type="Submit">Submit</button>

      </form>
    </div>
    </>
  );

}

export default EditFuelInputs;