const router = require('express').Router();
const Cart = require('../models/Cart')
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middlewares/verifyToken')

// Get all cart data [only for admin]
router.get('/', verifyTokenAndAdmin, async (req, res) => {
    try {
        const allCarts = await Cart.find()
        res.status(200).json(allCarts)
    } catch (err) {
        res.status(500).json(err)
    }
})


// Get user cart
router.get('/:userId', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId })
        res.status(200).json(cart)
    } catch (err) {
        res.status(500).json(err)
    }
})


// Create cart
router.post('/create', verifyTokenAndAuthorization, async (req, res) => {
    const newCart = new Cart(req.body)

    try {
        const savedCart = await newCart.save()
        res.status(200).json(savedCart)
    } catch (err) {
        res.status(500).json(err)
    }
})


// Update cart
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updatedCart)
    } catch (err) {
        res.status(500).json(err)
    }
})




module.exports = router