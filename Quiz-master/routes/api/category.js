const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const pool = require("../../config/pool").pool;
const Actions = require("../../config/messages").Actions;
const Roles = require("../../config/roles");
const SLUGS = require("../../config/slugs");

const Errors = require("../../config/messages").Errors;
const Success = require("../../config/messages").Success;
const databaseUtility = require("../../utility/databaseUtility");
const checkPermission = require("../../utility/checkPermission");
const ROUTES = require("../../config/route");
var moment = require("moment");
const validateAddCategory = require("../../validator/validateAddCategory");
const validateUpdateCategory = require("../../validator/validateUpdateCategory");
// const InventoryUtility= require('../../utility/inventorylog');
getName = async email => {
  let statement = `SELECT CONCAT(first_name,' ',last_name) AS fullName FROM user_table WHERE email=?`;
  return await pool
    .execute(statement, [email])
    .then(results => {
      return {
        fullName: results[0][0].fullName
      };
    })
    .catch(err => {
      console.log(err);
    });
};

addCategory = async ({ category, addedDate, email,fullmarks,passmarks,status }) => {
  let slug = category
    .toLowerCase()
    .split(" ")
    .join("-");

  let statement =
    "INSERT INTO category (c_name,slug,added_by,added_date,status,full_mark,pass_mark) VALUES (?,?,?,?,?,?,?);";
  return pool
    .execute(statement, [category, slug, email, addedDate,status, fullmarks ,passmarks ])
    .then(results => {
      if (results[0].affectedRows > 0) {
        return {
          categoryAdded: true
        };
      }
    })
    .catch(err => {
      return { categoryAdded: false, err };
    });
};

updateCategory = async ({ category, updatedDate, email, slug }) => {
  let newSlug = category
    .toLowerCase()
    .split(" ")
    .join("-");
  let statement =
    "UPDATE category SET c_name=?,slug=?,updated_date=?,updated_by=? WHERE slug=?";
  return await pool
    .execute(statement, [category, newSlug, updatedDate, email, slug])
    .then(results => {
      if (results[0].affectedRows > 0) {
        return { isUpdated: true };
      } else {
        return { isUpdated: false };
      }
    })
    .catch(err => {
      return { isUpdated: false, err };
    });
};
getAllCategories = async () => {
  let statement = `SELECT c_name AS name,slug FROM category;`;
  return await pool
    .execute(statement)
    .then(results => {
      return results[0];
    })
    .catch(err => {
      return { type: "error", message: "Failed to fetch categories." };
    });
};
getCategoryBySlug = async slug => {
  let statement = `SELECT c_name AS name FROM category WHERE slug=?;`;
  return await pool
    .execute(statement, [slug])
    .then(results => {
      return results[0][0].name;
    })
    .catch(err => {
      return { type: "error", message: "Failed to fetch categories." };
    });
};
deleteCategoryBySlug = async slug => {
  let statement = `DELETE FROM category WHERE slug=?;`;
  return await pool
    .execute(statement, [slug])
    .then(results => {
      if (results[0].affectedRows > 0)
        return { isDeleted: true, message: Success.DELETE_CATEGORY_SUCCESSFUL };
      else
        return {
          isDeleted: false,
          message: Errors.DELETE_CATEGORY_FAILED
        };
    })
    .catch(err => {
      return { type: "error", message: "Failed to fetch categories." };
    });
};
//@route POST api/inventory/categories
//@desc Retrieve all categories
//@access Private
router.get(
  ROUTES.GET_CATEGORIES,
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let isAuthorized =
      (await checkPermission(req.user.id, SLUGS.MANAGE_CATEGORIES)) ||
      (await checkPermission(req.user.id, SLUGS.ADD_PRODUCTS));
    if (!isAuthorized) {
      return res.json({
        type: "error",
        message: Errors.UNAUTHORIZED
      });
    }
    let response = await getAllCategories();
    return res.json(response);
  }
);

//@route POST api/inventory/categories
//@desc Retrieve all categories
//@access Private
router.get(
  ROUTES.GET_CATEGORY,
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let isAuthorized = await checkPermission(
      req.user.id,
      SLUGS.MANAGE_CATEGORIES
    );
    if (!isAuthorized) {
      return res.json({
        type: "error",
        message: Errors.UNAUTHORIZED
      });
    }
    let slug = req.params.slug;
    if (!slug) {
      return res.json({ type: "error", message: "Failed to load category" });
    }

    let response = await getCategoryBySlug(slug);
    return res.json(response);
  }
);

