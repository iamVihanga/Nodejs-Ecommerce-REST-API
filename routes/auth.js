const router = require('express').Router();
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { EncryptPassword, DecryptPassword } = require('../lib/PasswordSecure')

// Register User
router.post('/register', async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: EncryptPassword(req.body.password)
    })

    try {
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch (err) {
        res.status(500).json(err)
    }
})

// Login user
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne(
            { $or: [{ username: req.body.identifier }, { email: req.body.identifier }] }
        )

        // Validate user exsits
        !user && res.status(401).json("User not found !")

        // Validate user password
        const decryptedPassword = DecryptPassword(user.password)
        decryptedPassword !== req.body.password && res.status(401).json("Wrong Credentials !")

        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin
            },
            process.env.JWT_SECRET,
            { expiresIn: '3d' }
        )

        // Return success response
        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, jwtToken: accessToken })
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router