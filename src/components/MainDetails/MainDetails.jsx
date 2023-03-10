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
  const testArray = [5,2,8,34,7,6];
  const highestNumber = testArray.reduce((a,b) => Math.max(a,b), -Infinity);
  const lowestNumber = testArray.reduce((a,b) => Math.min(a,b), +Infinity);
  const [mpgCalc, setMPGCalc] = useState([]);
  // const [displayArray, setDisplayArray] = useState([]);


  useEffect(() => {
    dispatch({ type: 'VEHICLE_DETAILS', payload: id });
  }, [id]);
  
  useEffect(() => {
    dispatch({ type: 'GET_FUEL_INPUTS', payload: id });
  }, [id])
  
  
  // need to do math. likely need to take specific index id out of the array and then index-1 to get the previous 
  // id and subtract them to get the miles traveled between fill ups. then divide by gallons put in to find mpg 
  

  function fuelLogDeleteBtn(mpgList){
    dispatch({
      type: 'DELETE_FUEL_INPUT',
      payload: {mpgList, id}
    })
  }

  const clickHandler = () => {
    history.push(`/FuelInputs/${id}`)
  }
  
      return (
       <div className="container">
        

        
          <p>{highestNumber}</p>
          <p>{lowestNumber}</p>

          {/* 3 boxes for lest mpg/average mpg/best mpg */}
          <h3>Highest MPG: </h3>
          <h3>Average MPG: </h3>
          <h3>Lowest MPG: </h3>

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


            console.log('mpgList', mpgList.fuel_QTY, Number(currencyToNumber.replace(/[^0-9.-]+/g,"")));
            const costPerGallon = mpgList.fuel_QTY * Number(currencyToNumber.replace(/[^0-9.-]+/g,""));
            const numberToCurrency = USDollar.format(costPerGallon)
            console.log('display date for return', date);

         
            
            let mpg;
            let currentItem = array[index];
            let previousItem = array[index - 1];

            console.log('current item', currentItem);
            console.log('previous item', previousItem);

            if (index > 0) {
              mpg = (currentItem.odometer - previousItem.odometer) / currentItem.fuel_QTY;
            } else {
              mpg = 0;
            }
            
              return (              
              <div key={mpgList.id} className='fuelInputs' >
                <p>
                  {/* Current Item: {currentItem[index]} <br /> */}
                  MPG: {mpg} <br />
                  Date: {displayDate} <br />
                  Odometer: {mpgList.odometer} <br />
                  # of Gallons: {mpgList.fuel_QTY} <br />
                  Price Per Gallon: {mpgList.price_per_gallon} <br/>
                  Cost of Fill up: {numberToCurrency}</p>
                <button onClick={() => history.push(`/editFuelInput/${mpgList.id}`)}>Edit Record</button> <button onClick={() => {fuelLogDeleteBtn(mpgList)}}>Delete Record</button>
              </div>              
            )
            
              })}
        </div>
      )
 }



export default MainDetails;
