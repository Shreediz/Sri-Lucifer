const Validator = require("validator");
const isEmpty = require("../isEmpty");

export default function validateAddProduct(data) {
  let errors = {};
  //Soemthing needs to be passed
  data.name = !isEmpty(data.name) ? data.name : "";
  data.ip = !isEmpty(data.ip) ? data.ip : "";
  data.costPrice = !isEmpty(data.costPrice) ? data.costPrice : "";
  data.measurementUnit = !isEmpty(data.measurementUnit)
    ? data.measurementUnit
    : "";
  data.marketPrice = !isEmpty(data.marketPrice) ? data.marketPrice : "";
  data.brandName = !isEmpty(data.brandName) ? data.brandName : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.maxDiscount = !isEmpty(data.maxDiscount) ? data.maxDiscount : "";
  data.category = !isEmpty(data.category) ? data.category : "";
  data.quantity = !isEmpty(data.quantity) ? data.quantity : "";
  if (new Date(data.expireDate) - new Date(data.manufactureDate) < 0) {
    errors.expireDate = "Expiry date cannot be before Manufacture Date";
    errors.manufactureDate = "Expiry date cannot be before Manufacture Date";
  }

  if (data.reorderLevel < 0)
    errors.reorderLevel = "Re-order level cannot be set to negative";
  if (data.reorderQuantity < 0)
    errors.reorderQuantity = "Re-order quantity cannot be set to negative";

  if (Validator.isEmpty(data.name))
    errors.name = "Product name cannot be empty.";

  if (Validator.isEmpty(data.ip))
    errors.ip = "There is something wrong while getting IP";

  if (Validator.isEmpty("" + data.costPrice))
    errors.costPrice = "Cost Price cannot be empty";
  if (data.costPrice < 0) errors.costPrice = "Cost Price Cannot be negative";
  if (Validator.isEmpty(data.measurementUnit))
    errors.measurementUnit = "Measurement Unit cannot be empty";

  if (Validator.isEmpty("" + data.marketPrice))
    errors.marketPrice = "Market price cannot be empty";
  if (data.marketPrice < 0)
    errors.marketPrice = "Market Price Cannot be negative";
  if (Validator.isEmpty("" + data.marketPrice))
    errors.marketPrice = "Market price cannot be empty";

  if (Validator.isEmpty("" + data.quantity))
    errors.quantity = "Quantity cannot be empty";
  if (data.quantity < 0) errors.quantity = "Quantity cannot be negative";
  if (Validator.isEmpty(data.brandName))
    errors.brandName = "Brand Name cannot be empty";

  if (Validator.isEmpty(data.status))
    errors.status = "Please select the showing status";

  if (Validator.isEmpty("" + data.maxDiscount))
    errors.maxDiscount = "Please specify the maximum discount";

  if (Validator.isEmpty(data.category)) errors.category = "Select category";

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
