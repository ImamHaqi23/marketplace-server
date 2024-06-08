const { Transaction, Product } = require('../models');
const { sequelize } = require('../models');
const statusMessage = require('../helpers/statusMessage');

const createTransaction = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { ProductId, amount, paymentMethod } = req.body;

    const product = await Product.findByPk(ProductId, { transaction: t });

    if (!product || product.stock < amount) {
      await t.rollback();
      return statusMessage(
        res,
        404,
        false,
        'Product not found or insufficient stock'
      );
    }

    const total = product.price * amount;

    const transaction = await Transaction.create(
      {
        UserId: req.decoded.id,
        ProductId,
        amount,
        total,
        paymentMethod,
      },
      { transaction: t }
    );

    await product.update({ stock: product.stock - amount }, { transaction: t });

    await t.commit();
    statusMessage(
      res,
      201,
      true,
      'Transaction created successfully',
      transaction
    );
  } catch (error) {
    await t.rollback();
    return statusMessage(
      res,
      500,
      false,
      'Internal server error',
      error.message
    );
  }
};

const getTransaction = async (req, res) => {
  try {
    const transactions = await Transaction.findAll();
    return statusMessage(
      res,
      200,
      true,
      'Get Transaction successfully',
      transactions
    );
  } catch (error) {
    return statusMessage(
      res,
      500,
      false,
      'Internal server error',
      error.message
    );
  }
};

module.exports = { createTransaction, getTransaction };
