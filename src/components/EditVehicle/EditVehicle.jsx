import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';

function EditVehicle (){
    const user = useSelector((store) => store.user);
    
    const dispatch = useDispatch();
    
    const [vehYear, setVehYear] = useState('');
    const [vehMake, setVehMake] = useState('');
    const [vehModel, setVehModel] = useState('');
    const history = useHistory();
    const vehicles = useSelector((store) => store.vehicleReducer);


  
    function handleSubmit(event) {
        event.preventDefault();
  
        dispatch({
            type: 'ADD_VEHICLE',
            payload: {vehYear, vehMake, vehModel}
        })
        history.push('')
    }

        return (
            <>
                <h2>Edit Vehicle Page</h2>
                <form className="newVehicleInput" onSubmit={handleSubmit}>
        
                {/* input for vehicle year */}
                <input value={vehYear} placeholder={vehicles.year} onChange={(event) => setVehYear(event.target.value)} /><br />
        
                {/* input for vehicle make */}
                <input value={vehMake} placeholder={vehMake} onChange={(event) => setVehMake(event.target.value)} /><br />
        
                {/* input for vehicle model */}
                <input value={vehModel} placeholder={vehModel} onChange={(event) => setVehModel(event.target.value)} /><br />
        
                {/* button to submit vehicle */}
                <button type="Submit">Submit</button>
        
            </form>
          </>
          );
        
}

export default EditVehicle;