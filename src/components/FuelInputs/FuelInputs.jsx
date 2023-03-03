import React from 'react';
import { useHistory } from 'react-router-dom';



function FuelInputs() {
  const history = useHistory();




  return (
    <>
    <div className="container">
      <p>Info Page</p>
    </div>
    <button onClick={() => history.goBack()}>Back to Details</button>
    </>
  );
}

export default FuelInputs;
