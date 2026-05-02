const mysql = require('mysql2/promise');

async function testConnection() {
  try {
    console.log('Testing MySQL connection...');
    
    const db = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: 'Root#123',
      database: 'blxck_clone'
    });

    // Test connection
    const connection = await db.getConnection();
    console.log('✅ Connected to MySQL!');
    
    // Check if users table exists
    const [tables] = await connection.execute('SHOW TABLES LIKE "users"');
    console.log('Tables found:', tables);
    
    if (tables.length === 0) {
      console.log('❌ Users table does not exist!');
      console.log('Creating users table...');
      
      await connection.execute(`
        CREATE TABLE users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255),
          email VARCHAR(255) UNIQUE,
          phone VARCHAR(20),
          address VARCHAR(255),
          city VARCHAR(100),
          postal VARCHAR(20)
        )
      `);
      console.log('✅ Users table created!');
    } else {
      console.log('✅ Users table exists!');
    }
    
    // Check existing users
    const [users] = await connection.execute('SELECT COUNT(*) as count FROM users');
    console.log('Total users in database:', users[0].count);
    
    connection.release();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testConnection();
