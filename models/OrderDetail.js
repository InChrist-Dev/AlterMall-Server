const Sequelize = require("sequelize");

class OrderDetail extends Sequelize.Model{
    static initiate(sequelize) {
        OrderDetail.init({
            amount:{
                type: Sequelize.INTEGER,
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            paranoid: false,
            modelName: "OrderDetail",
            tableName: "OrderDetail",
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }

    static associate(db) {}

};

module.exports = OrderDetail;