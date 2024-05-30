const { Transaction, Product } = require('../models');

const { sequelize } = require('../models');

const statusMessage = require('../helpers/statusMessage');

const createTransaction = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { productId, amount, paymentMethod } = req.body;
    const product = await Product.findByPk(productId, { transaction: t });

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
        UserId: req.user.id,
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
    return statusMessage(res, 500, false, 'Internal server error', error);
  }
};

const getTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findAll();
    return statusMessage(
      res,
      200,
      true,
      'Get Transaction successfully',
      transaction
    );
  } catch (error) {
    return statusMessage(res, 500, false, 'Internal server error', error);
  }
};

module.exports = { createTransaction, getTransaction };
