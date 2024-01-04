const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const validateLogin = require("../../validator/validateLogin");
const validateAddUser = require("../../validator/validateAddUser.js");
const validateAddCustomer = require("../../validator/validateAddCustomer.js");
const validateUpdateUser = require("../../validator/validateUpdateUser.js");
const validateUpdatePassword = require("../../validator/validateUpdatePassword.js");
const validatePassword = require("../../validator/validatePassword.js");
const Roles = require("../../config/roles");
const SLUGS = require("../../config/slugs");
const DYNAMIC_LEGENDS = require("../../config/legends");
const SHIFTS = require("../../config/shifts");
const Globals = require("../../config/global");
const ResetValidation = require("../../validator/resetValidation");
const databaseUtility = require("../../utility/databaseUtility");
const checkPermission = require("../../utility/checkPermission");
const pool = require("../../config/pool").pool;
const Actions = require("../../config/messages").Actions;
const Errors = require("../../config/messages").Errors;
const Success = require("../../config/messages").Success;
const transporter = require("../../utility/mail");
const tokenExpiration = 36000;
const mailOptions = require("../../config/mailOptions");

getAllSuppliers = async () => {
  let statement = `SELECT CONCAT(first_name," ",middle_name,last_name) AS supplierName,address FROM user_table WHERE type_id =5;`;
  return await pool
    .query(statement)
    .then(results => {
      return { suppliers: results[0], type: "success" };
    })
    .catch(err => {});
};

getUserProfile = async id => {
  let statement =
    "SELECT first_name as firstName, last_name as lastName, email as Email, address as Address , phone as Phone, mobile as Mobile, country as Country, shift as Shift FROM user_table WHERE id=?";
  return await pool
    .execute(statement, [id])
    .then(results => {
      const data = [
        { name: "First Name", value: results[0][0].firstName },
        { name: "Last Name", value: results[0][0].lastName },
        { name: "Email Adress", value: results[0][0].Email },
        { name: "Phone Number", value: results[0][0].Phone },
        { name: "Address", value: results[0][0].Address },
        { name: "Mobile Number", value: results[0][0].Mobile },

        { name: "Country", value: results[0][0].Country }
      ];

      return data;
    })
    .catch(err => {});
};
updateNewEmail = async ({ email }) => {
  let statement = "SELECT new_email FROM user_table WHERE email=?";
  return await pool
    .execute(statement, [email])
    .then(results => {
      if (results[0].length > 0) {
        let newEmail = results[0][0].new_email;
        return { type: "success", newEmail, message: "Email has been updated" };
      } else {
        return { type: "error" };
      }
    })
    .then(async results => {
      if (results.type === "success") {
        let statement = "UPDATE user_table SET email=? where email=?";
        return await pool
          .execute(statement, [results.newEmail, email])
          .then(results => {
            if (results[0].affectedRows > 0) {
              return {
                isUpdated: true,
                message: Success.UPDATE_EMAIL_SUCCESSFUL
              };
            } else {
              return {
                isUpdated: false,
                message: Errors.UPDATE_EMAIL_FAILED
              };
            }
          })
          .catch(err => {});
      } else {
        return {
          isUpdated: false,
          message: Errors.UPDATE_EMAIL_FAILED
        };
      }
    })
    .catch(err => {});
};

checkPassword = async ({ email, password, ip }) => {
  let statement =
    "SELECT user_password,user_status FROM user_table WHERE email=?";
  return await pool.execute(statement, [email]).then(async results => {
    if (results[0][0].user_status !== "active") {
      return Promise.reject({
        type: "error",
        message: Errors.ACCOUNT_INACTIVE
      });
    } else if (bcrypt.compareSync(password, results[0][0].user_password)) {
      return { type: "success", message: Success.CORRECT_PASSWORD };
    } else {
      return { type: "error", message: Errors.INCORRECT_PASSWORD };
    }
  });
};

checkEmail = async email => {
  let statement =
    "SELECT email FROM user_table WHERE email=?;SELECT new_email FROM user_table WHERE new_email=?";
  //TODO:CONVER to execute()
  return await pool
    .query(statement, [email, email])
    .then(results => {
      if (results[0][0].length > 0 || results[0][1].length > 0) {
        return false;
      } else {
        return true;
      }
    })
    .catch(err => {});
};

