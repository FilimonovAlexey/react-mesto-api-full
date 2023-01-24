const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/errors/unauthorized-error');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Передан неверный токен'));
  }
  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch {
    return next(new UnauthorizedError('Передан неверный токен'));
  }

  req.user = payload;
  return next();
};
