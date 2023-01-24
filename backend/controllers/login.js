const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
const UnauthorizedError = require('../utils/errors/unauthorized-error');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Передан неверный логин или пароль');
      }
      return bcrypt
        .compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Передан неверный логин или пароль');
          }
          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
            {
              expiresIn: '7d',
            },
          );
          res.status(200).send({ token });
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};
