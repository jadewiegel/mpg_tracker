import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';




function* vehicleSaga(){
    yield takeEvery('ADD_VEHICLE', addVehicle)
    yield takeEvery('GET_VEHICLE', getVehicle)
    yield takeEvery('EDIT_VEHICLE', editVehicle)
    yield takeEvery('DELETE_VEHICLE', deleteVehicle)
};

function* addVehicle(action){
    //axios post to save in database
};

function* getVehicle(action){
    //axios get to save in database
};

function* editVehicle(action){
    //axios put to save in database
};

function* deleteVehicle(action){
    //axios delete to save in database
};


export default vehicleSaga;





//this page will do get post edit delete for vehicle information.