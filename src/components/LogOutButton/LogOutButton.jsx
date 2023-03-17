import React from 'react';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    fontSize: 15,
    fontWeight: 800,
  },
}));

function LogOutButton(props) {
  const classes = useStyles();

  const dispatch = useDispatch();
  return (
    <Button color='default' size="Large" className={classes.button} startIcon={<ExitToAppIcon />}
      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      // className={props.className}
      onClick={() => dispatch({ type: 'LOGOUT' })}
    >
      Logout
    </Button>
  );
}

export default LogOutButton;
