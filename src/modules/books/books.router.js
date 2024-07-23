import { Router } from 'express';
import BookModel from '../../../Database/models/book.model.js';
import { auth } from '../../middelware/auth.js';
import { addBook, deleteBook, getAllBooks, listBooks, searchBooks, updateBook } from './books.controller.js';
const router = Router();

router.get('/' , auth ,getAllBooks);
router.post("/addBook", auth, addBook);
router.put("/:id", auth,updateBook);
router.delete("/:id", auth, deleteBook );
router.get("/list", listBooks);
router.get("/search", searchBooks);

export default router