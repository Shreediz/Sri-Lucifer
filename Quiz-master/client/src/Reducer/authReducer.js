const initialState={
user:{}
}
export function authReducer(state=initialState,action){
  switch(action.type){
    case "AUTH":
      return {...state,user:action.payload}
    case "LOGOUT":
      return {user:{}}
      default:
        return {...state}
  }
}