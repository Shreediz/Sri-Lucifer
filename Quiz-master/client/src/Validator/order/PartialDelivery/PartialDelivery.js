const isEmpty = require("../../isEmpty");
module.exports = function validatePartialDelivery(data) {
  let errors = {};
  let productList = [];
  for (let product of data.productDetails) {
    if (+product.quantity === +product.deliveredQuantity) {
      continue;
    }
    let totalDelivery = product.deliveredQuantity + product.newQuantity;
    if (totalDelivery > product.quantity) {
      productList.push(
        `Delivery Quantity exceeds ordered quantity for "${product.productName}" `
      );
    }
  }

  if (productList.length > 0) {
    errors.productDelivery = productList;
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
