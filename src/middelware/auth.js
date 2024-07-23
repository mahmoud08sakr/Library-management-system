import jwt from 'jsonwebtoken'
export const auth = async (req, res, next) => {
    const { token } = req.headers
    if (!token) {
        return res.status(401).json({ success: false, message: 'unauthorized' })
    }
    jwt.verify(token, 'route', (err, decoded) => {
        if (err) {
            return res.status(401).json({ success: false, message: 'unauthorized' })
        }
        req.user = decoded
        next()
    })
}