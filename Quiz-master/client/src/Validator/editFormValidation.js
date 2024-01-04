const Validator = require('validator');
const isEmpty =require('./isEmpty');
module.exports = function validateRegisterInput(data) {
  let errors ={};
  console.log(data)
  //Soemthing needs to be passed
  data.firstname=!isEmpty(data.firstname)?data.firstname:'';
  data.middlename=!isEmpty(data.middlename)?data.middlename:'';
  data.lastname=!isEmpty(data.lastname)?data.lastname:'';
  data.address=!isEmpty(data.address)?data.address:'';
  data.phone=!isEmpty(data.phone)?data.phone:'';
  data.mobile=!isEmpty(data.mobile)?data.mobile:'';
  data.country=!isEmpty(data.country)?data.country:''
  data.userType=!isEmpty(data.userType)?data.userType:''
  if(!Validator.isLength(data.firstname,{min:2,max:30}))
  errors.firstname="firstname must be between 2 and 30 characters!";


  if(Validator.isEmpty(data.address))
  errors.address="Address is required!";

  if(Validator.isEmpty(data.phone))
  errors.phone="phone is required!";

  if(Validator.isEmpty(data.mobile))
  errors.mobile="mobile no is required!";


  if(Validator.isEmpty(data.firstname))
  errors.fistname="fistname is required!";

  if(Validator.isEmpty(data.lastname))
  errors.lastname="lastname is required!";

  if(Validator.isEmpty(data.country))
  errors.lastname="country is required!";

  return{
    errors,
    isValid:isEmpty(errors)
  }
}
