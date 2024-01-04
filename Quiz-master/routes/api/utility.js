const express = require("express");
const router = express.Router();
const passport = require("passport");
const Roles = require("../../config/roles");
const pool = require("../../config/pool").pool;
const Actions = require("../../config/messages").Actions;
const Errors = require("../../config/messages").Errors;
const Success = require("../../config/messages").Success;
const databaseUtility = require("../../utility/databaseUtility");
const validateUpdateTemplate = require("../../validator/utility/validateUpdateTemplate");
const checkPermission = require("../../utility/checkPermission");

getEmailTemplate = async hook => {
  let statement = `SELECT template_name,title AS email_subject , body AS email_body,hook  FROM email_templates WHERE hook=?;`;
  return await pool
    .execute(statement, [hook])
    .then(results => {
      return { template: results[0] };
    })
    .catch(err => {
      return {
        type: "error",
        message: Actions.VIEW_EMAIL_TEMPLATES_FAILED
      };
    });
};
router.post(
  "/auth",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let { slug } = req.body;
    console.log("slugsss",slug)
    let isAuthorized = await checkPermission(req.user.id, slug);
    if (isAuthorized) {
      return res.json({ authorized: true });
    } else {
      return res.json({ authorized: false });
    }
  }
);
//@route GET api/utility/add
//@desc  Get country and user type to add users
//@access Private
router.get(
  "/add",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // Only Admin and Super Admin have privilege to access utility
    if (req.user.role === 4) {
      res.json({
        error: "You have do not have the permission to insert records!"
      });
    } else {
      let statement =
        "SELECT title FROM user_type;SELECT country_name as name FROM apps_countries;SELECT shift from shift";
      await pool
        .query(statement)
        .then(results => {
          res.json({
            userType: results[0][0],
            countries: results[0][1],
            shifts: results[0][2]
          });
        })
        .catch(err => {});
    }
  }
);

//@route GET api/utility/logs
//@desc  Retrieve logs of all users
//@access Private
router.post(
  "/logs",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let { ip } = req.body;
    // Only Admin and Super Admin have privilege to access utility
    if (req.user.role === Roles.USER) {
      res.json({
        error: "You have do not have the permission to read logs!"
      });
    } else {
      let email = req.user.email;
      let statement = `SELECT log_user AS user, log_event AS action,event_timestamp AS timestamp ,INET_NTOA(ip) AS ip FROM activity_log ;`;
      pool
        .query(statement)
        .then(results => {
          res.json({ logs: results[0] });
          // databaseUtility.logAtomic(email, Actions.VIEW_LOG_SUCCESSFUL, ip);
        })
        .catch(err => {
          res.json({ type: "error", message: Actions.VIEW_LOG_FAILED });
          // databaseUtility.logAtomic(email, Actions.VIEW_LOG_FAILED, ip);
        });
    }
  }
);

//@route POST api/utility/emails
//@desc  Retrieve email templates
//@access Private
router.put(
  "/emails/:hook",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let hook = req.params.hook;

    // Only Admin and Super Admin have privilege to access utility
    if (req.user.role === Roles.USER) {
      res.json({
        error: "You have do not have the permission to access templates!"
      });
    } else {
      let { isValid, errors } = validateUpdateTemplate(req.body);
      if (isValid) {
        let { name, title, body, hook } = req.body;
        let statement = `
      UPDATE email_templates SET template_name = ?,title=?,body=? WHERE hook=?;`;
        pool
          .execute(statement, [name, title, body, hook])
          .then(results => {
            if (results[0].affectedRows > 0) {
              res.json({
                type: "success",
                message: "Email template updated succesfully"
              });
            } else {
              res.json({
                type: "error",
                message: Actions.UPDATE__EMAIL_TEMPLATES_Failed
              });
            }
          })
          .catch(err => {
            return res.json({ err });
          });
      }
    }
  }
);

//@route POST api/utility/emails
//@desc  Retrieve email templates
//@access Private
router.post(
  "/emails",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let { ip } = req.body;
    // Only Admin and Super Admin have privilege to access utility
    if (req.user.role === Roles.USER) {
      res.json({
        error: "You have do not have the permission to access templates!"
      });
    } else {
      let email = req.user.email;
      let statement = `SELECT template_name,title AS email_subject , body AS email_body,hook  FROM email_templates;`;
      pool
        .query(statement)
        .then(results => {
          res.json({ emails: results[0] });
          databaseUtility.logAtomic(
            email,
            Actions.VIEW_EMAIL_TEMPLATES_SUCCESSFUL,
            ip
          );
        })
        .catch(err => {
          res.json({
            type: "error",
            message: Actions.VIEW_EMAIL_TEMPLATES_FAILED
          });
          databaseUtility.logAtomic(
            email,
            Actions.VIEW_EMAIL_TEMPLATES_FAILED,
            ip
          );
        });
    }
  }
);

//@route GET api/utility/emails
//@desc  Retrieve email templates
//@access Private
router.get(
  "/emails/:hook",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let hook = req.params.hook;
    // Only Admin and Super Admin have privilege to access utility
    if (req.user.role === Roles.USER) {
      res.json({
        error: "You have do not have the permission to access templates!"
      });
    } else {
      res.json(await getEmailTemplate(hook));
    }
  }
);

module.exports = router;
