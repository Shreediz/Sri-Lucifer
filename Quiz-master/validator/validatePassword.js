const Validator = require("validator");
const isEmpty = require("./isEmpty");
module.exports = function validatePassword(data) {
  console.log(data)
  let errors = {};
  data = !isEmpty(data) ? data : "";
  if (Validator.isEmpty(data)) errors = "Password is required!";

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