updateEmail = async ({ id, newEmail }) => {
  let statement = "UPDATE user_table SET new_email=? WHERE id=? ";
  return await pool.execute(statement, [newEmail, id]).then(results => {
    if (results[0].affectedRows !== 0) {
      return {
        type: "success",
        message: Success.VERIFICATION_EMAIL_CHANGE_SUCCESSFUL
      };
    } else {
      return {
        type: "error",
        message: Errors.VERIFICATION_EMAIL_CHANGE_FAILED
      };
    }
  });
};

activateAccount = async (token, ip) => {
  try {
    const { email } = jwt.verify(token, keys.secretOrKey);
    let statement =
      'UPDATE user_table SET user_status = "active" WHERE email=?;';
    return await pool
      .execute(statement, [email])
      .then(results => {
        databaseUtility.logAtomic(
          email,
          Actions.ACCOUNT_ACTIVATION_SUCCESSFUL,
          ip
        );
        return {
          isVerified: true,
          message: `${email}` + Success.ACCOUNT_ACTIVATION_SUCCESSFUL
        };
      })
      .catch(err => {
        databaseUtility.logAtomic(email, Actions.ACCOUNT_ACTIVATION_FAILED, ip);
        return {
          isVerified: false,
          message: `${email}` + Errors.ACCOUNT_ACTIVATION_FAILED
        };
      });
  } catch (e) {
    return e;
  }
};
getAllUsers = async () => {
  let statement = `SELECT id,first_name AS firstname ,middle_name AS middlename,last_name AS lastname,email,user_status AS userStatus,address,phone,mobile,INET_NTOA(last_login_ip) AS last_login_ip,registration_date,login_status,country FROM user_table`;
  return await pool
    .query(statement)
    .then(results => {
      return results[0];
    })
    .catch(err => {});
};
getAllCustomers = async () => {
  let statement = `SELECT CONCAT(first_name," ",middle_name,last_name) AS customerName,address FROM user_table WHERE type_id =4;`;
  return await pool
    .query(statement)
    .then(results => {
      return { customers: results[0] };
    })
    .catch(err => {});
};
logout = async (email, ip) => {
  let statement = "UPDATE user_table SET login_status=? WHERE email=?;";
  return await pool
    .execute(statement, ["offline", email])
    .then(result => {
      databaseUtility.logAtomic(email, Actions.LOGOUT_SUCCESSFUL, ip);
      return { type: "success", message: Actions.LOGOUT_SUCCESSFUL };
    })
    .catch(err => {
      databaseUtility.logAtomic(email, Actions.LOGOUT_FAILED, ip);
      return { type: "error", message: Actions.LOGOUT_FAILED };
    });
};
getUser = async id => {
  let statement = `SELECT 
  id,
  first_name AS firstname,
  middle_name AS middlename,
  last_name AS lastname,
  email,
  user_status AS userStatus,
  address,
  phone,
  mobile,
  INET_NTOA(last_login_ip) AS last_login_ip,
  registration_date,
  login_status,
  country ,
  shift,
  type_id as userType
FROM user_table WHERE
  id=?`;
  return await pool
    .execute(statement, [id])
    .then(results => {
      return results[0];
    })
    .catch(err => {});
};
login = async (email, password, ip) => {
  let statement =
    "SELECT user_password,user_status FROM user_table WHERE email=?";
  return await pool
    .execute(statement, [email])
    .then(async results => {
      if (results[0][0].user_status !== "active") {
        return Promise.reject({
          type: "error",
          message: Errors.ACCOUNT_INACTIVE
        });
      } else if (bcrypt.compareSync(password, results[0][0].user_password)) {
        return await updateUserLoginStatus(email, ip);
      } else {
        return await updateLoginAttempt(email, ip);
      }
    })
    .catch(err => {
      return {
        accountInvalid: true,
        type: "error",
        message: Actions.LOGIN_FAILED,
        ...err
      };
    });
};
addLoginAttempt = async (email, ip) => {
  let insertStatement = `INSERT INTO login_attempt (email,ip,attempt_date,attempt) VALUES (?,INET_ATON(?),CURDATE(),1);`;
  return await pool
    .execute(insertStatement, [email, ip])
    .then(results => {
      return {
        type: "error",
        message: Actions.LOGIN_FAILED
      };
    })
    .catch(err => {
      return err;
    });
};
updateLoginAttempt = async (email, ip) => {
  let statement = `UPDATE login_attempt SET attempt=attempt+1 WHERE 
  email=? AND attempt_date=CURDATE();`;
  return await pool.execute(statement, [email]).then(async results => {
    if (results[0].affectedRows > 0) {
      loginAttempt = await getLoginAttempt(email);

      if (loginAttempt > Globals.MAX_LOGIN_ATTEMPT)
        return await deactivateAccount(email, ip);
      return {
        type: "error",
        message: Actions.LOGIN_FAILED
      };
    } else {
      return await addLoginAttempt(email, ip);
    }
  });
};
deactivateAccount = async (email, ip) => {
  let statement = `UPDATE user_table SET user_status=? WHERE email=?`;
  return await pool
    .execute(statement, ["inactive", email])
    .then(async results => {
      let emailTemplate = await getMailTemplate("account_deactivated");
      let mail = await replaceDynamicLegends(emailTemplate.body);
      mailOptions.subject = emailTemplate.title;
      mailOptions.html = mail;
      transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
          databaseUtility.logAtomic(
            email,
            Actions.ACCOUNT_DEACTIVATE_MAIL_FAILED,
            ip
          );
        } else {
          databaseUtility.logAtomic(
            email,
            Actions.ACCOUNT_DEACTIVATE_MAIL_SUCCESS,
            ip
          );
        }
      });
      return {
        type: "error",
        message: Actions.ACCOUNT_SUSPENDED_USER
      };
    })
    .catch(err => {});
};
getLoginAttempt = async email => {
  let statement =
    "SELECT attempt FROM login_attempt WHERE email=? AND attempt_date=CURDATE()";
  return await pool
    .execute(statement, [email])
    .then(results => {
      return results[0][0].attempt;
    })
    .catch(err => {});
};
updateUserLoginStatus = async (email, ip) => {
  let statement2 =
    "UPDATE user_table SET login_status=?,last_login_ip=INET_ATON(?) WHERE email=?;SELECT id,type_id AS role FROM user_table WHERE email=?";
  //TODO : Conver to execute()
  return await pool
    .query(statement2, ["online", ip, email, email])
    .then(results => {
      if (results[0][0].affectedRows > 0) {
        return {
          isAuthenticated: true,
          id: results[0][1][0].id,
          role: results[0][1][0].role
        };
      } else return { isAuthenticated: false };
    })
    .catch(err => {});
};

