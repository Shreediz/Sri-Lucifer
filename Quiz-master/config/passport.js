const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const pool = require("./pool").pool;
const keys = require("./keys");
const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  let user = {};

  passport.use(
    new JwtStrategy(options, async (jwt_payload, next) => {
      await pool
        .query(
          "SELECT email,type_id AS role FROM user_table WHERE id=?;",
          jwt_payload.user
        )
        .then(userInfo => {
          if (userInfo[0][0].email) {
            user.email = userInfo[0][0].email;
            user.id = jwt_payload.user;
            user.role = userInfo[0][0].role;
            return next(null, user);
          } else {
            return null, false;
          }
        })
        .catch(err => err);
    })
  );
};
