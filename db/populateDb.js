const { Client } = require("pg");

const userSQL = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  fullName VARCHAR(255) NOT NULL,
  userName VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  membershipStat BOOLEAN DEFAULT FALSE
);
`;

const messageSQL = `
CREATE TABLE IF NOT EXISTS message (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  message VARCHAR(255) NOT NULL,
  created_time TIMESTAMPTZ DEFAULT NOW()
);
`;

(async () => {
  try {
    console.log("Connecting to the database...");
    const client = new Client({
      connectionString: `postgresql://${process.env.DBUSER}:${process.env.PASSWORD}@localhost:5432/membersonly`,
    });
    await client.connect();

    // Check if the message table already exists
    const tableExistsMessageQuery = `
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = 'message'
        );
      `;

    const tableExistsUsersQuery = `
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'users'
      );
    `;
    const resultMessage = await client.query(tableExistsMessageQuery);
    const messageTableExists = resultMessage.rows[0].exists;

    const resultUser = await client.query(tableExistsUsersQuery);
    const userTableExists = resultUser.rows[0].exists;

    if (userTableExists) {
      console.log("Table 'users' already exists.");
    } else {
      console.log("Table 'users' does not exist. Creating now...");
      await client.query(userSQL);
      console.log("Table 'users' created successfully.");
    }

    if (messageTableExists) {
      console.log("Table 'message' already exists.");
    } else {
      console.log("Table 'message' does not exist. Creating now...");
      await client.query(messageSQL);
      console.log("Table 'message' created successfully.");
    }

    await client.end();
    console.log("Database operation completed.");
  } catch (error) {
    console.log("An error occurred:", error);
  }
})();
