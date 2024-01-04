const Validator = require("validator");
const isEmpty = require("../../isEmpty");
module.exports = function validatePartialDelivery(data) {
  console.log(data.productDetails)
  let errors = {};
  let productList = [];
  for (let product of data.productDetails) {
    let { ReceivedQuantity, quantity } = product;
    if (+quantity === +ReceivedQuantity) {
      continue;
    }
    if (+ReceivedQuantity < 0) {
      productList.push(
        `Received Quantity cannot be negative for "${product.productName}" `
      );
    }
    let totalReceived = +ReceivedQuantity;
    if (totalReceived > +quantity) {
      productList.push(
        `Received Quantity exceeds ordered quantity for "${product.productName}" `
      );
    }
  }
  if (productList.length > 0) {
    errors.productReceived = productList;
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
