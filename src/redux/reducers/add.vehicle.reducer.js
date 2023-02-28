const vehicleReducer = (state = {}, action) => {
    switch (action.type) {
      case 'ADD_VEHICLE':
        return action.payload;
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default vehicleReducer;