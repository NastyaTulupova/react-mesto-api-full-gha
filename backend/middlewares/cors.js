// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'localhost:3000',
  'localhost:3001',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://mesto.tulupova.nomoredomainsrocks.ru',
  'https://mesto.tulupova.nomoredomainsrocks.ru',
  'http://api.mesto.tulupova.nomoredomainsrocks.ru',
  'https://api.mesto.tulupova.nomoredomainsrocks.ru',
];

const cors = (req, res, next) => {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  res.header('Access-Control-Allow-Credentials', true);

  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.end();
  }

  return next();
};

module.exports = cors;