editUser = async user => {
  let statement = `UPDATE user_table SET first_name=? , middle_name=?,last_name=?,address=?,phone=?,mobile=?,country=?,shift=?,type_id = ? WHERE id=?;`;
  return await pool
    .execute(statement, [
      user.firstname,
      user.middlename,
      user.lastname,
      user.address,
      user.phone,
      user.mobile,
      user.country,
      user.shift,
      user.userType,
      user.id
    ])
    .then(results => {
      if (results[0].affectedRows > 0) {
        return { type: "success", message: Success.EDIT_USER_SUCCESSFUL };
      } else {
        return { type: "error", message: Errors.EDIT_USER_FAILED };
      }
    })
    .catch(err => {});
};

addUser = async newUser => {
  let statement =
    "INSERT INTO user_table (first_name,middle_name,last_name,email,user_password,address,phone,mobile,country,shift,type_id) VALUES (?,?,?,?,?,?,?,?,?,?,?);";
  // Generate salt and hash it
  let salt = await bcrypt.genSalt(8);
  newUser.password = await bcrypt.hash(newUser.password, salt);
  return await pool
    .execute(statement, [
      newUser.firstname,
      newUser.middlename,
      newUser.lastname,
      newUser.email,
      newUser.password,
      newUser.address,
      newUser.phone,
      newUser.mobile,
      newUser.country,
      newUser.shift,
      newUser.userType
    ])
    .then(result => {
      return { userAdded: true };
    })
    .catch(err => {
      return { userAdded: false, err };
    });
};
addSupplier = async newSupplier => {
  let statement =
    "INSERT INTO user_table (first_name,middle_name,last_name,email,address,phone,mobile,country,type_id) VALUES (?,?,?,?,?,?,?,?,?);";
  return await pool
    .execute(statement, [
      newSupplier.firstname,
      newSupplier.middlename,
      newSupplier.lastname,
      newSupplier.email,
      newSupplier.address,
      newSupplier.phone,
      newSupplier.mobile,
      newSupplier.country,
      5
    ])
    .then(result => {
      return { isSupplierAdded: true };
    })
    .catch(err => {
      return { isSupplierAdded: false, err };
    });
};

