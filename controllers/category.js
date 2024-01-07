const { Items } = require('../models');
const { Seller } = require('../models');

const fs = require('fs');
const path = require('path');
const multer = require('multer');

/**
 * @type string
 * 이미지 전송&저장 절대경로
 */
const imagePath = '/Users/tasong12/Desktop/AlterMall-Server/upload/imgs/';

/**
 * 페이지네이션 파라미터
 */
const ITEMS_PER_PAGE = 10;

/** GET 
 * 상품정보를 불러와준다
 * @params: {UUID} req.params.id - 상품 고유 ID
*/
exports.getCategory = async (req, res) => {
    
    if (req.params.id) { // id값에 해당하는 상품 정보 전송
        try {
            const result = await Items.findOne({
                attributes: ['item_name', 'price', 'stock', 'seller_id', 'isSelling', 'img'],
                where: {
                    item_id: req.params.id
                }
            });

            // res.send(result);
            res.send(result)
        } catch (error) {
            console.error('Error fetching item:', error);
            res.status(500).send('Fail to get Item');
        }
    } else { // id값 없으면 페이지네이션으로 전체 상품 검색
        try {
            const page = req.query.p || 1;
            const offset = (page - 1) * ITEMS_PER_PAGE;

            const items = await Items.findAll({
                limit: ITEMS_PER_PAGE,
                offset,
                order: [['createdAt', 'DESC']]
            });

            const totalItemCount = await Items.count();
            const totalPages = Math.ceil(totalItemCount / ITEMS_PER_PAGE);
            res.status(200).json({ data: { items, totalPages } });

        } catch(error) {
            console.error(error);
            res.status(500).send('Fail to get Items');
        }
        
    }
};


/** POST
 * 상품을 등록해준다
 * 판매할 상품의 정보를 json 형태 body로 보내어주면 이를 Items 테이블에 등록한다.
 * @params {JSON} req.body - 등록 할 상품 정보
 */
exports.postCategory = async(req, res) => {
    const seller = await Seller.findOne({
        where: {
            id: req.body.seller_id
        }
    });
    console.log(`검색결과: ${seller}`);

    if(!seller){
        return res.status(404).json({ exists: false, message: 'Seller Not Found' });
    }

    Items.create({
        item_name: req.body.item_name,
        price: req.body.price,
        seller_id: req.body.seller_id,
        stock: req.body.stock,
        isSelling: true,
        img: req.file.path,
    })
        .then((createdItem) => {
            res.status(201).json(createdItem);
        })
        .catch((error) => {
            console.error('Error creating item:', error);
            res.status(500).send('Fail to create Item');
        });
};

/** DELETE
 * 상품의 id를 입력하면 삭제하여준다
 * @param {UUID} req.params.id
 */
exports.deleteCategory = async(req, res) => {
    
    const deleteItem = await Items.findOne({
        where: {
            item_id: req.params.id || null,
        }
    });

    if(!deleteItem){
        return res.status(404).json({ exists: false, message: 'Item Not Found' });
    }
    Items.destroy({
        where: { item_id: req.params.id || null },
    })
        .then((deletedItem) => {
            if (deletedItem === 0) {
                res.status(404).send({ success: false, message: 'Item Not Found' });
            } else {
                res.status(201).send({ success: true, message: `Item deleted` });
            }
        })
        .catch((error) => {
            console.error('Error deleting item:', error);
            res.status(500).send('Failed to delete item');
        });
};

/** PATCH
 * 상품정보를 수정하여줌
 * @param {JSON} req.body 
 * @returns 
 */
exports.updateCategory = async(req, res) => {
    const updateItem = await Items.findOne({
        where: {
            item_id: req.params.id || null,
        }
    });

    if(!updateItem){
        return res.status(404).json({ exists: false, message: 'Item Not Found' });
    };

    Items.update({
        item_name: req.body.item_name || updateItem.item_name,
        price: req.body.price || updateItem.price,
        isSelling: req.body.isSelling ?? updateItem.isSelling ?? false,
        stock: req.body.stock || updateItem.stock,
        img: req.body.img || updateItem.img
    }, {
        where: { item_id: req.params.id || null },
    })
        .then((updatedItem) => {
            if (updatedItem === 0) {
                res.status(404).send({ success: false, message: 'Item Not Found' });
            } else {
                res.status(200).send({ success: true, message: `${updateItem.id} updated` });
            }
        })
        .catch((error) => {
            console.error('Error update item:', error);
            res.status(500).send('Failed to update item');
        });

};