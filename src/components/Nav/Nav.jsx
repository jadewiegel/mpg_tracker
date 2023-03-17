import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import {useHistory} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation';
import InfoIcon from '@material-ui/icons/Info';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(.5),
    fontSize: 15,
    fontWeight: 800, 
  },
}));

function Nav() {
  const classes = useStyles();
  const history = useHistory();
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">MPG Tracker <LocalGasStationIcon fontSize="large" /></h2>
      </Link>
      
      <div className='navMain'>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
          
        )}
        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Button color="default" className={classes.button} startIcon={<DirectionsCarIcon />} size="large" onClick={() => history.push("/user")}>
              Vehicles
            </Button>         
            <LogOutButton className="navLink" />
            
          </>
        )}
        
        <Button color="default" className={classes.button} startIcon={<InfoIcon />} size='large' onClick={() => history.push("/about")}>
          About
        </Button>
      </div>
    </div>
  );
}

export default Nav;
