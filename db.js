const mysql = require('mysql2/promise');
const config = require('./dbConfig');

const db = mysql.createPool(config);

// Test the connection immediately
db.getConnection()
  .then(connection => {
    console.log('✅ [DB] Connected to MySQL database: blxck_clone');
    connection.release();
  })
  .catch(err => {
    console.error('❌ [DB] CONNECTION ERROR:', err.message);
    if (err.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('👉 TIP: Your MySQL password in dbConfig.js is likely wrong.');
    } else if (err.code === 'ECONNREFUSED') {
      console.error('👉 TIP: Is your MySQL Server running?');
    }
  });

module.exports = db;