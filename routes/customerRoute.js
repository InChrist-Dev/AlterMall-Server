const express = require('express');
const { getCart, postCart, updateCart, deleteCart } = require("../controllers/cart_wish");
const customerRouter = express.Router();

/**
 * @swagger
 *  /customer/cart/{userId}:
 *    get:
 *      tags:
 *      - 구매자
 *      description: 구매자 장바구니 정보를 검색함
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: path
 *          name: userId
 *          required: true
 *          description: 유저 아이디
 *          schema:
 *            type: string
 *      responses:
 *       200:
 *        description: 유저 정보 검색 성공
 */
customerRouter.get('/cart/:id', getCart);
// customerRouter.get('/wish/:id');
/**
 * @swagger
 *  /user/join:
 *     post:
 *       tags:
 *         - 구매자
 *       description: 장바구니를 등록함
 *       produces:
 *         - application/json
 *       requestBody:
 *         description: 상품 정보를 입력
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 customer_id:
 *                   type: string
 *                 item_id:
 *                   type: string
 *                 amount:
 *                   type: number
 *               required:
 *                 - customer_id
 *                 - item_id
 *                 - amount
 *       responses:
 *         201:
 *           description: 상품 등록 성공
 */
customerRouter.post('/cart/post', postCart);
// customerRouter.post('/wish/post',);
/**
 * @swagger
 *  /customer/user/{item_id}:
 *     patch:
 *       tags:
 *         - 구매자
 *       description: 장바구니 수량 수정
 *       produces:
 *         - application/json
 *       requestBody:
 *         description: 장바구니 아이디와 json형태의 수정 정보 입력
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 amount:
 *                   type: number
 *       responses:
 *         200:
 *           description: 유저 수정 성공
 */
customerRouter.patch('/cart/patch/:id', updateCart);
// customerRouter.patch('/wish/patch/:id');
/**
 * @swagger
 *  /customer/cart/delete/{orderId}}:
 *     delete:
 *       tags:
 *         - 구매자
 *       description: 장바구니를 삭제함
 *       parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: UUID
 *            description: 장바구니 고유 아이디
 *       responses:
 *         201:
 *           description: 상품 삭제 성공
 */
customerRouter.delete('/cart/delete/:id', deleteCart);
// customerRouter.delete('/wish/delete/:id');

module.exports = customerRouter;