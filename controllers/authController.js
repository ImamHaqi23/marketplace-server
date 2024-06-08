const jwt = require('jsonwebtoken');
const byscript = require('bcryptjs');

const { User } = require('../models');

const statusMessage = require('../helpers/statusMessage');

const register = async (req, res) => {
  try {
    const payload = req.body;

    const user = await User.create(payload);

    return statusMessage(res, 201, true, 'Register successfully!!', user);
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

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await byscript.compare(password, user.password))) {
      return statusMessage(res, 401, false, 'Invalid email or password!!');
    }

    const payloadToken = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payloadToken, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return statusMessage(res, 200, true, 'Login successfully!!', {
      id: user.id,
      username: user.username,
      token: `Bearer ${token}`,
    });
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

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    return statusMessage(res, 200, true, 'Get User successfully!!', user);
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

const getAllUser = async (req, res) => {
  try {
    const user = await User.findAll();
    return statusMessage(res, 200, true, 'Get All User successfully!!', user);
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

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.destroy({ where: { id } });
    return statusMessage(res, 200, true, 'User deleted successfully!!', user);
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

module.exports = { register, login, deleteUser, getUserById, getAllUser };