addCustomer = async newCustomer => {
  let statement =
    "INSERT INTO user_table (first_name,middle_name,last_name,email,address,phone,mobile,country,type_id) VALUES (?,?,?,?,?,?,?,?,?);";
  return await pool
    .execute(statement, [
      newCustomer.firstname,
      newCustomer.middlename,
      newCustomer.lastname,
      newCustomer.email,
      newCustomer.address,
      newCustomer.phone,
      newCustomer.mobile,
      newCustomer.country,
      4
    ])
    .then(result => {
      return { isCustomerAdded: true };
    })
    .catch(err => {
      return { isCustomerAdded: false, err };
    });
};
updatePasswordRequest = async ({ id, oldPassword, newPassword }) => {
  let statement = "SELECT user_password FROM user_table WHERE id=?";
  return await pool
    .execute(statement, [id])
    .then(async results => {
      if (!bcrypt.compareSync(oldPassword, results[0][0].user_password)) {
        return Promise.reject({
          errors: { oldPassword: "Password incorrect" }
        });
      }
      return await changePassword({ id, newPassword });
    })
    .catch(err => {
      return err;
    });
};
changePassword = async ({ id, newPassword }) => {
  let statement = `UPDATE user_table SET user_password=? WHERE id=?`;
  return await pool
    .execute(statement, [newPassword, id])
    .then(results => {
      if (results[0].affectedRows !== 0) {
        return {
          type: "success",
          message: Success.CHANGE_PASSWORD_SUCCESSFUL
        };
      } else {
        return {
          type: "error",
          message: Errors.CHANGE_PASSWORD_FAILED
        };
      }
    })
    .catch(err => {
      databaseUtility.logAtomic(email, Actions.CHANGE_PASSWORD_FAILED, ip);
      res.json({
        type: "success",
        message: Errors.CHANGE_PASSWORD_FAILED
      });
    });
};
getMailTemplate = async hook => {
  let templateQuery = `SELECT title,body FROM email_templates WHERE hook=?;`;
  return await pool
    .execute(templateQuery, [hook])
    .then(result => {
      return result[0][0];
    })
    .catch(err => {});
};

//@Route api/users/suppliers
//Get the list of the suppliers
//@access Private
router.get(
  "/suppliers",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let { ip } = req.body;
    let isAuthorized = await checkPermission(req.user.id, SLUGS.ADD_USER);
    if (!isAuthorized) {
      return res.json({
        type: "error",
        message: Errors.UNAUTHORIZED
      });
    }

    res.json(await getAllSuppliers());
  }
);

//@route GET api/users/customer
//@desc Get all customers
//@access Private
router.get(
  "/customers",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    //TODO: Validate Proper permission
    let isAuthorized = await checkPermission(
      req.user.id,
      SLUGS.NEW_SALES_ORDER
    );
    if (!isAuthorized) {
      return res.json({
        type: "error",
        message: Errors.UNAUTHORIZED
      });
    } else {
      return res.json(await getAllCustomers());
    }
  }
);
router.get(
  "/profileInfo",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let id = req.user.id;

    res.json(await getUserProfile(id));
  }
);

//@route POST api/users/checkPassword
//@desc ConfirmPassword
//check the password is correct or not for changing the email
router.post(
  "/checkPassword",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let { ip, password } = req.body;
    let { errors, isValid } = validatePassword(password);
    if (!isValid) {
      return res.status(400).json({ errors });
    }
    let { email } = req.user;
    res.json(await checkPassword({ email, password }));
  }
);

