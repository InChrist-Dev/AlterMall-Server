const express = require('express');
const { getCart, postCart, updateCart, deleteCart } = require("../controllers/cart_wish");
const customerRouter = express.Router();

customerRouter.get('/cart/:id', getCart);
// customerRouter.get('/wish/:id');

customerRouter.post('/cart/post', postCart);
// customerRouter.post('/wish/post',);

customerRouter.patch('/cart/patch/:id', updateCart);
// customerRouter.patch('/wish/patch/:id');

customerRouter.delete('/cart/delete/:id', deleteCart);
// customerRouter.delete('/wish/delete/:id');

module.exports = customerRouter;