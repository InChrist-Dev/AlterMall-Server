const { User } = require('../models');
const { Seller } = require('../models');
const { Customer} = require('../models');

exports.getUser = async (req, res) => {
    if (req.params.id) {
        const result = await User.findOne({
            where: {
                id: req.params.id,
            }
        });

        if (result) {
            res.status(200).json({exist:true, data: result})
        } else {
            res.status(404).json({exist:false, data: "User Not Found"})
        }
    } else {
        res.status(404).json({exist:false, data:"Need UserID"});
    }
};

exports.getSeller = async (req, res) => {
    if (req.params.id) {
        const result = await Seller.findOne({
            where: {id: req.params.id},
            include:[{
                model: User, 
                as: 'user', 
                where: { position: 'seller' },
                required: true
            }]

        });
        if (result) {
            res.status(200).json({exist:true, data: result})
        } else {
            res.status(404).json({exist:false, data: "User Not Found"})
        }
    } else {
        res.status(404).json({exist:false, data:"Need UserID"});
    }
};

exports.getCustomer = async (req, res) => {
    if (req.params.id) {
        const result = await Customer.findOne({
            where: {id: req.params.id},
            include:[{
                model: User, 
                required: true
            }]

        });

        if (result) {
            res.status(200).json({exist:true, data: result})
        } else {
            res.status(404).json({exist:false, data: "User Not Found"})
        }
    } else {
        res.status(404).json({exist:false, data:"Need UserID"});
    }
};

/** POST
 * 계정을 등록해준다
 * 생성 할 계정의 정보를 json 형태 body로 보내어주면 이를 User 테이블에 등록한다.
 * @params {JSON} req.body - 등록 할 계정 정보
 */
exports.postUser = async(req, res) => {
    User.create({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        profile: req.body.profile,
        position: req.body.position
    })
        .then((createdItem) => {
            if(req.body.position === 'seller'){
                Seller.create({
                    id: createdItem.id,
                    addr:req.body.addr,
                    company_num:req.body.company_num
                })
            }else if(req.body.position === 'customer'){
                Customer.create({
                    id: createdItem.id,
                    class: "normal",
                })
            }
            res.status(201).json(createdItem);
        })
        .catch((error) => {
            console.error('Error creating item:', error);
            res.status(500).send('Fail to create Item');
        });
};

/** DELETE
 * 계정의 id를 입력하면 삭제하여준다
 * @param {UUID} req.params.id
 */
exports.deleteUser = async(req, res) => {
    
    try{
        const deleteUser = await User.findOne({
            where: {
                id: req.params.id || null,
            }
        });
        
        if(!deleteUser){
            return res.status(404).json({ exists: false, message: 'User Not Found' });
        }

    } catch (error) {
        console.error('Error during user retrieval:', error);
        return res.status(500).send('Failed to retrieve user for deletion');
    }
    
    try{
        await User.destroy({
            where: { id: req.params.id},
        })

        res.status(201).send({ success: true, message: `User deleted` });

    } catch (error){
        console.error('Error during user retrieval:', error);
        return res.status(500).send('Failed to deletion');
    }
}