const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const contactRoutes = require('./routes/contactRoutes');
const { ensureOrderTables } = require('./models/orderModel');
const { ensureProductTableSetup } = require('./models/productModel');
const { ensureContactTable } = require('./models/contactModel');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/orders', orderRoutes);
app.use('/contact', contactRoutes);

app.get('/', (req, res) => {
  res.send({ message: 'blxck-clone backend is running' });
});

const startServer = async () => {
  try {
    console.log('[Server] Initializing database tables...');
    await ensureProductTableSetup();
    await ensureOrderTables();
    await ensureContactTable();
    
    app.listen(PORT, () => {
      console.log(`[Server] Success! Backend running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('[Server] CRITICAL FAILURE: Could not initialize database.');
    console.error(error);
    process.exit(1);
  }
};

startServer();
