const express = require("express");
const router = express.Router();
const passport = require("passport");
const pool = require("../../config/pool").pool;
const Roles = require("../../config/roles");
const Actions = require("../../config/messages").Actions;
const Errors = require("../../config/messages").Errors;
const Success = require("../../config/messages").Success;
const databaseUtility = require("../../utility/databaseUtility");
const checkPermission = require("../../utility/checkPermission");
getAllModules = async () => {
  let statement =
    "SELECT id,parent_id AS parent,module_name AS label FROM modules;";
  return await pool
    .query(statement)
    .then(result => result[0])
    .catch(err => {
      return { type: "error", message: Actions.MODULES_LOAD_FAILED };
    });
};
getModulesFromIds = async permissionList => {
  let statement =
    "SELECT id,parent_id AS parent,module_name AS label FROM modules WHERE id IN (?)";
  //TODO: Convert to execute
  return await pool
    .query(statement, [permissionList])
    .then(permissions => {
      return permissions[0];
    })
    .catch(err => {
    });
};
treeifyModules = array => {
  if (!array) {
    return { type: "warning" };
  }
  //The parents must come before the children nodes
  let tree = [],
    mappedArray = {},
    mappedElement;
  //Convert array into a hash table
  for (let arrayElement of array) {
    mappedArray[arrayElement.id] = arrayElement;
    mappedArray[arrayElement.id]["children"] = [];
  }
  for (let id in mappedArray) {
    if (mappedArray.hasOwnProperty(id)) {
      mappedElement = mappedArray[id];
      // If the element is not at the root level, add it to its parent array of children.

      if (
        mappedElement.parent &&
        mappedArray.hasOwnProperty(mappedElement.parent)
      ) {
        mappedArray[mappedElement["parent"]]["children"].push(mappedElement);
      }
      // If the element is at the root level, add it to first level elements array.
      else {
        tree.push(mappedElement);
      }
    }
  }
  return tree;
};
managePermissions = async (permissions, id, email) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    let { dropSuccessful } = await dropPermissions(id, connection);
    if (!dropSuccessful) throw "Failed to update permission!";
    for (let permission in permissions) {
      let { addSuccessful } = await addPermissions(permission, id, connection);
      if (!addSuccessful) throw new Error(Actions.ADD_PERMISSIONS_FAILED);
    }

    await connection.commit();
    connection.release();
    return {
      type: "success",
      message: Actions.UPDATE_PERMISSIONS_SUCCESSFUL + email
    };
  } catch (e) {
    await connection.rollback();
    return {
      type: "error",
      message: Actions.UPDATE_PERMISSIONS_FAILED + email
    };
  } finally {
    connection.release();
  }
};
addPermissions = async (permission, userId, connection) => {
  let addPermission =
    "INSERT INTO module_permission(user_id,module_id) VALUES (?,?)";
  return await connection
    .execute(addPermission, [userId, permission])
    .then(result => {
      if (result[0].affectedRows === 1) {
        return { addSuccessful: true };
      }
      return { addSuccessful: false };
    })
    .catch(err => {
      return { addSuccessful: false };
    });
};
dropPermissions = async (id, connection) => {
  let deletePermissions = "DELETE FROM module_permission WHERE user_id=?";
  return await connection
    .execute(deletePermissions, [id])
    .then(result => {
      return { dropSuccessful: true };
    })
    .catch(err => {
      return { dropSuccessful: false };
    });
};
getModulePermissionById = async id => {
  let statement = "SELECT module_id FROM module_permission WHERE user_id=?";
  return await pool
    .execute(statement, [id])
    .then(result => {
      let permissionArray = [];
      for (let permissionItem of result[0]) {
        permissionArray.push(permissionItem.module_id);
      }
      return permissionArray;
    })
    .catch(err => {
      return { type: "error", message: Errors.SOMETHING_WENT_WRONG };
    });
};

//@route Get api/modules/
//@desc  Retrieve modules in hierarchical structure
//@access PRIVATE
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.role !== Roles.SUPERADMIN) {
      return res.status(400).json({
        type: "error",
        message: Actions.UNAUTHORIZED
      });
    }
    let response = treeifyModules(await getAllModules());
    res.json(response);
  }
);
//@route Get api/modules/
//@desc  Retrieve modules in linear structure
//@access PRIVATE
router.get(
  "/unordered",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let response = await getAllModules();
    res.json(response);
  }
);
//@route POST api/modules/permissions/:id
//@desc  Insert user route
//@access PRIVATE
router.post(
  "/permissions/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.role !== Roles.SUPERADMIN) {
      return res.status(400).json({
        type: "error",
        message: Actions.UNAUTHORIZED
      });
    }
    let { permissions, ip } = req.body;
    let userId = req.params.id;
    let updatedEmail = await pool
      .execute("SELECT email FROM user_table WHERE id=?", [userId])
      .then(result => result[0][0].email)
      .catch(err => console.log(err));
    let response = await managePermissions(permissions, userId, updatedEmail);
    res.json(response);
    if (response.type === "success") {
      databaseUtility.logAtomic(
        req.user.email,
        Actions.UPDATE_PERMISSIONS_SUCCESSFUL + updatedEmail,
        ip
      );
    } else {
      databaseUtility.logAtomic(
        req.user.email,
        Actions.UPDATE_PERMISSIONS_SUCCESSFUL + updatedEmail,
        ip
      );
    }
  }
);
//@route GET api/modules/permissions
//@desc  Get User permissions
//@access PRIVATE
router.get(
  "/permissions/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.role !== Roles.SUPERADMIN) {
      return res.status(400).json({
        type: "error",
        message: Actions.UNAUTHORIZED
      });
    }
    let userId = req.params.id;
    if (!userId) {
      return res
        .status(400)
        .json({ type: "error", message: "User Id is required" });
    }
    let response = await getModulePermissionById(userId);
    res.json(response);
  }
);

//@route GET api/modules/sidebar
//@desc  Get Info to render sidebar for a particular user
//@access PRIVATE
router.get(
  "/sidebar",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let id = req.user.id;
    if (!id) {
      return res
        .status(400)
        .json({ type: "error", message: "User Id is required" });
    }
    let permissionList = await getModulePermissionById(id);
    let response = {};
    response.userPermissions = treeifyModules(
      await getModulesFromIds(permissionList)
    );
    res.json(response);
  }
);
module.exports = router;
