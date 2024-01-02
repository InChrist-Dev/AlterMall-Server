const { Cart } = require('../models');
const { Items } = require('../models');

/**
 * 페이지네이션 파라미터
 */
const ITEMS_PER_PAGE = 10;

/** GET 
 * 장바구니를 불러와준다
 * @params: {UUID} req.params.id - 유저 고유 ID
*/
exports.getCart = async (req, res) => {
    if (req.params.id) { // id값에 해당하는 장바구니 정보 전송
        try {
            const page = req.query.p || 1;
            const offset = (page - 1) * ITEMS_PER_PAGE;

            const { count, rows } = await Cart.findAndCountAll({
                limit: ITEMS_PER_PAGE,
                where:{customer_id: req.params.id},
                offset,
                order: [['createdAt', 'DESC']],
                include:[{
                    model:Items,
                }],
            });
            const totalItemCount = count;
            const totalPages = Math.ceil(totalItemCount / ITEMS_PER_PAGE);
            res.status(200).json({ exist: true, data: { rows, totalPages } });

        } catch(error) {
            console.error(error);
            res.status(500).send('Fail to get Items');
        }
    } else{
        res.status(404).send("userId required");
    }
};

/** POST
 * 장바구니를 추가해준다
 * 추가할 상품의 정보를 json 형태 body로 보내어주면 이를 Cart 테이블에 등록한다.
 * @params {JSON} req.body - 등록 할 상품 정보
 */
exports.postCart = async(req, res) => {
    try{
        const item = await Cart.findOne({
            where: {
                id: req.body.item_id
            }
        });

        if(item){
            return res.status(404).json( { exists: false, message: 'Item is already in Cart' });
        }
    } catch (error){
        console.error('Error creating cart:', error);
        return res.status(500).send('Fail to create Cart');
    }
    
    try{
        const cart = await Cart.create({
            item_id: req.body.item_id,
            customer_id: req.body.customer_id,
            amount: req.body.amount,
            img: req.body.img || null,
        })
        
        res.status(201).json({result: true, data: cart});
    }catch (error){
        console.error('Error creating cart:', error);
        return res.status(500).send('Fail to create Cart');
    }
};

/** PATCH
 * 장바구니 정보를 수정하여줌
 * @param {JSON} req.body 
 * @returns 
 */
exports.updateCart = async(req, res) => {
    try{
        const updateItem = await Cart.findOne({
            where: {
                id: req.params.id || null,
            }
        });

        if(!updateItem){
            return res.status(404).json({ exists: false, message: 'Cart Not Found' });
        };

        try{
            console.log(req.body.amount);
            await Cart.update({
                amount: req.body.amount || updateItem.amount,
            }, {
                where: { id: req.params.id},
            });
            
            
        } catch(error){
            console.error('Error update cart:', error);
            return res.status(500).send('Failed to update cart');
        }
        res.status(200).send({ success: true, message: `${updateItem.id} updated` });
        
    } catch(error){
        console.error('Error update cart:', error);
        return res.status(500).send('Failed to update cart');
    }
};

/** DELETE
 * 장바구니의 id를 입력하면 삭제하여준다
 * @param {UUID} req.params.id
 */
exports.deleteCart = async(req, res) => {
    
    const deleteCart = await Cart.findOne({
        where: {
            id: req.params.id || null,
        }
    });

    if(!deleteCart){
        return res.status(404).json({ exists: false, message: 'Item Not Found' });
    }
    try{
        await Cart.destroy({
            where: { id: req.params.id},
        })

        return res.status(201).send({ success: true, message: `Cart deleted` });

    } catch (error){
        console.error('Error deleting item:', error);
        return res.status(500).send('Failed to delete item');
    }
};