const Sequelize = require("sequelize");

class Items extends Sequelize.Model{
    static initiate(sequelize) {
        Items.init({
            item_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement:true,
            },
            item_name: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            price: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            stock: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            isSelling: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            img:{
                type: Sequelize.STRING(600),
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            paranoid: false,
            modelName: "Items",
            tableName: "items",
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }

    static associate(db) {
        db.Items.belongsToMany(db.Order, { through: 'OrderDetail' });
        db.Items.belongsToMany(db.ItemCategory, { through: 'ItemDetail' });
        db.Items.belongsTo(db.Seller, { foreignKey: 'seller_id', targetKey: 'id' });
    }

};

module.exports = Items;