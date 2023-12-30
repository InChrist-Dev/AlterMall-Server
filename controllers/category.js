const { Items } = require('../models');
const { Seller } = require('../models');

const ITEMS_PER_PAGE = 10;

exports.getDefault  = async (req, res) => {
    res.send('default');
};

exports.getCategory = async (req, res) => {
    
    if (req.params.id) { // id값에 해당하는 상품 정보 전송
        const result = await Items.findOne({
            attributes: ['item_name', 'price', 'stock', 'seller_id', 'isSelling', 'img'],
            where: {
                item_id: req.params.id
            }
        })
        
        res.send(result);
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

            res.json({
                status: 200,
                items,
                totalPages,
            });
        } catch(error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
        
    }
};

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
        img: req.body.img,
    })
        .then((createdItem) => {
            res.status(201).json(createdItem);
        })
        .catch((error) => {
            console.error('Error creating item:', error);
            res.status(500).send('Internal Server Error');
        });
};