const Validator = require("validator");
const isEmpty = require("../isEmpty");
module.exports = function validateUpdateTemplate(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.body = !isEmpty(data.body) ? data.body : "";
  data.title = !isEmpty(data.title) ? data.title : "";
  data.hook = !isEmpty(data.hook) ? data.hook : "";
  if (Validator.isEmpty(data.name))
    errors.name = "Name is required!";
  if (Validator.isEmpty(data.body))
    errors.body = "Body is required!";
  if (Validator.isEmpty(data.title))
    errors.title = "Title for template is required!";
    if (Validator.isEmpty(data.hook))
    errors.hook = "Hook is required!";

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
