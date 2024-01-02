const express = require('express');
const { getUser, getSeller, getCustomer, postUser, deleteUser, updateUser } = require("../controllers/user.js");
const userRouter = express.Router();

/**
 * @swagger
 *  /user/{userId}:
 *    get:
 *      tags:
 *      - 유저
 *      description: 유저 정보를 검색함
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
userRouter.get('/:id', getUser);
/**
 * @swagger
 *  /user/seller/{sellerId}:
 *    get:
 *      tags:
 *      - 유저
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
userRouter.get('/seller/:id?', getSeller);
/**
 * @swagger
 *  /user/customer/{sellerId}:
 *    get:
 *      tags:
 *      - 유저
 *      description: 구매자 정보를 검색함
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: path
 *          name: customerId
 *          required: true
 *          description: 구매자 아이디
 *          schema:
 *            type: string
 *      responses:
 *       200:
 *        description: 구매자 정보 검색 성공
 */
userRouter.get('/customer/:id', getCustomer);
/**
 * @swagger
 *  /user/join:
 *     post:
 *       tags:
 *         - 유저
 *       description: 유저를 등록함
 *       produces:
 *         - application/json
 *       requestBody:
 *         description: 유저 정보를 입력
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 profile:
 *                   type: string
 *                 position:
 *                   type: string
 *                 addr:
 *                   type: string
 *                 company_num:
 *                   type: string
 *                 class:
 *                   type: string
 *               required:
 *                 - name
 *                 - position
 *       responses:
 *         201:
 *           description: 상품 등록 성공
 */
userRouter.post('/join', postUser);
/**
 * @swagger
 *  /user/delete/{userId}}:
 *     delete:
 *       tags:
 *         - 유저
 *       description: 유저를 삭제함
 *       parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: UUID
 *            description: 유저 고유 아이디
 *       responses:
 *         201:
 *           description: 상품 삭제 성공
 */
userRouter.delete('/delete/:id', deleteUser);
/**
 * @swagger
 *  /user/patch/{item_id}:
 *     patch:
 *       tags:
 *         - 유저
 *       description: 유저 정보수정
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
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 profile:
 *                   type: string
 *                 addr:
 *                   type: string
 *                 company_num:
 *                   type: string
 *                 class:
 *                   type: string
 *       responses:
 *         200:
 *           description: 유저 수정 성공
 */
userRouter.patch('/patch/:id', updateUser);

module.exports = userRouter;