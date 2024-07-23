export const getAllBooks =  async (req, res) => {
    let data = await BorrowingModel.findAll({})
    res.json(data)
}


export const addBook =  async (req, res) => {
    const { bookId } = req.body;
    const book = await BorrowingModel.findOne({
        where: {
            bookId,
            returnedAt: null
        }
    });
    if (!book) {
        res.json({ success: false, message: 'Book not available' });
        return;
    }
    const borrowing = await BorrowingModel.create({
        userId: req.user.id,
        bookId
    });

    res.json({ success: true, message: 'Book borrowed successfully', borrowing });
}


export const updateBook =  async (req, res) => {
    const borrowing = await BorrowingModel.findByPk(req.params.id);
    if (!borrowing) {
        res.json({ success: false, message: 'Borrowing not found' });
        return;
    }
    if (borrowing.userId !== req.user.id) {
        res.json({ success: false, message: 'You are not the owner of this borrowing' });
        return;
    }
    await borrowing.update({
        returnedAt: new Date()
    });
    res.json({ success: true, message: 'Book returned successfully', borrowing });
}


export const borrowed =  async (req, res) => {
    const borrowings = await BorrowingModel.findAll({
        where: {
            userId: req.user.id,
            returnedAt: null
        }
    });
    res.json({ success: true, borrowings });
}