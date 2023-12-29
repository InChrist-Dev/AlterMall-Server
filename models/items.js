import { Sequelize } from "sequelize";

class Items extends Sequelize.Model{
    static initiate(sequelize) {
        Items.init({
            item_id: {
                type: Sequelize.STRING(100),
                allowNull: false,
                unique: true,
            },
            seller_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
            },
            item_name: {
                type: Sequelize.String(100),
                allowNull: false,
            },
            price: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            amount: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            isSelling: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            }
        }, {
            sequelize,
            timestampts: true,
            underscored: false,
            paranoid: false,
            modelName: "Items",
            tableName: "items",
            charset: "utf8",
            clooate: "utf8_general_ci",
        });
    }

    static associate(db) {
        
    }

};

module.exports = Items;