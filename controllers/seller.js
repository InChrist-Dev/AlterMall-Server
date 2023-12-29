const { Seller } = require('../models');
const { Op } = require('sequelize');

exports.getSeller = async (req, res) => {
    if (req.params.id) {
        const result = await Seller.findOne({
            attributes: ['id', 'name'],
            where: {
                id: req.params.id,
            }
        });
        console.log(result);
        res.send(result);
    } else {
        res.send("no Name!")
    }
};