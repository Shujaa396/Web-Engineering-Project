const orderModel = require('../models/orderModel');

const createOrder = async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      customerCity,
      customerPostal,
      items
    } = req.body;

    if (!customerName || !customerEmail || !customerAddress) {
      return res.status(400).json({ error: 'Customer details are required' });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Order items are required' });
    }

    const hasInvalidItem = items.some((item) => {
      const quantity = Number.parseInt(item.qty, 10);
      return !item?.name || !Number.isFinite(quantity) || quantity < 1;
    });

    if (hasInvalidItem) {
      return res.status(400).json({ error: 'Invalid order items provided' });
    }

    const order = await orderModel.createOrder({
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      customerCity,
      customerPostal,
      items
    });

    return res.status(201).json({
      message: 'Order saved successfully',
      order
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).json({ error: 'Unable to save order' });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const { email } = req.query;
    const orders = await orderModel.getAllOrders(email);
    return res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return res.status(500).json({ error: 'Unable to fetch orders' });
  }
};

module.exports = {
  createOrder,
  getAllOrders
};
