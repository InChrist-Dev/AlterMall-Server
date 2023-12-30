const Sequelize = require("sequelize");

class Order extends Sequelize.Model{
    static initiate(sequelize) {
        Order.init({
            order_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            price: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            addr: {
                type: Sequelize.STRING(300),
                allowNull: false,
            },
            addr_detail: {
                type: Sequelize.STRING(300),
            },
            post:{
                type: Sequelize.STRING(20),
            },
            requests: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            paranoid: false,
            modelName: "Order",
            tableName: "order",
            charset: "utf8",
            collate: "utf8_general_ci",

        });
    }

    static associate(db) {
        db.Order.belongsTo(db.Customer, { foreignKey: 'customer_id', targetKey: 'id'});
        db.Order.belongsToMany(db.Items, { through:'OrderDetail' });
    }

};

module.exports = Order;