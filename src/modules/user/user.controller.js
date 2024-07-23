import userModel from "../../../Database/models/user.model.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const getAllUsers = async (req, res) => {
    let data = await userModel.findAll({})
    res.json(data)
}


export const register  =  async (req, res) => {
    let { username, password } = req.body
    if (!username || !password) {
        res.json({ success: false, message: 'username and password are required' })
        return
    }
    let user = await userModel.findOne({ where: { username } })
    if (user) {
        res.json({ success: false, message: 'user already exists' })
        return
    }
    let hashedPassword = await bcrypt.hash(password, 10)
    let addedUser = await userModel.create({ username, password: hashedPassword })
    res.json({ message: "user added succesfully", addedUser })
}

export const login =  async (req, res) => {
    let { username, password } = req.body
    if (!username || !password) {
        res.json({ success: false, message: 'username and password are required' })
        return
    }
    let user = await userModel.findOne({ where: { username } })
    if (!user) {
        res.json({ success: false, message: 'user not found' })
        return
    }
    let isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        res.json({ success: false, message: 'password is not correct' })
        return
    }
    let token = jwt.sign({ id: user.id }, "route")
    res.json({ success: true, message: 'user logged in successfully', token })
}