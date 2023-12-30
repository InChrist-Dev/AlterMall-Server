const express = require('express');
const { getDefault, getCategory, postCategory, deleteCategory } = require("../controllers/category.js");
const { getSeller } = require('../controllers/seller.js');
const router = express.Router();

//기본 페이지
router.get('/', getDefault);


// 상품 정보
/**
 * @swagger
 *  /category?p=page:
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
 *  /category/{itemId}:
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
router.get('/category/:id?', getCategory);
/**
 * @swagger
 *  /category/post:
 *     post:
 *       tags:
 *         - 상품
 *       description: 상품을 등록함
 *       produces:
 *         - application/json
 *       requestBody:
 *         description: 판매자 정보와 상품 정보를 입력
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 item_name:
 *                   type: string
 *                 price:
 *                   type: string
 *                 seller_id:
 *                   type: string
 *                 stock:
 *                   type: number
 *                 img:
 *                   type: string
 *               required:
 *                 - item_name
 *                 - price
 *                 - stock
 *       responses:
 *         200:
 *           description: 상품 등록 성공
 */
router.post('/category/post/', postCategory);

router.delete('/category/delete/:id?', deleteCategory)

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

//Not Found
router.use((req, res) => {
    res.status(404).send('Not Found');
});

module.exports = router;