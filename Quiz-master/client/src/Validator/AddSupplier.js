const Validator = require("validator");
const isEmpty = require("./isEmpty");
module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
  data.lastname = !isEmpty(data.lastname) ? data.lastname : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.address = !isEmpty(data.address) ? data.address : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";
  data.mobile = !isEmpty(data.mobile) ? data.mobile : "";
  data.country = !isEmpty(data.country) ? data.country : "";
  if (Validator.isEmpty(data.address)) errors.address = "Address is required!";
  if (Validator.isEmpty(data.country)) errors.country = "Country is required!";
  if (Validator.isEmpty(data.email)) errors.email = "Email is required!";
  if (Validator.isEmpty(data.phone)) errors.phone = "Phone is required!";
  if (Validator.isEmpty(data.mobile)) errors.mobile = "Mobile no is required!";
  if (Validator.isEmpty(data.firstname))errors.firstname = "Firstname is required!";
  if (Validator.isEmpty(data.lastname))errors.lastname = "Lastname is required!";
  if(!Validator.isEmail(data.email))errors.email="Email must be valid!"; 

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