//@route PUT api/users/reset
//@desc  Reset password
//@access PUBLIC
router.put("/reset", async (req, res) => {
  let { newPassword, email, ip } = req.body;
  const { errors, isValid } = ResetValidation(req.body);
  // Generate salt and hash it
  let salt = await bcrypt.genSalt(8);
  password = await bcrypt.hash(newPassword, salt);
  if (isValid) {
    let statement = "UPDATE user_table SET user_password=? where email=? ";
    pool
      .execute(statement, [password, email])
      .then(result => {
        databaseUtility.logAtomic(email, Actions.RESET_PASSWORD_SUCCESSFUL, ip);
        res.json({
          type: "success",
          message: Success.RESET_PASSWORD_SUCCESSFUL
        });
      })
      .catch(err => {
        res.json({ type: "error", message: Errors.RESET_PASSWORD_FAILED });
        databaseUtility.logAtomic(email, Actions.RESET_PASSWORD_FAILED, ip);
      });
  } else {
    res.json({ errors });
  }
});
//@route GET api/users/reset/:token
//@desc  Validate password request
//@access PUBLIC
router.get("/reset/:token", (req, res) => {
  if (!req.params.token) return;
  try {
    const { email } = jwt.verify(req.params.token, keys.secretOrKey);
    let statement = "select email from user_table where email=?";
    pool.execute(statement, [email]).then(rows => {
      if (rows[0][0]) {
        res.json({
          isVerified: true,
          email
        });
      } else {
        res.json({ isVerified: false });
      }
    });
  } catch (err) {
    res.json(err);
  }
});
//@route POST api/users/login
//@desc  Login User
//@access Public
router.post("/login", async (req, res) => {
  const { errors, isValid } = validateLogin(req.body);
  //Check Validation
  if (!isValid) {
    return res.status(400).json({ errors });
  }
  let { email, password, ip } = req.body;
  console.log(email)

  try {
    let response = await login(email, password, ip);
    if (response.isAuthenticated) {
      const payload = {
        user: response.id,
        role: response.role
      };
      jwt.sign(
        payload,
        keys.secretOrKey,
        {
          expiresIn: tokenExpiration
        },
        (err, token) => {
          if (!err) {
            databaseUtility.logAtomic(email, Actions.LOGIN_SUCCESSFUL, ip);
            res.json({
              type: "success",
              message: Success.LOGIN_SUCCESSFUL,
              token: `Bearer ` + token
            });
          } else {
            databaseUtility.logAtomic(email, Actions.LOGIN_FAILED, ip);
            res.json({ type: "error", message: Errors.LOGIN_FAILED });
          }
        }
      );
    } else if (response.accountInvalid) {
      res.json({ type: response.type, message: response.message });
    } else {
      databaseUtility.logAtomic(email, Actions.LOGIN_FAILED, ip);
      res.json({ type: response.type, message: response.message });
    }
  } catch (err) {
    res.json(err);
  }
});

//@route GET api/users/dashboard
//@desc  Return  dashboard
//@access Private
router.get(
  "/dashboard",
  passport.authenticate("jwt", { session: false }),

  async (req, res) => {
    let isEditAuthorized = await checkPermission(req.user.id, SLUGS.EDIT_USER);
    if (req.user.role === Roles.SUPERADMIN || isEditAuthorized) {
      return res.json(await getAllUsers());
    } else {
      return res.json({
        type: "error",
        message: Errors.UNAUTHORIZED
      });
    }
  }
);

