const fuelReducer = (state = [], action) => {
    switch (action.type) {
      case 'DISPLAY_FUEL_INPUTS':
        return action.payload;
      case 'GET_UPDATED_FUEL_INPUTS':
        return action.payload;
      default:
        return state;
    }
  };
  

  export default fuelReducer;