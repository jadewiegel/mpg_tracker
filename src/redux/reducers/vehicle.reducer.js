const vehicleReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_VEHICLE':
        return action.payload;
      case 'DISPLAY_VEHICLE':
        return action.payload;
      // case 'DISPLAY_FUEL_INPUTS':
      //   return action.payload;
      default:
        return state;
    }
  };
  

  export default vehicleReducer;