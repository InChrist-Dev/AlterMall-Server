import { Sequelize } from "sequelize";

class Items extends Sequelize.Model{
    static initiate(sequelize) {
        Items.init({
            item_id: {
                type: Sequelize.STRING(100),
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
        db.Items.belongsToMany(db.Order, { through: 'OrderDetail' });
        db.Items.belongsToMany(db.ItemCategoty, { through: ItemDetail });
        db.Items.belongsTo(db.Seller, { foreignKey: 'seller_id', targetKey: 'id' });
    }

};

module.exports = Items;