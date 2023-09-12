const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    required: [true, 'Укажите свое имя'],
    minlength: [2, 'Минимальная длина поля "имя" - 2'],
    maxlength: [30, 'Максимальная длина поля "имя" - 30'],
  },
  about: {
    type: String,
    default: 'Исследователь океана',
    required: [true, 'Укажите свою профессию'],
    minlength: [2, 'Минимальная длина поля "профессия" - 2'],
    maxlength: [30, 'Максимальная длина поля "профессия" - 30'],
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    required: [true, 'Добавьте ссылку для аватара'],
  },
  email: {
    type: String,
    required: [true, 'Укажите свой адрес электронной почты'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Заполните поле "Пароль"'],
    select: false,
  },
}, { versionKey: false });

// eslint-disable-next-line func-names
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('user', userSchema);