//@route POST api/users/logout
//@desc  Logout User
//@access Private
router.post(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let { email } = req.user;
    let { ip } = req.body;
    res.json(await logout(email, ip));
  }
);
//@route GET api/users/:id
//@desc  Display Particular users route
//@access PRIVATE
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let isAuthorized = await checkPermission(req.user.id, SLUGS.EDIT_USER);
    if (!isAuthorized) {
      return res.json({
        type: "error",
        message: Errors.UNAUTHORIZED
      });
    }
    let response = await getUser(req.params.id);
    res.json(response);
  }
);
//@route POST api/users
//@desc Insert new user
//@access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let isAuthorized = await checkPermission(req.user.id, SLUGS.ADD_USER);
    if (!isAuthorized) {
      return res.json({
        type: "error",
        message: Errors.UNAUTHORIZED
      });
    } else {
      const { errors, isValid } = validateAddUser(req.body);
      if (!isValid) {
        return res.status(400).json({ errors });
      }
      let userEmail = req.user.email;
      let newUser = {
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        phone: req.body.phone,
        mobile: req.body.mobile,
        country: req.body.country,
        userType: req.body.userType,
        shift: req.body.shift
      };
      let { email, ip } = req.body;
      newUser.userType = Roles[newUser.userType.toUpperCase()];
      newUser.shift = SHIFTS[newUser.shift];
      let { userAdded, err } = await addUser(newUser);
      if (userAdded) {
        res.json({
          type: "success",
          message: Success.ADD_USER_SUCCESSFUL
        });
        databaseUtility.logAtomic(
          userEmail,
          Actions.ADD_USER_SUCCESSFUL + email,
          ip
        );
        const payload = {
          email
        };
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: tokenExpiration
          },
          async (err, token) => {
            if (!err) {
              let emailTemplate = await getMailTemplate("email_verification");
              let mail = await replaceDynamicLegends(emailTemplate.body);
              let SITE_URL = DYNAMIC_LEGENDS["SITE_URL"];
              mailOptions.subject = emailTemplate.title;
              let EMAIL_LINK = `${SITE_URL}confirmation/${token}`;
              mail = mail.replace(/EMAIL_LINK/g, EMAIL_LINK);
              mailOptions.html = mail;
              transporter.sendMail(mailOptions, function(err, info) {
                if (err) {
                  databaseUtility.logAtomic(
                    userEmail,
                    Actions.VERIFICATION_EMAIL_FAILED + email,
                    ip
                  );
                } else {
                  databaseUtility.logAtomic(
                    userEmail,
                    Actions.VERIFICATION_EMAIL_SUCCESSFUL + email,
                    ip
                  );
                }
              });
            } else {
              databaseUtility.logAtomic(
                userEmail,
                Actions.VERIFICATION_EMAIL_FAILED + email,
                ip
              );
            }
          }
        );
      } else {
        if (err.code === "ER_DUP_ENTRY") {
          res.json({ errors: { email: Errors.EMAIL_ALREADY_EXISTS } });
        } else {
          res.json({ type: "error", message: Actions.ADD_USER_FAILED });
        }
        databaseUtility.logAtomic(
          userEmail,
          Actions.ADD_USER_FAILED + email,
          ip
        );
      }
    }
  }
);
// @route PUT api/users/
// @desc  Update user password
// @access PRIVATE
router.put(
  "/password",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { errors, isValid } = validateUpdatePassword(req.body);
    let { email } = req.user;
    // Check Validation
    if (!isValid) {
      return res.status(400).json({ errors });
    }
    let { oldPassword, newPassword, ip } = req.body;
    let id = req.user.id;
    let salt = bcrypt.genSaltSync(10);
    newPassword = bcrypt.hashSync(newPassword, salt);
    try {
      let response = await updatePasswordRequest({
        id,
        oldPassword,
        newPassword
      });
      res.json(response);
      if (res.type === "success") {
        databaseUtility.logAtomic(
          email,
          Actions.CHANGE_PASSWORD_SUCCESSFUL,
          ip
        );
      } else {
        databaseUtility.logAtomic(email, Actions.CHANGE_PASSWORD_FAILED, ip);
      }
    } catch (err) {
      return res.json(err);
    }
  }
);
// @route PUT api/users/
// @desc  Update user password
// @access PRIVATE
router.put(
  "/password",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { errors, isValid } = validateUpdatePassword(req.body);
    // Check Validation
    if (!isValid) {
      return res.status(400).json({ errors });
    }
    let { oldPassword, newPassword, ip } = req.body;
    let id = req.user.id;
    let salt = bcrypt.genSaltSync(10);
    newPassword = bcrypt.hashSync(newPassword, salt);
    try {
      let response = await updatePasswordRequest({
        id,
        oldPassword,
        newPassword
      });
      res.json(response);
      if (res.type === "success") {
        databaseUtility.logAtomic(
          email,
          Actions.CHANGE_PASSWORD_SUCCESSFUL,
          ip
        );
      } else {
        databaseUtility.logAtomic(email, Actions.CHANGE_PASSWORD_FAILED, ip);
      }
    } catch (err) {
      res.json(err);
    }
  }
);

//@route POST api/users/confirmation/:token
//@desc  Verify email
//@access Public
router.post("/confirmation/:token", async (req, res) => {
  if (!req.params.token) return;
  let { ip } = req.body;
  res.json(await activateAccount(req.params.token, ip));
});
//@route PUT api/users/
//@desc  Insert user route
//@access PRIVATE
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let isAuthorized = await checkPermission(req.user.id, SLUGS.EDIT_USER);
    if (!isAuthorized) {
      return res.json({
        type: "error",
        message: Errors.UNAUTHORIZED
      });
    }
    if (req.user.role === Roles.USER) {
      res.json({ type: "error", message: Errors.EDIT_USER_PERMISSION_DENY });
    }
    let userEmail = req.user.email;
    const { errors, isValid } = validateUpdateUser(req.body);
    // Check Validation
    if (!isValid) {
      return res.status(400).json({ errors });
    }
    let user = {
      id: req.params.id,
      email: req.body.email,
      firstname: req.body.firstname,
      middlename: req.body.middlename,
      lastname: req.body.lastname,
      userType: req.body.userType,
      address: req.body.address,
      phone: req.body.phone,
      mobile: req.body.mobile,
      country: req.body.country,
      shift: req.body.shift
    };
    let { ip } = req.body;
    user.userType = Roles[user.userType.toUpperCase()];
    if (user.userType > 1) user.shift = null;
    else user.shift = SHIFTS[user.shift];
    let response = await editUser(user);
    if (response.type === "success") {
      databaseUtility.logAtomic(
        userEmail,
        Actions.EDIT_USER_SUCCESSFUL + user.email,
        ip
      );
    } else {
      databaseUtility.logAtomic(
        userEmail,
        Actions.EDIT_USER_FAILED + user.email,
        ip
      );
    }
    res.json(response);
  }
);

