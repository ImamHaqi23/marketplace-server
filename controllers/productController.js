const { Product } = require('../models');

const statusMessage = require('../helpers/statusMessage');

const createProduct = async (req, res) => {
  try {
    const payload = req.body;

    const product = await Product.create(payload);

    return statusMessage(
      res,
      201,
      true,
      'Create Product successfully!!',
      product
    );
  } catch (error) {
    return statusMessage(
      res,
      500,
      false,
      'Internal server error!!',
      error.message
    );
  }
};

const getAllProduct = async (req, res) => {
  try {
    const product = await Product.findAll();

    return statusMessage(
      res,
      200,
      true,
      'Get All Product successfully!!',
      product
    );
  } catch (error) {
    return statusMessage(
      res,
      500,
      false,
      'Internal server error!!',
      error.message
    );
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    return statusMessage(res, 200, true, 'Get Product successfully!!', product);
  } catch (error) {
    return statusMessage(
      res,
      500,
      false,
      'Internal server error!!',
      error.message
    );
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const payload = req.body;

    const product = await Product.update(payload, { where: { id } });

    return statusMessage(
      res,
      200,
      true,
      'Product updated successfully!!',
      product
    );
  } catch (error) {
    return statusMessage(
      res,
      500,
      false,
      'Internal server error!!',
      error.message
    );
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.destroy({ where: { id } });

    return statusMessage(
      res,
      200,
      true,
      'Product deleted successfully!!',
      product
    );
  } catch (error) {
    return statusMessage(
      res,
      500,
      false,
      'Internal server error!!',
      error.message
    );
  }
};

module.exports = {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProductById,
  updateProduct,
};
