const express = require('express')
const router = express.Router()

const Book = require('../models/book')


const store = {
    books: [
      new Book(),
      new Book(),
    ],
  };
 
// получить все книги | получаем массив всех книг
router.get('/', (req, res) => {
    const { books } = store;
    res.json(books);
  });
 
// получить книгу по **ID** | получаем объект книги, если запись не найдена, вернём **Code: 404** 
router.get('/:id', (req, res) => {
    const { books } = store;
    const { id } = req.params;
    const idx = books.findIndex((el) => el.id === id); 
    if (idx !== -1) {
      res.json(books[idx]);
    } else {
      res.status(404);
      res.json('404 | книга не найдена');
    }
  });

// создать книгу | создаём книгу и возвращаем её же вместе с присвоенным **ID**
router.post('/', (req, res) => {
    const { books } = store;
    const data = req.body;
  
    const newBook = new Book(data);
    books.push(newBook);
  
    res.status(201);
    res.json(newBook);
  });


// редактировать книгу по **ID** | редактируем объект книги, если запись не найдена, вернём **Code: 404**
  router.put('/:id', (req, res) => {
    const { books } = store;
    const {
      title, description, authors, favorite, fileCover, fileName,
    } = req.body;
    const { id } = req.params;
    const idx = books.findIndex((el) => el.id === id);
  
    if (idx !== -1) {
      books[idx] = {
        ...books[idx],
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName,
      };
  
      res.json(books[idx]);
    } else {
      res.status(404);
      res.json('404 | книга не найдена');
    }
  });
  
  // удалить книгу по **ID** | удаляем книгу и возвращаем ответ: **'ok'**
  router.delete('/:id', (req, res) => {
    const { books } = store;
    const { id } = req.params;
    const idx = books.findIndex((el) => el.id === id);
  
    if (idx !== -1) {
      books.splice(idx, 1);
      res.json('ok');
    } else {
      res.status(404);
      res.json('404 | книга не найдена');
    }
  });

module.exports = router