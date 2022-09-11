const router = require('express').Router();
const Order = require('../models/Order')
const { verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken } = require('../middlewares/verifyToken')

// Get all orders
router.get('/', verifyTokenAndAdmin, async (req, res) => {
    try {
        const allOrders = await Order.find()
        res.status(200).json(allOrders)
    } catch (err) {
        res.status(500).json(err)
    }
})

// Get all orders by user id
router.get('/user/:userId', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const allOrders = await Order.find({ userId: req.params.userId })
        res.status(200).json(allOrders)
    } catch (err) {
        res.status(500).json(err)
    }
})


// Get order by id
router.get('/:orderId', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId)
        res.status(200).json(order)
    } catch (err) {
        res.status(500).json(err)
    }
})


// Create order
router.post('/create', verifyToken, async (req, res) => {
    const newOrder = new Order(req.body)

    try {
        const savedOrder = await newOrder.save()
        res.status(200).json(savedOrder)
    } catch (err) {
        res.status(500).json(err)
    }
})

// Update order
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updatedOrder)
    } catch (err) {
        res.status(500).json(err)
    }
})

// Delete order
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order has been deleted !")
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router