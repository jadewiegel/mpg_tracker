import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import './LoginPage.css';
// import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';


function LoginPage() {
  const history = useHistory();
  
  return (
    
    <div className='container'>
      <LoginForm />

      <center>
        <button
        variant="contained" color="primary"
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </button>
        <img src="https://daregreatlynow.com/wp-content/uploads/2021/03/no-gas.jpg" />
      </center>
    </div>
  );
}

export default LoginPage;
