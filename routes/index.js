const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const NotFoundError = require('../errors/not-found-err');

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);

router.use('*', (req, res) => {
  res.status(NotFoundError).send({ message: 'Страница не найдена' });
});

module.exports = router;
