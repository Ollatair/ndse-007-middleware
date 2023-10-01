const express = require('express');
const { v4: uuid } = require('uuid');

const user = require('./routes/user')
const book = require('./routes/book')



const app = express();
app.use(express.json());
app.use('/api/books', user);
app.use('/api/books', book);



 
const PORT = process.env.PORT || 3000;
app.listen(PORT);
