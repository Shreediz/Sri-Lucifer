const pool = require("../config/pool").pool;
module.exports = async (id, slug) => {
  console.log("id",id + "slug" , slug)

  let statement =
    "SELECT user_id AS id FROM modules INNER JOIN module_permission ON modules.id=module_permission.module_id WHERE user_id=? AND slug=?; ";
    console.log("id",id + "slug" , slug)
  return await pool
    .query(statement, [id, slug])
    .then(results => {
      if (results[0].length > 0) {
        return true;
      } else {
        return false;
      }
    })
    .catch(err => {
      console.log("Inside catch Block", err);
      return { authorized: false };
    });
};
