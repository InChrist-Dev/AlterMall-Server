import { Sequelize } from "sequelize";

class Order extends Sequelize.Model{
    static initiate(sequelize) {
        Order.init({
            order_id: {
                type: Sequelize.STRING(100),
                allowNull: false,
                unique: true,
            },
            price: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
            },
            order_date: {
                type: Sequelize.DATE,
                allowNull: true,
                unique: true,
            },
            addr: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            addr_detail: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            requests: {
                type: Sequelize.STRING(100),
                allowNull: true,
            }
        }, {
            sequelize,
            timestampts: true,
            underscored: false,
            paranoid: false,
            modelName: "Order",
            tableName: "order",
            charset: "utf8",
            clooate: "utf8_general_ci",

        });
    }

    static associate(db) {
        
    }

};

module.exports = Order;