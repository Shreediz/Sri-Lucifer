const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const pool = require("../../config/pool").pool;
const Roles = require("../../config/roles");
const Actions = require("../../config/messages").Actions;
const Errors = require("../../config/messages").Errors;
const Success = require("../../config/messages").Success;
const databaseUtility = require("../../utility/databaseUtility");
const moment = (getCheckIn = async email => {
  let statement = `SELECT  CONCAT(CURDATE(), " " ,shift.check_in_time) AS checkInTime FROM shift INNER JOIN user_table ON user_table.shift=shift.id WHERE email =?`;
  return await pool
    .execute(statement, [email])
    .then(results => {
      return { checkInTime: results[0][0].checkInTime };
    })
    .catch(err => console.log("error in checkintime", err));
});

getCheckOut = async email => {
  let userid = await getUserId(email);
  let statement = `SELECT  CONCAT(CURDATE(), " " ,shift.check_out_time) AS checkOutTime FROM shift INNER                  JOIN user_table ON user_table.shift=shift.id WHERE email =?;
                    SELECT checkin FROM checklog WHERE userid=? ORDER BY checkin DESC LIMIT 1 ;`;
  //TODO: execute() need to be placed
  return await pool
    .query(statement, [email, userid])
    .then(results => {
      return {
        checkOutTime: results[0][0][0].checkOutTime,
        todayCheckInTime: results[0][1][0].checkin
      };
    })
    .catch(err => {
    });
};

getUserId = async email => {
  let statement = "SELECT id FROM user_table where email=?";
  return await pool
    .execute(statement, [email])
    .then(results => {
      return results[0][0].id;
    })
    .catch(err => {});
};

addCheckIn = async ({ email, reasonForLate }) => {
  let userid = await getUserId(email);
  let statement = "INSERT INTO checklog (late_reason,userid) VALUES (?,?)";
  return await pool
    .execute(statement, [reasonForLate, userid])
    .then(results => {
      return { type: "success", message: Success.CHECKIN_SUCCESSFUL };
    })
    .catch(err => {
      return { type: "error", message: Errors.CHECKIN_FAILED };
    });
};

addCheckOut = async ({ email, reasonForEarly, todayCheckInTime }) => {
  let userid = await getUserId(email);
  let statement =
    "UPDATE checklog SET checkout=CURRENT_TIMESTAMP, early_reason = ? WHERE checkin=? && userid=? ";
  return await pool
    .execute(statement, [reasonForEarly, todayCheckInTime, userid])
    .then(results => {
      return {
        type: "success",
        message: Success.CHECKOUT_SUCCESSFUL
      };
    })
    .catch(err => {
      return {
        type: "error",
        message: Errors.CHECKOUT_FAILED
      };
    });
};

getCheckTime = async email => {
  let userid = await getUserId(email);
  let statement = "SELECT checkin,checkout FROM checklog WHERE userid = ?";
  return await pool
    .execute(statement, [userid])
    .then(results => {
      return results[0];
    })
    .catch(err => {});
};

//@route GET api/shift/user
//@desc TEST users checkin time
//@access Public

router.get(
  "/checkin",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.role !== Roles.USER) {
      return res.json({
        type: "error",
        message: Errors.UNAUTHORIZED
      });
    }
    res.json(await getCheckIn(req.user.email));
  }
);

router.get(
  "/checkout",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.role !== Roles.USER) {
      return res.json({
        type: "error",
        message: Errors.UNAUTHORIZED
      });
    }
    res.json(await getCheckOut(req.user.email));
  }
);

//@route api/shift/checkin
//@dec Store the checkin time
//@access Public
router.post(
  "/checkin",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.role !== Roles.USER) {
      return res.json({
        type: "error",
        message: Errors.UNAUTHORIZED
      });
    }

    let { ip, reasonForLate } = req.body;
    let email = req.user.email;
    let response = await addCheckIn({ email, reasonForLate });
    if (response.type === "success") {
      res.json(response);
      databaseUtility.logAtomic(req.user.email, Actions.CHECKIN_SUCCESSFUL, ip);
    } else {
      databaseUtility.logAtomic(req.user.email, Actions.CHECKIN_FAILED, ip);
    }
  }
);

