const { Book } = require('../models')

const findAllBooks = async (req, res) => {
    try {
        const data = await Book.findAll()
        const result = {
            status: "oke",
            data: data
        }

        res.status(200).json(result)
    } catch (error) {
        console.log(error, "find all books")
    }
}

const getBooksByid = async (req, res) => {
    try {
        // kita harus mendapatkan request param id
        const id = parseInt(req.params.id) // mendapatkan request params id
        const data = await Book.findOne({
            where: {id: id}, 
            attributes: {exclude: ['createdAt', 'updatedAt']}})

        const result = {
            status: "oke",
            data: data
        }

        res.status(200).json(result)
    } catch (error) {
        console.log(error, "not found")
    }
}

const createNewBook = async (req, res) => {
    try {
        const {title, description} = req.body

        const newBook = await Book.create({
            title: title,
            description: description
        })

        res.status(201).json({
            status: "ok",
            data: {
                id: newBook.id,
                title: newBook.title,
                description: newBook.description,
                createdAt: newBook.createdAt
            }
        })
    } catch (error) {
        console.log(error, "create new book")
    }
}

const updateBook = async (req, res) => {
    // kita harus mendapatkan request param id
    const id = parseInt(req.params.id)  // mendapatkan request param id

    // kita harus mendapatkan request body -> title dan description
    const {title, description} = req.body

    const book = await Book.findByPk(id)

    if (!book) {
        res.status(404).json({
            status: "failed",
            message: "data not found"
        })
    }

    // baru kita update data
    book.title = title
    book.description = description
    
    book.save()

    // return response
    res.status(200).json({
        status: "ok",
        data: book
    })
}

const deleteBook = async (req, res) => {
    // kita harus mendapatkan request param id
    const id = parseInt(req.params.id) // mendapatkan request param id

    const book = await Book.findByPk(id)

    if (!book) {
        return res.status(404).json({
            status: "failed",
            message: "data not found"
        })
    }

    book.destroy()
    res.status(200).json({
        status: "ok",
        data: book
    })

}

module.exports = {findAllBooks, getBooksByid, createNewBook, updateBook, deleteBook} 