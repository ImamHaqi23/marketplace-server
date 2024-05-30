const { Store } = require('../models');

const statusMessage = require('../helpers/statusMessage');

const createStore = async (req, res) => {
  try {
    const payload = req.body;

    const store = await Store.create(payload);

    return statusMessage(res, 201, true, 'Create Store successfully!!', store);
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

const getAllStore = async (req, res) => {
  try {
    const store = await Store.findAll();

    return statusMessage(res, 200, true, 'Get All Store successfully!!', store);
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

const getStoreById = async (req, res) => {
  try {
    const { id } = req.params;

    const store = await Store.findByPk(id);

    return statusMessage(res, 200, true, 'Get Store successfully!!', store);
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

const updateStore = async (req, res) => {
  try {
    const { id } = req.params;

    const payload = req.body;

    const store = await Store.update(payload, { where: { id } });

    return statusMessage(res, 200, true, 'Store updated successfully!!', store);
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

const deleteStore = async (req, res) => {
  try {
    const { id } = req.params;

    const store = await Store.destroy({ where: { id } });

    return statusMessage(res, 200, true, 'Store deleted successfully!!', store);
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
  createStore,
  deleteStore,
  getAllStore,
  getStoreById,
  updateStore,
};