//@route api/shift/checkin
//@dec Store the checkin time
//@access Public
router.put(
  "/checkout",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.role !== Roles.USER) {
      return res.json({
        type: "error",
        message: Errors.UNAUTHORIZED
      });
    }
    let { ip, reasonForEarly, todayCheckInTime } = req.body;
    let email = req.user.email;
    let response = await addCheckOut({
      email,
      reasonForEarly,
      todayCheckInTime
    });
    if (response.type === "success") {
      res.json(response);
      databaseUtility.logAtomic(
        req.user.email,
        Actions.CHECKOUT_SUCCESSFUL,
        ip
      );
    } else {
      res,
        json({
          type: "error",
          message: Errors.CHECKOUT_FAILED
        });
      databaseUtility.logAtomic(req.user.email, Actions.CHECKOUT_FAILED, ip);
    }
  }
);

//get the checkin and checkout time
router.get(
  "/checktime",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.role !== Roles.USER) {
      return res.json({
        type: "error",
        message: Errors.UNAUTHORIZED
      });
    }
    let email = req.user.email;
    res.json(await getCheckTime(email));
  }
);

getArrayOfDate = async ({ StartDate, EndDate }) => {
  Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };
  let dateArray = new Array();
  let currentDate = StartDate;
  EndDate = new Date(EndDate);
  currentDate = new Date(currentDate);
  while (currentDate <= EndDate) {
    dateArray.push(new Date(currentDate));
    currentDate = currentDate.setDate(currentDate.getDate() + 1);
  }
  return dateArray;
};

//get Next date
getNextDate = TodayDate => {
  let givenDate = new Date(Date.parse(TodayDate));
  givenDate = new Date(givenDate + "Z");
  givenDate.setDate(givenDate.getDate() + 1);
  return givenDate;
};

getTodaysAbsentUser = async shift => {
  let TodaysDate = await getTodayDate();
  TodaysDate = `${TodaysDate} 00:00:00`;
  let nextDate = await getNextDate(TodaysDate);
  let formatedNextDate = new Date(nextDate);
  formatedNextDate = `${formatedNextDate.getFullYear()}-${formatedNextDate.getMonth() +
    1}-${formatedNextDate.getDate()} 00:00:00`;

  let shiftNumber;
  let statement;
  if (shift === "all") {
    statement = `SELECT U.first_name,u.last_name,U.email,U.mobile FROM user_table U WHERE U.type_id = 1 AND U.id NOT IN (SELECT C.userid FROM user_table U LEFT JOIN checklog C ON U.id = C.userid WHERE U.type_id = 1 AND C.checkin >= ? AND C.checkin <= ?)`;
    return await pool
      .execute(statement, [TodaysDate, formatedNextDate])
      .then(results => {
        let data = [];
        for (let result of results[0]) {
          data.push({
            first_name: result.first_name,
            last_name: result.last_name,
            email: result.email,
            mobile: result.mobile,
            date: TodaysDate
          });
        }
        return data;
      })
      .catch(err => console.log(err));
  } else {
    if (shift === "MORNING") {
      shiftNumber = 1;
    } else if (shift === "DAY") {
      shiftNumber = 2;
    } else if (shift === "EVENING") {
      shiftNumber = 3;
    }
    statement = `SELECT U.first_name,u.last_name,U.email,U.mobile FROM user_table U WHERE U.type_id = 1 AND U.shift=? AND U.id NOT IN (SELECT C.userid FROM user_table U LEFT JOIN checklog C ON U.id = C.userid WHERE U.type_id = 1 AND C.checkin >= ? AND C.checkin <= ?)`;
    return pool
      .execute(statement, [shiftNumber, TodaysDate, nextDate])
      .then(results => {
        let data = [];
        for (let result of results[0]) {
          data.push({
            first_name: result.first_name,
            last_name: result.last_name,
            email: result.email,
            mobile: result.mobile,
            date: TodaysDate
          });
        }
        return data;
      })
      .catch(err => console.log(err));
  }
};

