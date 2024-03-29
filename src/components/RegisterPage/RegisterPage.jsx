import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';


function RegisterPage() {
  const history = useHistory();

  return (
    <div className='container'>
      <RegisterForm />

      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/login');
          }}
        >
          Login
        </button>
        <img src="https://daregreatlynow.com/wp-content/uploads/2021/03/no-gas.jpg" />

      </center>
    </div>
  );
}

export default RegisterPage;
