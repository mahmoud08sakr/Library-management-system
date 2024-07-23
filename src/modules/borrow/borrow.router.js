import { Router } from 'express';
import BorrowingModel from '../../../Database/models/borrowing.model.js';
import { auth } from '../../middelware/auth.js';
import { addBook, borrowed, getAllBooks, updateBook } from './borrow.controler.js';
const router = Router();


router.get("/", auth,getAllBooks)
router.post("/borrow", auth,addBook);
router.put("/return/:id", auth,updateBook);
router.get("/borrowed", auth, borrowed );


export default router