getAbsentUserOfDifferntDate = async ({ shift, FromDateOnly, ToDateOnly }) => {
  let StartDate = `${FromDateOnly} 00:00:00`;
  let EndDate = `${ToDateOnly} 00:00:00`;
  StartDate = new Date(StartDate + "Z");
  EndDate = new Date(EndDate + "Z");
  EndDate = await getNextDate(EndDate);
  let currentDate = StartDate;
  let dateArrays = [];
  let datas = [];
  let datass = [];
  while (currentDate < EndDate) {
    dateArrays.push(currentDate);
    currentDate = await getNextDate(currentDate);
  }
  let statement;
  for (let date of dateArrays) {
    formatedFirstDate = `${date.getFullYear()}-${date.getMonth() +
      1}-${date.getDate()} 00:00:00`;
    nextDate = await getNextDate(date);
    formatedNextDate = `${nextDate.getFullYear()}-${nextDate.getMonth() +
      1}-${nextDate.getDate()} 00:00:00`;
    if (shift === "all") {
      statement = `SELECT U.first_name,u.last_name,U.email,U.mobile FROM user_table U WHERE U.type_id = 1 AND U.id NOT IN (SELECT C.userid FROM user_table U LEFT JOIN checklog C ON U.id = C.userid WHERE U.type_id = 1 AND C.checkin >= ? AND C.checkin <= ?)`;
      await pool
        .execute(statement, [formatedFirstDate, formatedNextDate])
        .then(results => {
          for (let result of results[0]) {
            datas.push({
              first_name: result.first_name,
              last_name: result.last_name,
              email: result.email,
              mobile: result.mobile,
              date: formatedFirstDate
            });
          }
        })
        .catch(err => console.log(err));
    } else {
      if (shift === "MORNING") {
        shiftNumber = 1;
      } else if (shift === "DAY") {
        shiftNumber = 2;
      } else if (shift === "EVENING") {
        shiftNumber = 3;
      }
      statement = `SELECT U.first_name,u.last_name,U.email,U.mobile FROM user_table U WHERE U.type_id = 1 AND U.shift=? AND U.id NOT IN (SELECT C.userid FROM user_table U LEFT JOIN checklog C ON U.id = C.userid WHERE U.type_id = 1 AND C.checkin >= ? AND C.checkin <= ?)`;
      await pool
        .execute(statement, [shiftNumber, formatedFirstDate, formatedNextDate])
        .then(results => {
          for (let result of results[0]) {
            datas.push({
              first_name: result.first_name,
              last_name: result.last_name,
              email: result.email,
              mobile: result.mobile,
              date: formatedFirstDate
            });
          }
        })
        .catch(err => console.log(err));
    }
  }
  return datas;
};

router.post(
  "/absent",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.role !== Roles.SUPERADMIN) {
      return res.json({
        type: "error",
        message: Errors.UNAUTHORIZED
      });
    }
    let { shift } = req.body;
    res.json(await getTodaysAbsentUser(shift));
  }
);

//get the absent user of range of date
router.post(
  "/absentOfRangeOfDate",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.role !== Roles.SUPERADMIN) {
      return res.json({
        type: "error",
        message: Errors.UNAUTHORIZED
      });
    }
    let { shift, FromDateOnly, ToDateOnly } = req.body;
    res.json(
      await getAbsentUserOfDifferntDate({ shift, FromDateOnly, ToDateOnly })
    );
  }
);

getTodayDate = () => {
  let date = new Date();
  let month = date.getMonth();
  month++;
  month = month < 10 ? `0` + month : month;
  let fullYear = date.getFullYear();
  let day = date.getDate();
  day = day < 10 ? `0` + day : day;
  let fullDate = `${fullYear}-${month}-${day}`;
  return fullDate;
};

checkCheckIn = async email => {
  let userid = await getUserId(email);
  let fullDate = await getTodayDate();
  fullDate = `${fullDate}%`;
  let statement =
    "SELECT checkin FROM checklog WHERE userid=? AND checkin LIKE ?";
  return await pool
    .execute(statement, [userid, fullDate])
    .then(results => {
      if (results[0].length > 0) {
        return {
          check: "exist"
        };
      } else {
        return {
          check: "notExist"
        };
      }
    })
    .catch(err => {});
};

checkCheckOut = async email => {
  let userid = await getUserId(email);
  let fullDate = await getTodayDate();
  fullDate = `${fullDate}%`;

  let statement =
    "SELECT checkout FROM checklog WHERE userid=? AND checkin LIKE ?";
  return await pool
    .execute(statement, [userid, fullDate])
    .then(results => {
      if (results[0][0].checkout) {
        return {
          check: "Exist"
        };
      } else {
        return {
          check: "notExist"
        };
      }
    })
    .catch(err => {});
};

//check whether the user is checkin or not in that perticular date

router.get(
  "/checkCheckIN",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.role !== Roles.USER) {
      return res.json({
        type: "error",
        message: Errors.UNAUTHORIZED
      });
    }
    let email = req.user.email;
    res.json(await checkCheckIn(email));
  }
);

//check whether the user is checkout or not in that perticular date

router.get(
  "/checkCheckOut",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.role !== Roles.USER) {
      return res.json({
        type: "error",
        message: Errors.UNAUTHORIZED
      });
    }
    let email = req.user.email;
    res.json(await checkCheckOut(email));
  }
);

module.exports = router;
