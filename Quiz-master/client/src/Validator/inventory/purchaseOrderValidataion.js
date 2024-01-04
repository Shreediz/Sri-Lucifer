const Validator = require("validator");
const isEmpty = require("../isEmpty");

export default function purchaseOrderValidataion(data) {
  let errors = {};
  //Soemthing needs to be passed
  data.supplier = !isEmpty(data.supplier) ? data.supplier : "";
  data.orderDate = !isEmpty(data.orderDate) ? data.orderDate : "";
  data.expectedDate = !isEmpty(data.expectedDate) ? data.expectedDate : "";
 
  if (new Date(data.expectedDate ) - new Date(data.orderDate) < 0) {
    errors.orderDate = "Expected Delively date cannot be before the order date";
    errors.expectedDate = "Expected Delively date cannot be before the order date";
  }
console.log("inside purcaseOrderVCalidation")

  if (Validator.isEmpty(data.supplier))
    errors.supplier = "Supplier name cannot be empty.";

  if(Validator.isEmpty(data.orderDate)){
    errors.orderDate= "order Date cannot be left empty";
  }


  if(Validator.isEmpty(data.expectedDate)){
    errors.expectedDate= "Expected Date cannot be left empty"
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
}
