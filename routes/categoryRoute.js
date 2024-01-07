const express = require('express');
const { uploadItem } = require('../config/multerConfig.js');
const { getCategory, postCategory, deleteCategory, updateCategory } = require("../controllers/category.js");
const checkDirectory = require('../config/directoryConfig.js');
const categoryRouter = express.Router();

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
 *            type: number
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
categoryRouter.get('/:id?', getCategory);
/**
 * @swagger
 *  /category:
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
 *         201:
 *           description: 상품 등록 성공
 */
categoryRouter.post('/', uploadItem.single('img'), postCategory);
/**
 * @swagger
 *  /category/{item_id}:
 *     delete:
 *       tags:
 *         - 상품
 *       description: 상품을 삭제함
 *       parameters:
 *        - in: path
 *          name: item_id
 *          required: true
 *          schema:
 *            type: integer
 *            description: 상품 고유 아이디
 *       responses:
 *         201:
 *           description: 상품 삭제 성공
 */
categoryRouter.delete('/:id?', deleteCategory);
/**
 * @swagger
 *  /category/{item_id}:
 *     patch:
 *       tags:
 *         - 상품
 *       description: 상품을 등록함
 *       produces:
 *         - application/json
 *       requestBody:
 *         description: 상품 아이디와 json형태의 수정 정보 입력
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
 *                 isSelling:
 *                   type: boolean
 *                 stock:
 *                   type: number
 *                 img:
 *                   type: string
 *       responses:
 *         200:
 *           description: 상품 수정 성공
 */
categoryRouter.patch('/:id?', uploadItem.single('img'), updateCategory);

module.exports = categoryRouter;