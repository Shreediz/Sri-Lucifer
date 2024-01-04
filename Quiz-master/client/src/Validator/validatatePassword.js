const Validator = require("validator");
const isEmpty = require("./isEmpty");
module.exports = function validatePassword(data) {
  let errors = {};
  data.password = !isEmpty(data.password) ? data.password : "";
console.log("in validation Password")
  if (Validator.isEmpty(data.password)) errors = "password is required!";
console.log(errors)
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
