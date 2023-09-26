const { findAllBooks, getBooksByid, createNewBook, updateBook, deleteBook } = require('../controllers/booksController')

const router = require('express').Router()

router.get('/books', findAllBooks)
router.get('/books/:id', getBooksByid)
router.post('/books', createNewBook)
router.patch('/books/:id', updateBook)
router.delete('/books/:id', deleteBook)

module.exports = router