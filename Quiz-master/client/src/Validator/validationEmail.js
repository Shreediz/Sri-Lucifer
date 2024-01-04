const Validator = require("validator");
const isEmpty = require("./isEmpty");
module.exports = function validationEmail(data) {
  let errors = {};
  data.newEmail = !isEmpty(data.newEmail) ? data.newEmail : "";

  if (Validator.isEmpty(data.newEmail)) errors.email = "NewEmail is required!";
  if(!Validator.isEmail(data.newEmail))
  errors.email="Email must be valid!"; 

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
