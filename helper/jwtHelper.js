const jwt = require('jsonwebtoken');

const createToken = (payload, secret, expireTime) => {
  return jwt.sign(payload, secret, { expiresIn: expireTime });
};

const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};

const jwtHelper = { createToken, verifyToken };

module.exports = { jwtHelper };
