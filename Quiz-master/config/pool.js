const databaseOptions = {
  connectionLimit: 1000, //important
  host: process.env.HOST,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD,
  port: process.env.DATABASE_PORT,
  multipleStatements: true,
  timezone: "local",
  dateStrings: true
};
const pool = require("mysql2/promise").createPool(databaseOptions);
exports.pool = pool;
