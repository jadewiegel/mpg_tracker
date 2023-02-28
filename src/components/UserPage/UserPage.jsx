import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>

      <h2>Select Your Vehicle</h2>

      {/* if there are any vehicles that user has input display here */}

      <br />
      <form className="newVehicleInput">
      {/* input for vehicle year */}
      <input placeholder="Vehicle Year"></input><br />
      {/* input for vehicle make */}
      <input placeholder="Vehicle Make"></input><br />
      {/* input for vehicle model */}
      <input placeholder="Vehicle Model"></input><br />
      {/* button to submit vehicle */}
      <button>Submit</button>
      </form>
      <br />
      <br />
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
