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

router.get("/", async (req, res) => {
  res.json("Testing the quiz");
});



addQuizQuestion = async ({ question, answer, option, category }) => {
 let id = pool.query("SELECT id FROM category WHERE c_name=?",category).then(results=>{
    console.log("results",results)
    if(results.length>0){
      return (
         results[0]
      )
    }
  })
  console.log("id",id)
  const connection = await pool.getConnection();

  // let statement1= "SELECT id FROM category WHERE c_name=?";
  let statement = "INSERT INTO quiz (question,cat_id) VALUES (?,?)";
  try {
    await connection.beginTransaction();
    // let {cat_id} = await connection.execute(statement1,categories)

    let { isRecorded } = await connection
      .execute(statement, [question, getCategoryId])
      .then(result => {
        return { isRecorded: true };
      })
      .catch(err => {
        return { isRecorded: false };
      });
    if (!isRecorded) {
      throw "Failed to Record";
    }
    let id;
    let getId = `SELECT id FROM quiz ORDER BY "id" DESC LIMIT 1`;
    connection
      .execute(getId)
      .then(result => {
        id = result[0];
      })
      .catch(err => {
        console.log("error while getting the id");
      });
    let recordAnswer = "INSERT INTO answer (answer ,option ,quiz_id) VALUES (?,?,?)";
    for (let ans of answer) {
      let i = 0;
      let {anss} = ans;
      if(option === i){
        let { isAdded } = await connection
        .execute(recordAnswer, [anss,"yes", id])
        .then(result => {
          return { isAdded: true };
        })
        .catch(err => {
          return { isAdded: false };
        });
      }else{
        let { isAdded } = await connection
        .execute(recordAnswer, [anss,"no", id])
        .then(result => {
          return { isAdded: true };
        })
        .catch(err => {
          return { isAdded: false };
        });
      }
     
        if (!isAdded) {
          throw "Failed to add answer";
        }
    }
    await connection.commit();
    return { isRecorded, orderId };
  } catch (e) {
    await connection.rollback();
    return { isRecorded: false };
  } finally {
    connection.release();
  }
};

//@Route POST api/quiz/
//record the Quiz Question

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { question, ip , answer , option , categories
  } = req.body;
    const { email } = req.user;
    // let {errors,isValid} = await validateQuizQuestion(req.body);
    let isValid = true;
    if (!isValid) {
      return res.status(400).json({ errors: errors });
    }

    let { isRecorded } = await addQuizQuestion({
      question,
      answer,
      category,
      option
    });
    if (isRecorded) {
      res.json({ type: "success", message: Errors.ADD_QUIZ_QUESTION });
      databaseUtility.logAtomic(email, Action.ADD_QUIZ_QUESTION, ip);
    } else {
      res.json({ type: "error", message: Errors.ADD_QUIZ_QUESTION_FAILED });
      databaseUtility.logAtomic(email, Action.ADD_QUIZ_QUESTION_FAILED, ip);
    }
  }
);

module.exports = router;
