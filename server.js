if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const authRoutes = require('./routes/auth')
const productsRoutes = require('./routes/product')
const cartRoutes = require('./routes/cart')
const orderRoutes = require('./routes/order')

// Middlewares
app.use(express.json())

// API Routes
app.use('/api/auth', authRoutes)

app.use('/api/users', userRoutes)

app.use('/api/products', productsRoutes)

app.use('/api/carts', cartRoutes)

app.use('/api/orders', orderRoutes)


// Connect DB, Listen to server
const PORT = process.env.PORT || 3000
mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        console.log(`MongoDB Connected..!`)
        app.listen(PORT, () => console.log(`Backend server is started ! (Port: ${PORT})`))
    })
    .catch(() => {
        console.log('Database connection failed.')
    })