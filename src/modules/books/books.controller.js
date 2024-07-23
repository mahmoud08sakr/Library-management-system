import { Op } from "sequelize";
import BookModel from "../../../Database/models/book.model.js";


export const getAllBooks = async (req, res) => {
    let books = await BookModel.findAll({});
    res.json({ success: true, books });
}

export const addBook = async (req, res) => {
    const { title, author, genre } = req.body;
    if (!title || !author || !genre) {
        res.json({ success: false, message: 'title, author, and genre are required' });
        return;
    }
    let book = await BookModel.create({ title, author, genre });
    res.json({ success: true, message: 'book added successfully', book });
}

export const updateBook = async (req, res) => {
    const { title, author, genre } = req.body;
    if (!title || !author || !genre) {
        res.json({ success: false, message: 'title, author, and genre are required' });
        return;
    }
    let book = await BookModel.findByPk(req.params.id);
    if (!book) {
        res.json({ success: false, message: 'book not found' });
        return;
    }
    await book.update({ title, author, genre });
    res.json({ success: true, message: 'book updated successfully', book });
}

export const deleteBook = async (req, res) => {
    let book = await BookModel.findByPk(req.params.id);
    if (!book) {
        res.json({ success: false, message: 'book not found' });
        return;
    }
    await book.destroy();
    res.json({ success: true, message: 'book deleted successfully' });
}
export const listBooks = async (req, res) => {
    let books = await BookModel.findAll({});
    res.json({ success: true, books });
}
export const searchBooks = async (req, res) => {
    const { title, author, genre } = req.query;
    let books = await BookModel.findAll({
        where: {
            title: { [Op.like]: `%${title}%` },
            author: { [Op.like]: `%${author}%` },
            genre: { [Op.like]: `%${genre}%` }
        }
    });
    res.json({ success: true, books });
}