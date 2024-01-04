const initialState={
  check:false
}

export  function CheckReducer(state=initialState,action){
  switch(action.type){
    case "CHECKIN":
      return {...state,check:true};
    case "CHECKOUT":
      return {check:false};
      default:
        return {...state}
  }
}