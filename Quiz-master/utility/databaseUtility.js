const pool = require("../config/pool").pool;
exports.logAtomic = async (email, action, ip) => {
  let log =
    "INSERT INTO activity_log(log_user,log_event,ip) VALUES (?,?,INET_ATON(?))";
  return await pool
    .query(log, [email, action, ip])
    .then(() => true)
    .catch(err => false);
};
