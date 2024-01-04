const Validator = require("validator");
const isEmpty = require("./isEmpty");
module.exports = function resetPassword(data) {
  let errors = {};
  data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : "";
  data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword
    : "";
  
  if (Validator.isEmpty(data.newPassword))
    errors.newPassword = "New password is required!";
  if (Validator.isEmpty(data.confirmPassword))
    errors.confirmPassword = "Confirm Password is required!";
  if (data.confirmPassword !== data.newPassword) {
    errors.confirmPassword = "Confirm password must match password field!";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
