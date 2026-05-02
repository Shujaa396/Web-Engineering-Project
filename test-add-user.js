const http = require('http');

// Test adding a user
const userData = {
  name: 'Test User',
  email: 'test@example.com',
  phone: '03001234567',
  address: '123 Test Street',
  city: 'Karachi',
  postal: '75000'
};

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/users',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(JSON.stringify(userData))
  }
};

const req = http.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('✅ Response Status:', res.statusCode);
    console.log('✅ Response:', data);
    
    // Now fetch from database to verify
    setTimeout(() => {
      fetchAllUsers();
    }, 1000);
  });
});

req.on('error', (e) => {
  console.error(`❌ Error:`, e.message);
});

req.write(JSON.stringify(userData));
req.end();

function fetchAllUsers() {
  const getOptions = {
    hostname: 'localhost',
    port: 3000,
    path: '/users',
    method: 'GET'
  };

  const getReq = http.request(getOptions, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      console.log('\n📊 All Users in Database:');
      const users = JSON.parse(data);
      console.log(JSON.stringify(users, null, 2));
      process.exit(0);
    });
  });

  getReq.on('error', (e) => {
    console.error(`❌ Error fetching users:`, e.message);
    process.exit(1);
  });

  getReq.end();
}
