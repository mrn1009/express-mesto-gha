const Card = require('../models/card');
const {
  BAD_REQ,
  NOT_FOUND,
  DEFAULT_ERROR,
} = require('./errors');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() => res.status(DEFAULT_ERROR).send({ message: 'Ошибка по умолчанию' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.message.includes('validation failed')) {
        res.status(BAD_REQ).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(DEFAULT_ERROR).send({ message: 'Ошибка по умолчанию' });
      }
    });
};

// удаление карточки
const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => new Error('Not Found'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQ).send({ message: 'Переданы некорректные данные' });
      } else if (err.message === 'Not Found') {
        res.status(NOT_FOUND).send({ message: 'Передан несуществующий _id карточки' });
      } else {
        res.status(DEFAULT_ERROR).send({ message: 'Ошибка по умолчанию' });
      }
    });
};

// постановка лайка
const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new Error('Not Found'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQ).send({ message: 'Переданы некорректные данные' });
      } else if (err.message === 'Not Found') {
        res.status(NOT_FOUND).send({ message: 'Передан несуществующий _id карточки' });
      } else {
        res.status(DEFAULT_ERROR).send({ message: 'Ошибка по умолчанию' });
      }
    });
};

// удаление лайка
const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new Error('Not Found'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQ).send({ message: 'Переданы некорректные данные' });
      } else if (err.message === 'Not Found') {
        res.status(NOT_FOUND).send({ message: 'Передан несуществующий _id карточки' });
      } else {
        res.status(DEFAULT_ERROR).send({ message: 'Ошибка по умолчанию' });
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
