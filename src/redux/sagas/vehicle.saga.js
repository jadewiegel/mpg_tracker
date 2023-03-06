import axios from 'axios';
import { useSelector } from 'react-redux';
import { put, takeEvery } from 'redux-saga/effects';


function* vehicleSaga(){
    // console.log('inside vehicleSaga')
    yield takeEvery('ADD_VEHICLE', addVehicle);
    yield takeEvery('GET_VEHICLE', getVehicle);
    yield takeEvery('VEHICLE_DETAILS', vehicleDetails);
    yield takeEvery('SET_FUEL_INPUTS', fuelInputs);
    yield takeEvery('GET_FUEL_INPUTS', getFuelInputs);
    // yield takeEvery('EDIT_VEHICLE', editVehicle);
    yield takeEvery('DELETE_VEHICLE', deleteVehicle);
};

//get saga for fuel inputs from server
function* getFuelInputs(action){
    console.log('inside getFuelInputs saga', action.payload)
    const id = action.payload;
        //axios get to fuelinputs from database
    try {
        const vehicles = yield axios.get(`/api/vehicle/fuelInput/${id}`);
        yield put({ type: 'DISPLAY_FUEL_INPUTS', payload: vehicles.data })
    } catch(err){
        console.log('error in SAGA GET', err);
        alert("issue with SAGA GET");
    }
}

//post saga to send data
function* fuelInputs(action){
    // console.log('inside fuelInputs Saga', action.payload);
    const id = action.payload.id;
    try {
        yield axios.post(`/api/vehicle/fuelInput/${id}`, {
                    date: action.payload.startDate,
                    odometer: action.payload.odometer,
                    fuel_QTY: action.payload.fuel_QTY,
                    price_per_gallon: action.payload.price_per_gallon
                })
                //put an action to get vehicles
                yield put({ type: 'VEHICLE_DETAILS', payload: id })
        } catch(err){
            console.log(err);
            alert("something went wrong");
        }
}

//get saga for specific vehicle 
function* vehicleDetails(action){
    // console.log('inside vehicleDetails generator function', action.payload);
    const id = action.payload;
        //axios get to vehicle from database
    try {
        const vehicles = yield axios.get(`/api/vehicle/details/${id}`);
        yield put({ type: 'DISPLAY_VEHICLE', payload: vehicles.data })
    } catch(err){
        console.log('error in SAGA GET', err);
        alert("issue with SAGA GET");
    }
}

//post saga to send vehicle
function* addVehicle(action){
    // console.log('inside addVehicle generator function', action.payload)
   try {
        yield axios.post('/api/vehicle', {
                    year: action.payload.vehYear,
                    make: action.payload.vehMake,
                    model: action.payload.vehModel
                })
                //put an action to get vehicles
                yield put({ type: 'GET_VEHICLE' })
        } catch(err){
            console.log(err);
            alert("something went wrong");
        }
};

//get saga for vehicle
function* getVehicle(){
    // console.log('in getVehicle')
    //axios get to vehicle from database
    try {
        const vehicles = yield axios.get('/api/vehicle');
        yield put({ type: 'SET_VEHICLE', payload: vehicles.data })
    } catch(err){
        console.log('error in SAGA GET', err);
        alert("issue with SAGA GET");
    }
    //pass data to the reducer with a put

};

// function* editVehicle(action){
//     //axios put to save in database
// };

// axios delete to database from database
function* deleteVehicle(action){
    const vehicle = action.payload.vehicle.id;
    try{
        yield axios.delete(`/api/vehicle/details/${vehicle}`);
        yield put({ type: 'GET_VEHICLE' })
    } catch(err){
        console.log('error in SAGA DELETE vehicle', err);
        alert('issue with SAGA DELETE vehicle.')
    }
};


export default vehicleSaga;





//this page will do get post edit delete for vehicle information.