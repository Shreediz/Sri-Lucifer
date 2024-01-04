const Validator = require("validator");
const isEmpty = require("./isEmpty");
module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
  data.middlename = !isEmpty(data.middlename) ? data.middlename : "";
  data.lastname = !isEmpty(data.lastname) ? data.lastname : "";
  data.password = !isEmpty(data.password) ? data.password.trim() : "";
  data.confirmPassword = !isEmpty(data.confirmPassword)
    ? data.confirmPassword.trim()
    : "";
  data.email = !isEmpty(data.email) ? data.email : "";
 
  data.address = !isEmpty(data.address) ? data.address : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";
  data.mobile = !isEmpty(data.mobile) ? data.mobile : "";
  data.userType = !isEmpty(data.userType) ? data.userType : "";
  data.shift = !isEmpty(data.shift) ? data.shift : "";
  if(data.userType==="user"&&Validator.isEmpty(data.shift))
  {
    console.log("Shift not selected")
    errors.shift="Please select a shift for the user";
  }

  data.country = !isEmpty(data.country) ? data.country : "";
  console.log(data.userType);

  if (Validator.isEmpty(data.address)) errors.address = "Address is required!";
  if (Validator.isEmpty(data.country)) errors.country = "Country is required!";
  if (Validator.isEmpty(data.userType))
    errors.userType = "User type is required!";

  if (data.confirmPassword !== data.password) {
    errors.confirmPassword = "Confirm password must match password field!";
  }
  if (Validator.isEmpty(data.confirmPassword))
    errors.confirmPassword = "Confirm password must match password field!";
  if (Validator.isEmpty(data.email)) errors.email = "Email is required!";

  if (Validator.isEmpty(data.address)) errors.address = "Address is required!";

  if (Validator.isEmpty(data.phone)) errors.phone = "Phone is required!";

  if (Validator.isEmpty(data.mobile)) errors.mobile = "Mobile no is required!";

  if (Validator.isEmpty(data.firstname))
    errors.firstname = "Firstname is required!";

  if (Validator.isEmpty(data.lastname))
    errors.lastname = "Lastname is required!";

  if (Validator.isEmpty(data.password))
    errors.password = "Password is required!";

  if (!Validator.isLength(data.password, { min: 6, max: 30 }))
    errors.password = "Password must be atleast 6 characters!";
    
  if(!Validator.isEmail(data.email))
    errors.email="Email must be valid!"; 

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
