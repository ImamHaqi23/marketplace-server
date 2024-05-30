const statusMessage = require('../helpers/statusMessage');

const authorization = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      console.log(req.user.role);
      console.log(role);
      return statusMessage(
        res,
        401,
        false,
        'You do not have permission to perform this action'
      );
    }
    next();
  };
};

module.exports = authorization;
