module.exports = {
  //FOR categories.js
  ADD_CATEGORY: "/",
  DELETE_CATEGORY: "/:slug",
  UPDATE_CATEGORY: "/:slug",
  ADD_PRODUCT: "/",
  DELETE_PRODUCT: "/delete/",
  UPDATE_PRODUCT: "/",
  GET_CATEGORIES: "/",
  GET_CATEGORY: "/:slug",
  GET_PRODUCT: "/:id",
  GET_PRODUCTS: "/",
  GET_SALES_ORDER: "/all",
  GET_NOTIFICATIONS: "/",
  ADD_PURCHASE_ORDER:"/",
  POST_SALES_ORDER: "/",
  GET_PURCHASE_DETAIL:"/purchaseOrderDetail",
  GET_PRODUCT_DETAIL_ACC_PURCHASE_ID:"/purchaseorder/:id",
  GET_ORDER_DETAILS: "/:id",
  DELETE_SALES_ORDER_DRAFT: "/:id",
  DELETE_PURCHASE_ORDER_DRAFT: "/:id",
  RECEIVED_PURCHASE_ORDER:"/received/:id",
  SAVE_ORDER: "/confirm/:id",
  CONFIRM_ORDER: "/confirm-order/:id",

  UPDATE_DRAFT: "/draft/:id",
  CANCEL_ORDER: "/cancel/:id",
  FULFILL_ORDER: "/fulfilled/:id",
  UPDATE_DELIVERY: "/delivery/:id"
};
