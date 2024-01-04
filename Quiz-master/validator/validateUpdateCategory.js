const Validator = require("validator");
const isEmpty = require("../../../intern_user_management/validator/isEmpty");
module.exports = function validateUpdateCategory(data) {
  let errors = {};
  //Soemthing needs to be passed
  data.name = !isEmpty(data.name) ? data.name : "";
  data.ip = !isEmpty(data.ip) ? data.ip : "";

  if (Validator.isEmpty(data.category))
    errors.name = "Category cannot be empty!";

  if (Validator.isEmpty(data.ip))
    errors.ip = "There is something wrong while getting IP";

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
