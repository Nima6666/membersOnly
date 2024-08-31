const { Pool } = require("pg");

module.exports.pool = new Pool({
  host: "localhost",
  user: process.env.DBUSER,
  password: process.env.PASSWORD,
  port: 5432, // The default port
  database: "membersonly",
});
