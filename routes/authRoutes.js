const express = require('express')
const router = express.Router()

const jwt = require('jsonwebtoken');

router.post('/login', (req, res) => {
if(req.body.username && req.body.password) {
    const username = 'admin', password = 'admin_999'
    if (req.body.username !== username || req.body.password !== password) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({
        user : username
    },process.env.SECRET_KEY, { expiresIn : '1d' })

    res.cookie('token', token, {
        httpOnly : false,
        maxAge : 86400000
    })

    res.status(201).json({
        message: 'User registered successfully'
    })
}
})

module.exports = router