//@route DELETE api/users/delete/:id
//@desc  Set user status to closed
//@access Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let { email, ip } = req.body;
    if (req.user.role !== Roles.SUPERADMIN) {
      return res.json({
        type: "error",
        message: Errors.DELETE_USER_PERMISSION_DENY
      });
    } else {
      let userEmail = req.user.email;
      let statement =
        "UPDATE user_table SET user_status='closed' WHERE email = ?;";
      pool
        .execute(statement, [email])
        .then(results => {
          res.json({
            type: "success",
            message: Success.CLOSE_ACCOUNT_SUCCESSFUL
          });
          databaseUtility.logAtomic(
            email,
            Actions.CLOSE_ACCOUNT_SUCCESSFUL,
            ip
          );
        })
        .catch(err => {
          res.json({ type: "error", message: Success.CLOSE_ACCOUNT_FAILED });
          databaseUtility.logAtomic(email, Actions.CLOSE_ACCOUNT_FAILED, ip);
        });
    }
  }
);
replaceDynamicLegends = async emailBody => {
  let mail = emailBody;
  mail = mail.replace(/[[\]]/g, "");
  for (let legend in DYNAMIC_LEGENDS) {
    let regex = new RegExp(legend, "gi");
    mail = mail.replace(regex, DYNAMIC_LEGENDS[legend]);
  }
  return mail;
};

//@route POST api/users/forgot
//@desc  Send a password reset token
//@access PUBLIC

router.post("/forgot", async (req, res) => {
  let { email, ip } = req.body;
  let statement = "select email from user_table where email=?";
  await pool
    .execute(statement, [email])
    .then(rows => {
      if (rows[0][0]) {
        const payload = {
          email
        };
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: tokenExpiration
          },
          async (err, token) => {
            let passwordUpdate = await getMailTemplate("password_reset");
            let mail = await replaceDynamicLegends(passwordUpdate.body);
            let SITE_URL = DYNAMIC_LEGENDS["SITE_URL"];
            let EMAIL_LINK = `${SITE_URL}resetpassword/${token}/`;
            mailOptions.subject = passwordUpdate.title;
            mail = mail.replace(/EMAIL_LINK/g, EMAIL_LINK);
            mailOptions.html = mail;
            transporter.sendMail(mailOptions, function(err1, info) {
              if (err1) {
                res.json({
                  type: "error",
                  message: Actions.REQUEST_PASSWORD_RESET_FAILED
                });
                databaseUtility.logAtomic(
                  email,
                  Actions.REQUEST_PASSWORD_RESET_FAILED,
                  ip
                );
              } else {
                res.json({
                  type: "success",
                  message: Success.RESET_VERIFICATION_SUCCESSFUL
                });
                databaseUtility.logAtomic(
                  email,
                  Actions.REQUEST_PASSWORD_RESET,
                  ip
                );
              }
            });
          }
        );
      } else {
        res.json({
          type: "error",
          message: Actions.REQUEST_PASSWORD_RESET_FAILED
        });
        databaseUtility.logAtomic(
          email,
          Actions.REQUEST_PASSWORD_RESET_FAILED,
          ip
        );
      }
    })
    .catch(err => {
      res.json({
        type: "error",
        message: Actions.REQUEST_PASSWORD_RESET_FAILED
      });
      databaseUtility.logAtomic(
        email,
        Actions.REQUEST_PASSWORD_RESET_FAILED,
        ip
      );
    });
});

