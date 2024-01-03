const express = require('express');
const { getCart, postCart, updateCart, deleteCart } = require("../controllers/cart_wish");
const { getOrder, postOrder, patchOrder, deleteOrder } = require("../controllers/order");
const customerRouter = express.Router();


//장바구니 찜//
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
 *  /customer/cart/post:
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
//-장바구니 찜//

//주문//
/**
 * @swagger
 *  /customer/order/{userId}?p={page}:
 *    get:
 *      tags:
 *      - 구매자
 *      description: 구매자 주문을 불러옴
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: path
 *          name: userId
 *          required: true
 *          description: 유저 아이디
 *          schema:
 *            type: string
 *        - in: query
 *          name: page
 *          required: true
 *          description: 페이지
 *          schema:
 *            type: number
 *      responses:
 *       200:
 *        description: 주문 정보 검색 성공
 */
customerRouter.get('/order/:id', getOrder);
/**
 * @swagger
 *  /customer/order/post:
 *     post:
 *       tags:
 *         - 구매자
 *       description: 주문을 추가함
 *       produces:
 *         - application/json
 *       requestBody:
 *         description: 주문 정보를 입력
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 addr:
 *                   type:string
 *                 addr_detail:
 *                   type:string
 *                 requests:
 *                   type:string
 *                 amount:
 *                   type:number
 *                 customer_id:
 *                   type:uuid
 *                 item_id:
 *                   type:uuid
 *               required:
 *                 - customer_id
 *                 - item_id
 *                 - amount
 *                 - addr
 *       responses:
 *         201:
 *           description: 주문 등록 성공
 */
customerRouter.post('/order/post', postOrder);
/**
 * @swagger
 *  /customer/order/patch/{item_id}:
 *     patch:
 *       tags:
 *         - 구매자
 *       description: 장바구니 정보수정
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
 *                 addr:
 *                   type: string
 *                 addr_detail:
 *                   type: string
 *                 amount:
 *                   type: number
 *                 requests:
 *                   type: string
 *                 status:
 *                   type: string
 *       responses:
 *         200:
 *           description: 주문 수정 성공
 */
customerRouter.patch('/order/patch/:id', patchOrder);
/**
 * @swagger
 *  /customer/order/delete/{orderId}:
 *     delete:
 *       tags:
 *         - 구매자
 *       description: 주문을 삭제함
 *       parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: UUID
 *            description: 주문 고유 아이디
 *       responses:
 *         201:
 *           description: 주문 삭제 성공
 */
customerRouter.delete('/order/delete/:id', deleteOrder);
//-주문//



module.exports = customerRouter;