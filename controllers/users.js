const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send({ mesage: 'Internal server error', err: err.message, stack: err.stack }));
};

const getUsersById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.status(200).send(user))
    .catch((err) => res.status(500).send({ mesage: 'Internal server error', err: err.message, stack: err.stack }));
};

const createUser = (req, res) => {
  User.create(req.body)
    .then((user) => res.status(201).send(user))
    .catch((err) => res.status(500).send({ mesage: 'Internal server error', err: err.message, stack: err.stack }));
};

module.exports = {
  getUsers,
  getUsersById,
  createUser,
};
