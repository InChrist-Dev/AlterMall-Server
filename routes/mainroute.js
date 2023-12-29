const express = require('express');
const { renderDefault, getItems, getItemsPage } = require("../controllers/page.js");
const { getSeller } = require('../controllers/seller.js');
const router = express.Router();

// 상품 정보
router.get('/', renderDefault);
router.get('items/', getItems);
router.get('/items/:id', getItems);



//판매자 정보
router.get('/seller/:id?', getSeller);

module.exports = router;