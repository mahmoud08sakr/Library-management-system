import express, { json } from 'express'
import userRoutes from './src/modules/user/user.router.js'
import postRouter from './src/modules/books/books.router.js'
import borrowingRouter from './src/modules/borrow/borrow.router.js'
const app = express()
const port = 3000

app.use(json())
app.use('/users', userRoutes)
app.use('/books', postRouter)
app.use('/borrow', borrowingRouter)


app.get('/', (req, res) => res.send('Hello World!'))

app.post('/', (req, res) => {
    console.log(req.body)
    res.json({ success: true })
})

app.listen(port, () => console.log(`Example app listening at http://localhost:3000`))