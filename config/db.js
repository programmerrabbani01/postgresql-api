import pkg from "pg";

// Destructure Pool

const { Pool } = pkg;

// Connection configuration

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "798022",
  database: "students",
  port: 5432,
});

export default pool;