router.put(
  "/users/updateEmail",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let { ip, newEmail } = req.body;
    let isUnique = await checkEmail(newEmail);
    if (!isUnique) {
      return res.status(400).json({ errors: Errors.EMAIL_ALREADY_EXISTS });
    }
    let { id, email } = req.user;
    let response = await updateEmail({ newEmail, id, email });
    res.json(response);
    if (response.type === "success") {
      const payload = {
        email
      };
      jwt.sign(
        payload,
        keys.secretOrKey,
        {
          expiresIn: tokenExpiration
        },
        async (err, token) => {
          let emailTemplate = await getMailTemplate("update_email");
          let mail = await replaceDynamicLegends(emailTemplate.body);
          let EMAIL_LINK = `http://localhost:3000/confirmEmailChange/${token}/`;
          mailOptions.subject = emailTemplate.title;
          mail = mail.replace(/EMAIL_LINK/g, EMAIL_LINK);
          mailOptions.html = mail;
          transporter.sendMail(mailOptions, function(err1, info) {
            if (err1) {
              res.json({
                type: "error",
                message: Actions.UPDATE_EMAIL_FAILED
              });
              databaseUtility.logAtomic(email, Actions.UPDATE_EMAIL_FAILED, ip);
            } else {
              res.json({
                type: "success",
                message: Success.UPDATE_EMAIL_SUCCESSFUL
              });
              databaseUtility.logAtomic(
                email,
                Actions.UPDATE_EMAIL_SUCCESSFUL,
                ip
              );
            }
          });
        }
      );
    } else if (response.type === "error") {
    }
  }
);

router.put("/users/updateNewEmail/:id", async (req, res) => {
  if (!req.params.id) return;
  try {
    let { ip } = req.body;
    const { email } = jwt.verify(req.params.id, keys.secretOrKey);
    response = await updateNewEmail({ email });
    res.json(response);
    if (response.isUpdated) {
      databaseUtility.logAtomic(email, Actions.UPDATE_EMAIL_FAILED, ip);
    } else {
      databaseUtility.logAtomic(email, Actions.UPDATE_EMAIL_FAILED, ip);
    }
  } catch (e) {}
});

//@route POST api/users/customers
//@desc Insert new customer
//@access Private
router.post(
  "/customers",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    //TODO: Validate Proper permission
    let isAuthorized = await checkPermission(req.user.id, SLUGS.ADD_USER);
    if (!isAuthorized) {
      return res.json({
        type: "error",
        message: Errors.UNAUTHORIZED
      });
    } else {
      const { errors, isValid } = validateAddCustomer(req.body);
      if (!isValid) {
        return res.status(400).json({ errors });
      }
      let userEmail = req.user.email;
      let newCustomer = {
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        lastname: req.body.lastname,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        mobile: req.body.mobile,
        country: req.body.country
      };
      let { email, ip } = req.body;
      let { isCustomerAdded, err } = await addCustomer(newCustomer);
      if (isCustomerAdded) {
        res.json({
          type: "success",
          message: Success.CUSTOMER_ADD_SUCCESSFUL
        });
        databaseUtility.logAtomic(
          userEmail,
          Actions.CUSTOMER_ADD_SUCCESSFUL + email,
          ip
        );
      } else {
        if (err.code === "ER_DUP_ENTRY") {
          res.json({ errors: { email: Errors.EMAIL_ALREADY_EXISTS } });
        } else {
          res.json({ type: "error", message: Errors.CUSTOMER_ADD_FAILED });
        }
        databaseUtility.logAtomic(
          userEmail,
          Actions.CUSTOMER_ADD_FAILED + email,
          ip
        );
      }
    }
  }
);

//@route POST api/users/supplier
//@desc Insert new Supplier
//@access Private
router.post(
  "/supplier",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    //TODO: Validate Proper permission
    let isAuthorized = await checkPermission(req.user.id, SLUGS.ADD_USER);
    if (!isAuthorized) {
      return res.json({
        type: "error",
        message: Errors.UNAUTHORIZED
      });
    } else {
      const { errors, isValid } = validateAddCustomer(req.body);
      if (!isValid) {
        return res.status(400).json({ errors });
      }
      let userEmail = req.user.email;
      let newSupplier = {
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        lastname: req.body.lastname,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        mobile: req.body.mobile,
        country: req.body.country
      };
      let { email, ip } = req.body;
      let { isSupplierAdded, err } = await addSupplier(newSupplier);
      if (isSupplierAdded) {
        res.json({
          type: "success",
          message: Success.SUPPLIER_ADD_SUCCESSFUL
        });
        databaseUtility.logAtomic(
          userEmail,
          Actions.SUPPLIER_ADD_SUCCESSFUL + email,
          ip
        );
      } else {
        if (err.code === "ER_DUP_ENTRY") {
          res.json({ errors: { email: Errors.EMAIL_ALREADY_EXISTS } });
        } else {
          res.json({ type: "error", message: Errors.SUPPLIER_ADD_FAILED });
        }
        databaseUtility.logAtomic(
          userEmail,
          Actions.SUPPLIER_ADD_FAILED + email,
          ip
        );
      }
    }
  }
);

module.exports = router;
