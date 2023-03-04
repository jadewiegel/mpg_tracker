import axios from 'axios';
import { useSelector } from 'react-redux';
import { put, takeEvery } from 'redux-saga/effects';


function* vehicleSaga(){
    // console.log('inside vehicleSaga')
    yield takeEvery('ADD_VEHICLE', addVehicle);
    yield takeEvery('GET_VEHICLE', getVehicle);
    yield takeEvery('VEHICLE_DETAILS', vehicleDetails);
    yield takeEvery('SET_FUEL_INPUTS', fuelInputs);
    // yield takeEvery('EDIT_VEHICLE', editVehicle);
    // yield takeEvery('DELETE_VEHICLE', deleteVehicle);
};

function* fuelInputs(action){
    console.log('inside fuelInputs Saga', action.payload);
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

//axios post to save in database
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

// function* deleteVehicle(action){
//     //axios delete to database from database
// };


export default vehicleSaga;





//this page will do get post edit delete for vehicle information.