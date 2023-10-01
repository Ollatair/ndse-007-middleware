const express = require('express');

const user = require('./routes/user');
const book = require('./routes/book');
const error404 = require('./middleware/err-404');

const app = express();
app.use(express.json());
app.use('/public', express.static(`${__dirname}/public`));
app.use('/api/user', user);
app.use('/api/books', book);

app.use(error404);

const PORT = process.env.PORT || 3000;
app.listen(PORT);
