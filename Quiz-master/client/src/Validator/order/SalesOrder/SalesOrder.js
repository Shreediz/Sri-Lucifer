const Validator = require("validator");
const isEmpty = require("../../isEmpty");

export default function(data) {
  let errors = {};
  let productDetailsError = [];
  for (let product of data.productDetails) {
    let { quantity, availableQuantity } = product;
    if (+quantity === 0) {
      productDetailsError.push(
        `Quantity cannot be zero for "${product.productName}!"`
      );
      continue;
    }

    if (+quantity > +availableQuantity) {
      productDetailsError.push(
        `Specified quantity not available for "${product.productName}!"`
      );
    }
  }
  if (productDetailsError.length > 0) {
    errors.productDetails = productDetailsError;
  }
  data.customerName = !isEmpty(data.customerName) ? data.customerName : "";
  data.amount = !isEmpty(data.amount) ? data.amount : "";
  data.ip = !isEmpty(data.ip) ? data.ip : "";
  data.salesStatus = !isEmpty(data.salesStatus) ? data.salesStatus : "";
  data.salesOrderDate = !isEmpty(data.salesOrderDate)
    ? data.salesOrderDate
    : "";
  data.expectedShipmentDate = !isEmpty(data.expectedShipmentDate)
    ? data.expectedShipmentDate
    : "";
  if (Validator.isEmpty(data.customerName)) {
    errors.customerName = "Customer name is required";
  }
  if (Validator.isEmpty(data.expectedShipmentDate)) {
    errors.expectedShipmentDate = "Sales order id is required";
  }
  if (Validator.isEmpty("" + data.amount)) {
    errors.amount = "Amount cannot be empty";
  }

  if (Validator.isEmpty(data.salesStatus)) {
    errors.salesStatus = "Failed to set sales order status";
  }
  if (Validator.isEmpty(data.expectedShipmentDate)) {
    errors.expectedShipmentDate = "Expected shipment date is required";
  }
  if (Validator.isEmpty(data.salesOrderDate)) {
    errors.salesOrderDate = "Sales order date is required";
  }
  if (new Date(data.expectedShipmentDate) - new Date(data.salesOrderDate) < 0) {
    errors.salesOrderDate = "Shipment date cannot be before order date";
    errors.expectedShipmentDate = "Shipment date cannot be before Order date";
  }

  if (Validator.isEmpty(data.ip))
    errors.ip = "Something wrong while getting IP";

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
