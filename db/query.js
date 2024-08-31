const { pool } = require("./pool");

module.exports.register = async (fullname, email, username, password) => {
  const dbResponse = await pool.query(
    "INSERT INTO users (fullName, email, userName, password) VALUES ($1, $2, $3, $4)",
    [fullname, email, username, password]
  );
  return dbResponse.rowCount === 1;
};

module.exports.getMessages = async () => {
  const dbResponse = await pool.query(
    "SELECT * FROM message ORDER BY created_time DESC"
  );
  console.log("Messages: ", dbResponse.rows);
  return dbResponse.rows;
};

module.exports.checkEmail = async (email) => {
  const dbresponse = await pool.query("SELECT * FROM users WHERE email=$1", [
    email,
  ]);
  console.log("Email Already Exists: ", dbresponse.rowCount > 0);
  return dbresponse.rowCount > 0;
};

module.exports.checkUsername = async (username) => {
  const dbresponse = await pool.query("SELECT * FROM users WHERE userName=$1", [
    username,
  ]);
  return dbresponse;
};

module.exports.findUserById = async (id) => {
  const dbResponse = await pool.query(
    "SELECT id, fullName, email, userName, membershipStat FROM users WHERE id=$1",
    [id]
  );
  return dbResponse.rows[0];
};

module.exports.giveMemberShip = async (userId) => {
  const dbResponse = await pool.query(
    "UPDATE users SET membershipStat=True WHERE id=$1",
    [userId]
  );
  console.log(dbResponse);
  return dbResponse.rowCount > 0;
};

module.exports.addMessage = async (title, message, userId) => {
  const dbResponse = await pool.query(
    "INSERT INTO message (user_id, title, message) VALUES ($1, $2, $3)",
    [userId, title, message]
  );
  return dbResponse.rowCount === 1;
};

module.exports.getMessageWithUser = async () => {
  const dbresponse = await pool.query(
    "SELECT users.userName AS user, message.title, message.message, message.created_time FROM users JOIN message ON users.id = message.user_id ORDER BY message.created_time DESC;"
  );
  return dbresponse.rows;
};
