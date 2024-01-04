export const auth=(data)=>({
  type:'AUTH',
  payload:data
})
export const authlogout=()=>({
  type:"LOGOUT"
})