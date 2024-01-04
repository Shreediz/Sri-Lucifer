const Validator = require('validator');
const isEmpty =require('./isEmpty');
module.exports = function validateAddUser(data) {
  let errors ={};
  //Soemthing needs to be passed
  data.firstname=!isEmpty(data.firstname)?data.firstname:'';
  data.middlename=!isEmpty(data.middlename)?data.middlename:'';
  data.lastname=!isEmpty(data.lastname)?data.lastname:'';
  data.password=!isEmpty(data.password)?data.password:'';
  data.email=!isEmpty(data.email)?data.email:'';
  data.address=!isEmpty(data.address)?data.address:'';
  data.phone=!isEmpty(data.phone)?data.phone:'';
  data.mobile=!isEmpty(data.mobile)?data.mobile:'';
  data.country=!isEmpty(data.country)?data.country:'';
  data.userType=!isEmpty(data.userType)?data.userType:'';
 
  
  if(!Validator.isLength(data.firstname,{min:2,max:30}))
  errors.firstname="Firstname must be between 2 and 30 characters!";

  if(Validator.isEmpty(data.email))
  errors.email="Email is required!"; 
  if(!Validator.isEmail(data.email))
  errors.email="Email must be valid!"; 


  if(Validator.isEmpty(data.address))
  errors.address="Address is required!";

  if(Validator.isEmpty(data.phone))
  errors.phone="Phone is required!";

  if(Validator.isEmpty(data.mobile))
  errors.mobile="Mobile no is required!";
  if(Validator.isEmpty(data.lastname))
  errors.lastname="Lastname is required!";

  if(Validator.isEmpty(data.password))
  errors.password="Password is required!";
  if(Validator.isEmpty(data.country))
  errors.country="Country is required!";
  if(Validator.isEmpty(data.userType))
  errors.userType="User type is required!";
  if(!Validator.isLength(data.password,{min:6,max:30}))
  errors.password="Password must be atleast 6 characters!";

  return{
    errors,
    isValid:isEmpty(errors)
  }
}