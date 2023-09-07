const User = require('../models/user');
const {
  BAD_REQ,
  NOT_FOUND,
  DEFAULT_ERROR,
} = require('./errors');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() => res.status(DEFAULT_ERROR).send({ message: 'Ошибка по умолчанию' }));
};

const getUsersById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => new Error('Not Found'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQ).send({ message: 'Переданы некорректные данные' });
      } else if (err.message === 'Not Found') {
        res.status(NOT_FOUND).send({ message: 'Запрашиваемый пользователь не найден' });
      } else {
        res.status(DEFAULT_ERROR).send({ message: 'Ошибка по умолчанию' });
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQ).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(DEFAULT_ERROR).send({ message: 'Ошибка по умолчанию' });
      }
    });
};

// обновляет профиль
const updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => new Error('Not Found'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQ).send({ message: 'Переданы некорректные данные' });
      } else if (err.message === 'Not Found') {
        res.status(NOT_FOUND).send({ message: 'Запрашиваемый пользователь не найден' });
      } else {
        res.status(DEFAULT_ERROR).send({ message: 'Ошибка по умолчанию' });
      }
    });
};

// обновляет аватар
const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(() => new Error('Not Found'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQ).send({ message: 'Переданы некорректные данные' });
      } else if (err.message === 'Not Found') {
        res.status(NOT_FOUND).send({ message: 'Запрашиваемый пользователь не найден' });
      } else {
        res.status(DEFAULT_ERROR).send({ message: 'Ошибка по умолчанию' });
      }
    });
};

module.exports = {
  getUsers,
  getUsersById,
  createUser,
  updateProfile,
  updateAvatar,
};
