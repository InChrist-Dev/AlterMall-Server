const { Items } = require('../models');

exports.getDefault  = async (req, res) => {
    res.send('default');
};

const ITEMS_PER_PAGE = 10;

exports.getItems = async (req, res) => {
    
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
                items,
                totalPages,
            });
        } catch(error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
        
    }
};
