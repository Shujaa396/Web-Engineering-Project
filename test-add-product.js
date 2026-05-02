const http = require('http');

// Test adding a product
const productData = {
  name: 'Test Product',
  price: 5000,
  image: 'https://example.com/test.jpg',
  description: 'This is a test product'
};

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/products',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(JSON.stringify(productData))
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
      fetchAllProducts();
    }, 1000);
  });
});

req.on('error', (e) => {
  console.error(`❌ Error:`, e.message);
});

req.write(JSON.stringify(productData));
req.end();

function fetchAllProducts() {
  const getOptions = {
    hostname: 'localhost',
    port: 3000,
    path: '/products',
    method: 'GET'
  };

  const getReq = http.request(getOptions, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      console.log('\n📊 All Products in Database:');
      const products = JSON.parse(data);
      console.log(JSON.stringify(products, null, 2));
      process.exit(0);
    });
  });

  getReq.on('error', (e) => {
    console.error(`❌ Error fetching products:`, e.message);
    process.exit(1);
  });

  getReq.end();
}