//@route api/inventory/catory
//add the catogory item
router.post(
  ROUTES.ADD_CATEGORY,
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let isAuthorized = await checkPermission(req.user.id, SLUGS.ADD_CATEGORIES);
    if (!isAuthorized) {
      return res.json({
        type: "error",
        message: Errors.UNAUTHORIZED
      });
    }
    const { errors, isValid } = validateAddCategory(req.body);
    console.log("category.js server side",req.body)
    if (isValid) {
      let { email } = req.user;
      let { category, ip, status , fullmarks, passmarks } = req.body;
      let addedDate = new Date();
      addedDate = moment(addedDate).format("YYYY-MM-DD hh:mm:ss");
      category = category.trim();
      let { categoryAdded, err } = await addCategory({
        category,
        addedDate,
        email,
        status,
        fullmarks,
        passmarks
      });
      if (categoryAdded) {
        res.json({ type: "success", message: Success.ADD_CATEGORY_SUCCESSFUL });
        databaseUtility.logAtomic(email, Actions.ADD_CATEGORY_SUCCESSFUL, ip);
      } else {
        if (err && err.code === "ER_DUP_ENTRY") {
          let errors = {};
          errors.category = Errors.CATEGORY_DUPLICATE;
          res.status(400).json({ errors });
          databaseUtility.logAtomic(email, Actions.CATEGORY_DUPLICATE, ip);
        } else {
          res.json({ type: "error", message: Errors.ADD_CATEGORY_FAILED });
          databaseUtility.logAtomic(email, Actions.ADD_CATEGORY_FAILED, ip);
        }
      }
    } else {
      res.json({ errors });
    }
  }
);
//@route PUT api/inventory/category/:slug
//@desc Update category
//@access Private
router.put(
  ROUTES.UPDATE_CATEGORY,
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let isAuthorized = await checkPermission(
      req.user.id,
      SLUGS.MANAGE_CATEGORIES
    );
    if (!isAuthorized) {
      return res.json({
        type: "error",
        message: Errors.UNAUTHORIZED
      });
    }
    const { errors, isValid } = validateUpdateCategory(req.body);
    if (isValid) {
      let slug = req.params.slug;

      let { email } = req.user;
      let { category, ip } = req.body;
      // let { fullName } = await getName(email);
      let updatedDate = new Date();
      updatedDate = moment(updatedDate).format("YYYY-MM-DD hh:mm:ss");

      let { isUpdated, err } = await updateCategory({
        category,
        updatedDate,
        email,
        slug
      });
      if (isUpdated) {
        res.json({
          type: "success",
          message: Actions.UPDATE_CATEGORY_SUCCESSFUL
        });
        databaseUtility.logAtomic(
          email,
          Actions.UPDATE_CATEGORY_SUCCESSFUL,
          ip
        );
      } else {
        if (err && err.code === "ER_DUP_ENTRY") {
          res.json({ type: "error", message: Errors.CATEGORY_DUPLICATE });
          databaseUtility.logAtomic(email, Actions.CATEGORY_DUPLICATE, ip);
        } else {
          res.json({ type: "error", message: Errors.UPDATE_CATEGORY_FAILED });
          databaseUtility.logAtomic(email, Actions.UPDATE_CATEGORY_FAILED, ip);
        }
      }
    } else {
      res.json({ errors });
    }
  }
);
//@route DELETE api/inventory/category/:slug
//@desc Delete category
//@access Private
router.delete(
  ROUTES.DELETE_CATEGORY,
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let isAuthorized = await checkPermission(
      req.user.id,
      SLUGS.MANAGE_CATEGORIES
    );
    if (!isAuthorized) {
      return res.json({
        type: "error",
        message: Errors.UNAUTHORIZED
      });
    }
    let { slug } = req.params;
    if (!slug) {
      return res
        .status(400)
        .json({ type: "error", message: Errors.DELETE_CATEGORY_FAILED });
    }
    let { email } = req.user;
    let { ip } = req.body;
    let { isDeleted, err } = await deleteCategoryBySlug(slug);
    console.log(1, isDeleted);
    if (isDeleted) {
      res.json({
        type: "success",
        message: Success.DELETE_CATEGORY_SUCCESSFUL
      });
      databaseUtility.logAtomic(email, Actions.DELETE_CATEGORY + slug, ip);
    } else {
      res.json({ type: "error", message: Errors.DELETE_CATEGORY_FAILED });
      databaseUtility.logAtomic(
        email,
        Actions.DELETE_CATEGORY_FAILED + ` : ` + slug,
        ip
      );
    }
  }
);
module.exports = router;
