const express = require('express');
const { getDefault, getItems } = require("../controllers/page.js");
const { getSeller } = require('../controllers/seller.js');
const router = express.Router();


//기본 페이지
router.get('/', getDefault);


// 상품 정보
router.get('/items/:id?', getItems);


//판매자 정보
router.get('/seller/:id?', getSeller);

module.exports = router;