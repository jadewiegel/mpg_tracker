import axios from 'axios';
import { useSelector } from 'react-redux';
import { put, takeEvery } from 'redux-saga/effects';




function* vehicleSaga(){
    // console.log('inside vehicleSaga')
    yield takeEvery('ADD_VEHICLE', addVehicle);
    yield takeEvery('GET_VEHICLE', getVehicle);
    // yield takeEvery('EDIT_VEHICLE', editVehicle);
    // yield takeEvery('DELETE_VEHICLE', deleteVehicle);
};


//axios post to save in database
function* addVehicle(action){
    console.log('inside addVehicle generator function', action.payload)
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
    // const vehSubmit = (event) => {
    //     event.preventDefault();
    //         axios.post('/api/vehicle', {
    //         year: vehYear,
    //         make: vehMake,
    //         model: vehModel
    //     }).then(response => {
    //         console.log('post request success: ,', response)  
    //         // history.push('/mainDetails'); this will need to push to the "main details" page
         
    //     }).catch(err => {
    //         console.log('error in post request: ', err)
    //     });
    // }
};

function* getVehicle(action){
    console.log('in getVehicle')
    //axios get to vehicle from database
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