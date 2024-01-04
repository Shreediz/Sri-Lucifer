const Validator = require("validator");
const isEmpty = require("./isEmpty");
module.exports = function changePassword(data) {
  let errors = {};
  data.hook = !isEmpty(data.hook.trim()) ? data.hook : "";
  data.body = !isEmpty(data.body.trim()) ? data.body : "";
  data.title = !isEmpty(data.title.trim()) ? data.title : "";
  data.name = !isEmpty(data.name.trim()) ? data.name : "";
  
  if (Validator.isEmpty(data.hook))
    errors.hook = "Hook is required!";
  if (Validator.isEmpty(data.body))
    errors.body = "Email Template cannot be empty!";
  if (Validator.isEmpty(data.title))
    errors.title = "Email Title is required!";
  if (Validator.isEmpty(data.name)) 
    errors.name = "Name of template cannot be empty!";
  

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
