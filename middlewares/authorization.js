const statusMessage = require('../helpers/statusMessage');

const authorizationBuyer = (req, res, next) => {
  try {
    const user = req.decoded;
    console.log(user.role);

    if (user.role == 'BUYER') {
      next();
    } else {
      return statusMessage(
        res,
        401,
        false,
        'You do not have permission to perform this action'
      );
    }
  } catch (error) {
    return statusMessage(res, 500, false, error.message);
  }
};

const authorizationSeller = (req, res, next) => {
  try {
    const user = req.decoded;
    console.log(user.role);

    if (user.role === 'SELLER') {
      next();
    } else {
      return statusMessage(
        res,
        401,
        false,
        'You do not have permission to perform this action'
      );
    }
  } catch (error) {
    return statusMessage(res, 500, false, error.message);
  }
};

module.exports = {
  authorizationBuyer,
  authorizationSeller,
};
