const Validator = require("validator");
const isEmpty = require("./isEmpty");

export default function validateAddQuestion(data) {
  let errors = {};
  //Soemthing needs to be passed
  data.ip = !isEmpty(data.ip) ? data.ip : "";
  data.question = !isEmpty(data.question) ? data.question : "";
  data.category = !isEmpty(data.category) ? data.category : "";

  // for (let ans of data.answer){
  //   let {anss} = ans;
  //   anss = !isEmpty(anss) ? anss : "";
  // }

  
  if(Validator.isEmpty(data.question)) errors.question = "Question is required";
  if (Validator.isEmpty(data.category)) errors.category = "Select category";

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
