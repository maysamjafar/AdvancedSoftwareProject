// db.js
const mysql = require('mysql');

// Create a MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10, // Adjust according to your needs
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'advance'
});

// Test the connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
  connection.release(); // Release the connection back to the pool
});

module.exports = pool;
