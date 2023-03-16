import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './EditVehicle.css';
import Button from '@material-ui/core/Button';




function EditVehicle (){
    const user = useSelector((store) => store.user);
    
    const dispatch = useDispatch();
    
    const [vehYear, setVehYear] = useState('');
    const [vehMake, setVehMake] = useState('');
    const [vehModel, setVehModel] = useState('');
    const history = useHistory();
    const { id } = useParams();
    const vehicles = useSelector((store) => store.vehicleReducer);

    useEffect(() => {
        if (id) {
            axios.get(`/api/vehicle/details/${id}`)
            .then(response => {
                console.log('response from get in edit vehicle', response.data)
                const vehicle = response.data;
                setVehYear(vehicle.year);
                setVehMake(vehicle.make);
                setVehModel(vehicle.model);
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
            type: 'EDIT_VEHICLE',
            payload: {vehYear, vehMake, vehModel, id}, history
        });
    }}

        return (
            <>
            <div className='container'>
                <h2>Edit Vehicle Details</h2>
                <Button variant="contained" onClick={() => history.goBack()}>Back to Vehicles</Button><br /><br />

                    <form className="editVehicleInput" onSubmit={handleSubmit}>
            
                        {/* input for vehicle year */}
                        <input value={vehYear} placeholder={vehicles.year} onChange={(event) => setVehYear(event.target.value)} /><br />
                
                        {/* input for vehicle make */}
                        <input value={vehMake} placeholder={vehMake} onChange={(event) => setVehMake(event.target.value)} /><br />
                
                        {/* input for vehicle model */}
                        <input value={vehModel} placeholder={vehModel} onChange={(event) => setVehModel(event.target.value)} /><br />
                
                        {/* button to submit vehicle */}
                        <Button variant="contained" color="primary" type="Submit">Save</Button>
        
                    </form>
            </div>
          </>
        );
        
}

export default EditVehicle;