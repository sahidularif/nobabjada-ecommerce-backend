const express = require('express')
const { getAllOrder } = require('../handler/service.handler')
const { Order } = require('../models/Order')
const { isAdmin } = require('../handler/authHelper')
const router = express.Router()

router.get('/getAllOrder', isAdmin, async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).send(orders);
    } catch (err) {
        res.status(500).send(err);
    }
})



module.exports = {
    productRoute: router,
}