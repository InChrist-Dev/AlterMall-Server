const Sequelize = require("sequelize");

/**
 * @todo init안에 SET NULL, CASCADE 구현해야함
 */
class Order extends Sequelize.Model{
    static initiate(sequelize) {
        Order.init({
            order_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
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
            state:{
                type: Sequelize.STRING(100),
                allowNull: false,
                defaultValue: "wait"
            },
            customer_id:{
                type:Sequelize.UUID,
                onUpdate:"CASCADE",
                onDelete:'NO ACTION'
            },
            item_id:{
                type:Sequelize.UUID,
                onUpdate:'CASCADE',
                onDelete:'NO ACTION',
            }
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
        db.Order.belongsTo(db.Customer, { 
            foreignKey: 'customer_id', 
            targetKey: 'id',
        });

        db.Order.belongsTo(db.Items, { 
            foreignKey: 'item_id', 
            targetKey: "item_id",
        });
    }

};

module.exports = Order;