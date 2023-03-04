import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function FuelInputs() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const {id} = useParams();

  const [startDate, setStartDate] = useState(new Date());
  const [vehOdometer, setVehOdometer] = useState('');
  const [fuelGallons, setFuelGallons] = useState('');
  const [pricePerGallon, setPricePerGallon] = useState('');

  // useEffect(() => {
  //   dispatch({ type: 'VEHICLE_DETAILS', payload: id });
  // }, []);

  function handleSubmit(event) {
    event.preventDefault();

    const odometer = Number(vehOdometer);
    const fuel_QTY = Number(fuelGallons);
    const price_per_gallon = Number(pricePerGallon);

    console.log('fuel input console', startDate, odometer, fuel_QTY, price_per_gallon, id);
    dispatch({
        type: 'SET_FUEL_INPUTS',
        payload: {startDate, odometer, fuel_QTY, price_per_gallon, id}
    })
    console.log('fuel fill up info', startDate, odometer, fuel_QTY, price_per_gallon);
    history.push(`/mainDetails/${id}`)
  }

  return (
    <>
    <button onClick={() => history.goBack()}>Back to Details</button>
    <div className="container">
      <h2>Input Fuel Stop Info</h2>

    <form className="newFuelInput" onSubmit={handleSubmit}>


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

export default FuelInputs;
