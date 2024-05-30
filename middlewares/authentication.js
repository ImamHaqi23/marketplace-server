const jwt = require('jsonwebtoken');
const { User } = require('../models');

const statusMessage = require('../helpers/statusMessage');

const authentication = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id);
        if (user) {
          req.user = user;
          next();
        } else {
          statusMessage(res, 401, false, 'Unauthenticated user!!');
        }
      } else {
        statusMessage(res, 401, false, 'Invalid token!!');
      }
    } else {
      statusMessage(res, 401, false, 'Token not provided!!');
    }
  } catch (error) {
    statusMessage(res, 500, false, error.message);
  }
};

module.exports = authentication;
