


const { StatusCodes } = require('http-status-codes');
const { jwtHelper } = require('../helper/jwtHelper');
const ApiError = require('../errors/HttpError');

const auth = (...roles) => {
  return async (req, res, next) => {
    try {
      const tokenWithBearer = req.headers.authorization;
      if (!tokenWithBearer) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, 'You are not authorized');
      }

      if (tokenWithBearer && tokenWithBearer.startsWith('Bearer')) {
        const token = tokenWithBearer.split(' ')[1];

        // verify token
        const verifyUser = jwtHelper.verifyToken(token, config.jwt.jwt_secret);

        // attach user to request
        req.user = verifyUser;

        // role-based access check
        if (roles.length && !roles.includes(verifyUser.role)) {
          throw new ApiError(
            StatusCodes.FORBIDDEN,
            "You don't have permission to access this API"
          );
        }

        next();
      }
    } catch (error) {
      next(error);
    }
  };
};

module.exports = auth;
