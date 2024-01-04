const Validator = require("validator");
const isEmpty = require("./isEmpty");

export default data => {
  let errors = {};
  data.category = !isEmpty(data.category) ? data.category : "";
  data.passmarks = !isEmpty(data.passmarks) ? data.passmarks : "";
  data.fullmarks = !isEmpty(data.fullmarks) ? data.fullmarks : "";
  data.status = !isEmpty(data.status) ? data.status : "";

  console.log("data",data.passmarks)
  if (Validator.isEmpty(data.category))
    errors.category = "Category is required";

    if (Validator.isEmpty(data.passmarks))
    errors.passmarks = "Passmarks is required";

    if (Validator.isEmpty(data.fullmarks)){
      errors.fullmarks = "Full Marks is required";
    }

    if (Validator.isEmpty(data.status))
    errors.status = "Status is required";

    if(!Validator.isNumeric(data.fullmarks)){
      errors.fullmarks = "Full Marks should be number"
    }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
