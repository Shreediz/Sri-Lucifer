const Validator = require("validator");
const isEmpty = require("../../isEmpty");

export default function purchaseOrder(data) {
  console.log("data in validation of", data);
  let errors = {};
  //Soemthing needs to be passed
  let productDetailsError = [];
  for (let product of data.productDetails) {
    let { quantity } = product;
    console.log("quantity",quantity)
    if (+quantity ===0) {
      productDetailsError.push(
        `Quantity cannot be zero for ${product.product}!!`
      );
      continue;
    }
  }
  console.log(productDetailsError.length)  
  if (productDetailsError.length > 0) {
    errors.productDetails = productDetailsError;
  }

  data.supplierName = !isEmpty(data.supplierName) ? data.supplierName : "";
  data.orderDate = !isEmpty(data.orderDate) ? data.orderDate : "";
  data.expectedDate = !isEmpty(data.expectedDate) ? data.expectedDate : "";

  if (new Date(data.expectedDate) - new Date(data.orderDate) < 0) {
    errors.orderDate = "Expected Delively date cannot be before the order date";
    errors.expectedDate =
      "Expected Delively date cannot be before the order date";
  }

  if (Validator.isEmpty(data.supplierName))
    errors.supplierName = "Supplier name cannot be empty.";

  if (Validator.isEmpty(data.orderDate)) {
    errors.orderDate = "order Date cannot be left empty";
  }

  if (Validator.isEmpty(data.expectedDate)) {
    errors.expectedDate = "Expected Date cannot be left empty";
  }

  console.log(errors);

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
