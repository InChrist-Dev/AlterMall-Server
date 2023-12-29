const express = require('express');
const { getDefault, getItems } = require("../controllers/page.js");
const { getSeller } = require('../controllers/seller.js');
const router = express.Router();


//기본 페이지

router.get('/', getDefault);


// 상품 정보
/**
 * @swagger
 *  /items?p=page:
 *    get:
 *      tags:
 *      - 상품
 *      description: 모든 제품을 페이지별 조회 ?p={num}을 통해 페이지 변경 페이지 입력 없으면 1로 검색
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: query
 *          name: p
 *          required: false
 *          schema:
 *            type: integer
 *            description: 페이지
 *      responses:
 *       200:
 *        description: {"items":[{"item_id":"1","item_name":"no_gluten cake","price":8500,"amount":30,"isSelling":true,"createdAt":"2023-12-30T01:47:21.000Z","updatedAt":"2023-12-30T01:47:21.000Z","seller_id":"seller1"},{"item_id":"2","item_name":"no_gluten bread","price":9300,"amount":30,"isSelling":true,"createdAt":"2023-12-30T01:47:21.000Z","updatedAt":"2023-12-30T01:47:21.000Z","seller_id":"seller1"},{"item_id":"3","item_name":"no_gluten salad","price":12500,"amount":30,"isSelling":true,"createdAt":"2023-12-30T01:47:21.000Z","updatedAt":"2023-12-30T01:47:21.000Z","seller_id":"seller2"},{"item_id":"4","item_name":"no_gluten chicken","price":17000,"amount":30,"isSelling":true,"createdAt":"2023-12-30T01:47:21.000Z","updatedAt":"2023-12-30T01:47:21.000Z","seller_id":"seller2"}],"totalPages":1}
 */

/**
 * @swagger
 *  /items/{itemId}:
 *    get:
 *      tags:
 *      - 상품
 *      description: 특정 상품의 정보 검색
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: path
 *          name: itemId
 *          required: true
 *          description: 상품의 id
 *          schema:
 *            type: integer
 *      responses:
 *       200:
 *        description: 상품 정보 검색 성공
 */
router.get('/items/:id?', getItems);


//판매자 정보
/**
 * @swagger
 *  /seller/{sellerId}:
 *    get:
 *      tags:
 *      - 판매자
 *      description: 판매자 정보를 검색함
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: path
 *          name: sellerId
 *          required: true
 *          description: 판매자 아이디
 *          schema:
 *            type: string
 *      responses:
 *       200:
 *        description: 판매자 정보 검색 성공
 */
router.get('/seller/:id?', getSeller);

module.exports = router;