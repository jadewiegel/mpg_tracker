import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

function FuelInputs() {
  const user = useSelector((store) => store.user);
  const mpgStats = useSelector((store) => store.fuelReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  const {id} = useParams();

  const [startDate, setStartDate] = useState(new Date());
  const [vehOdometer, setVehOdometer] = useState('');
  const [fuelGallons, setFuelGallons] = useState('');
  const [pricePerGallon, setPricePerGallon] = useState('');

  useEffect(() => {
    
    if (id) {
      axios.get(`/api/vehicle/fuelInput/${id}`)
      .then(response => {
        console.log('get request for edit fuel inputs', response.data)
            const mpgInfo = response.data;
            setStartDate(mpgInfo.date);
            setVehOdometer(mpgInfo.odometer);
            setFuelGallons(mpgInfo.fuel_QTY);
            setPricePerGallon(mpgInfo.price_per_gallon);
        }).catch(err => {
            console.log('error in get request in editvehicle', err)
            alert('error in get request inside EditVehicle')
        })
    }
  }, [id])

  function handleSubmit(event) {
    event.preventDefault();

    const odometer = Number(vehOdometer);
    const fuel_QTY = Number(fuelGallons);
    const price_per_gallon = Number(pricePerGallon);

    dispatch({
        type: 'SET_FUEL_INPUTS',
        payload: {startDate, odometer, fuel_QTY, price_per_gallon, id}
    })
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
          <p>Odometer Reading </p><input value={vehOdometer} placeholder="Vehicle Odometer" onChange={(event) => setVehOdometer(event.target.value)} /><br />

          {/* input for number of gallons at fill up */}
          <p>Gallons Quantity</p><input defaultValue={fuelGallons} placeholder="Number of Gallons" onChange={(event) => setFuelGallons(event.target.value)} /><br />

          {/* input for price per gallon */}
          <p>Price Per Gallon</p><input defaultValue={pricePerGallon} placeholder="Price Per Gallon" onChange={(event) => setPricePerGallon(event.target.value)} /><br />

          {/* button to submit vehicle */}
          <button type="Submit">Submit</button>

        </form>
      </div>
    </>
  );
}

export default FuelInputs;
