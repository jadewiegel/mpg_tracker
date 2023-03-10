import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import './MainDetails.css';


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
  

  function fuelLogDeleteBtn(mpgList){
    dispatch({
      type: 'DELETE_FUEL_INPUT',
      payload: {mpgList, id}
    })
  }

  const clickHandler = () => {
    history.push(`/FuelInputs/${id}`)
  }

  function calculateMPG(item, index){
    if(index < mpgStats.length-1){
      let mpg = item.odometer;
      let mpgCurrent = item.odometer;
      let mpgPrevious = mpgStats[index+1].odometer;
      let gallons = item.fuel_QTY;
      mpg = Math.round((mpgCurrent - mpgPrevious) / gallons * 100)/100;
      return mpg;
    }else {
      return 0;
    }
  }
  
  function highestMPG(index){

    const mpgArray = [];
    for(let index=0;index<mpgStats.length-1; index++){
      let item = mpgStats[index];
      let mpg = 0;
      let mpgCurrent = item.odometer;
      let mpgPrevious = mpgStats[index+1].odometer;
      let gallons = item.fuel_QTY;
      mpg = Math.round((mpgCurrent - mpgPrevious) / gallons * 100)/100;
      mpgArray.push(mpg);
    }
    return mpgArray.reduce((a,b) => Math.max(a,b), -Infinity);
}

  function lowestMPG(){

    const mpgArray = [];
    for(let index=0;index<mpgStats.length-1; index++){
      let item = mpgStats[index];
      let mpg = 0;
      let mpgCurrent = item.odometer;
      let mpgPrevious = mpgStats[index+1].odometer;
      let gallons = item.fuel_QTY;
      mpg = Math.round((mpgCurrent - mpgPrevious) / gallons * 100)/100;
      mpgArray.push(mpg);
    }
    return mpgArray.reduce((a,b) => Math.min(a,b), +Infinity);
  }

  function averageMPG(){
    let mpg = 0;
    let count = 0;
    let mpgAVG = 0;
    for(let index=0;index<mpgStats.length-1; index++){
      let item = mpgStats[index];
      let mpgCurrent = item.odometer;
      let mpgPrevious = mpgStats[index+1].odometer;
      let gallons = item.fuel_QTY;
      mpg = Math.round((mpgCurrent - mpgPrevious) / gallons * 100)/100;
      count = mpg + count;
      mpgAVG = Math.round(count / mpgStats.length * 100) / 100;
      console.log('mpg average math', mpgAVG);
    }
    return mpgAVG;
  }

      return (
       <div className="container">
        

          {/* 3 boxes for lest mpg/average mpg/best mpg */}
          <h3 className='highMPG'>Highest MPG: {highestMPG()}</h3>
          <h3 className='averageMPG'>Average MPG: {averageMPG()}</h3>
          <h3 className='lowestMPG'>Lowest MPG: {lowestMPG()}</h3>

          {/* display vehicle that was selected */}
          <h2>{vehicle.year} {vehicle.make} {vehicle.model}</h2>

          {/* button that takes user to fill up inputs Page*/}
          <button onClick={clickHandler}>Add New Fill Up</button>

          {/* displays all mpg that has been logged */}
          {mpgStats.map((mpgList, index, array) => {
            const currencyToNumber = mpgList.price_per_gallon;
            const USDollar = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            });

          
            const mpgInfo = mpgList.date;
            const date = new Date(mpgInfo)
            const displayDate = (date.toLocaleDateString("en-US"))


            // console.log('mpgList', mpgList.fuel_QTY, Number(currencyToNumber.replace(/[^0-9.-]+/g,"")));
            const costPerGallon = mpgList.fuel_QTY * Number(currencyToNumber.replace(/[^0-9.-]+/g,""));
            const numberToCurrency = USDollar.format(costPerGallon)
            // console.log('display date for return', date);
            return(
              <div key={mpgList.id} className='fuelInputs' >
                <h4>
                  {/* Current Item: {currentItem[index]} <br /> */}
                  MPG: {calculateMPG(mpgList, index)}<br />
                  Odometer: {mpgList.odometer} <br />
                  # of Gallons: {mpgList.fuel_QTY} <br />
                  Cost of Fill up: {numberToCurrency} <br />
                  Price Per Gallon: {mpgList.price_per_gallon} <br/>
                  Date: {displayDate} <br />
                </h4>
                <button onClick={() => history.push(`/editFuelInput/${mpgList.id}`)}>Edit Record</button> <button onClick={() => {fuelLogDeleteBtn(mpgList)}}>Delete Record</button>
              </div>              
          )})}
            
            
        </div>
      )
 }



export default MainDetails;
