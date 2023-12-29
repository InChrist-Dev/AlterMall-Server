const Sequelize = require("sequelize");

class ItemCategory extends Sequelize.Model{
    static initiate(sequelize) {
        ItemCategory.init({
            category_name: {
                type: Sequelize.STRING(100),
                primaryKey:true,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            paranoid: false,
            modelName: "ItemCategory",
            tableName: "items_category",
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }

    static associate(db) {
        db.ItemCategory.belongsToMany(db.Items, { through: 'ItemDetail' });

    }

};

module.exports = ItemCategory;