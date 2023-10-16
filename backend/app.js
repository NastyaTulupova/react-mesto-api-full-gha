const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { rateLimit } = require('express-rate-limit');
const cors = require('cors');

const { errors } = require('celebrate');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const router = require('./routes/index');

// Слушаем 3000 порт
const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});

app.use(express.json());
app.use(helmet());
app.use(cookieParser());
app.use(limiter);
app.use(requestLogger);
app.use(cors({
  origin: ['http://localhost:3000','http://mesto.tulupova.nomoredomainsrocks.ru', 'https://mesto.tulupova.nomoredomainsrocks.ru', 'http://api.mesto.tulupova.nomoredomainsrocks.ru', 'https://api.mesto.tulupova.nomoredomainsrocks.ru'],
  credentials: true,
}));

// подключаемся к серверу mongo
mongoose.connect(DB_URL);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадет');
  }, 0);
});

app.use(router);
app.use(errorLogger); // подключаем логгер ошибок
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
