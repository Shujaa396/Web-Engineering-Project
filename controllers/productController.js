const productModel = require('../models/productModel');

const getProducts = async (req, res) => {
  try {
    const products = await productModel.getAllProducts();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to fetch products' });
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.getProductById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to fetch product' });
  }
};

const addProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      quantity,
      image,
      extra_images,
      description,
      category,
      subtitle,
      original_price,
      badge,
      rating,
      reviews_count,
      is_out_of_stock
    } = req.body;

    if (!name || !price || !image || !description || !category) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const result = await productModel.createProduct({
      name,
      price,
      quantity,
      image,
      extra_images,
      description,
      category,
      subtitle,
      original_price,
      badge,
      rating,
      reviews_count,
      is_out_of_stock
    });

    res.status(201).json(result);
  } catch (error) {
    console.error('REAL ERROR:', error.sqlMessage || error);
res.status(500).json({ message: error.sqlMessage || 'Unable to add product' });
  }
};


const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      price,
      quantity,
      image,
      extra_images,
      description,
      category,
      subtitle,
      original_price,
      badge,
      rating,
      reviews_count,
      is_out_of_stock
    } = req.body;

    if (!name || !price || !image || !description || !category) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const result = await productModel.updateProduct(id, {
      name,
      price,
      quantity,
      image,
      extra_images,
      description,
      category,
      subtitle,
      original_price,
      badge,
      rating,
      reviews_count,
      is_out_of_stock
    });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to update product' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await productModel.deleteProduct(id);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to delete product' });
  }
};

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct
};
