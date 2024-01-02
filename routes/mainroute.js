const express = require('express');
const categoryRouter = require('./categoryRoute.js');
const userRouter = require('./userRoute.js');
const customerRouter = require('./customerRoute.js');

const router = express.Router();

//상품관련 라우터
router.use('/category', categoryRouter);
//계정관련 라우터
router.use('/user', userRouter);
//구매자관련 - 장바구니, 찜, 주문
router.use('/customer', customerRouter);

//Not Found
router.use((req, res) => {
    res.status(404).send('Not Found');
});

module.exports = router;