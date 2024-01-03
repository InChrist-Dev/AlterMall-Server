const { Order, Items } = require('../models');

/**
 * 페이지네이션 파라미터
 */
const ITEMS_PER_PAGE = 10;

exports.getOrder = async (req, res) => {
    try{
        if (req.params.id) {
            const page = req.query.p || 1
            const offset = (page - 1) * ITEMS_PER_PAGE;

            const {count, rows} = await Order.findAndCountAll({
                limit: ITEMS_PER_PAGE,
                offset,
                order: [['createdAt', 'DESC']],
                where: { customer_id: req.params.id },
                include:[{
                    model:Items,
                }],
            });
            const totalItemCount = count;
            const totalPages = Math.ceil(totalItemCount / ITEMS_PER_PAGE);

            if (count) {
                res.status(200).json({exist:true, data: {rows, totalPages} })
            } else {
                res.status(404).json({exist:false, data: "Order Not Found"})
            }
        } else {
            res.status(404).json({exist:false, data:"Need UserID"});
        }
    }catch (error){
        console.error('Error finding order' , error);
        return res.status(500).send('Fail to get orders');
    }
}

exports.postOrder = async (req, res) => {
    try{
        const order = await Order.create({
            addr:req.body.addr,
            addr_detail:req.body.addr_detail || null,
            post:req.body.post || null,
            requests:req.body.requests || null,
            customer_id:req.body.customer_id,
            item_id:req.body.item_id  
        })

        res.status(201).json({exist: true, data:order});
    } catch(error){
        console.log('Error to post order ', error);
        res.status(500).send("Fail to post order");
    }
}

exports.patchOrder = async (req, res) => {
    try{
        const order = await Order.findByPk(req.params.id);

        if(!order)
            return res.status(404).json({exist:false, data:"order not found!"});

        Order.update({
            addr: req.body.addr || order.addr,
            addr_detail: req.body.addr_detail || order.addr_detail,
            requests: req.body.requests || order.requests,
            status: req.body.status || order.status,
            amount: req.body.amount || order.amount,
        }, {
            where: { order_id: req.params.id }
        });

        res.status(200).json({exist:true, data:`${order.order_id} updated`})

    } catch(error){
        console.log('Error to patch order', error);
        res.status(500).send('Fail to patch order');
    }
}

exports.deleteOrder = async (req, res) => {
    try{
        const order = await Order.findByPk(req.params.id);

        if(!order)
            return res.status(404).json({exist:false, data:"order not found!"});
        
        await Order.destroy({
            where:{ order_id: req.params.id }
        })

        res.status(200).json({exist:true, data:`success to delete`})
    } catch(error) {
        console.log("Error to delete order", error);
        res.status(500).send("Fail to delete order");
    }
}