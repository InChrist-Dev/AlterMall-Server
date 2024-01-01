const Sequelize = require("sequelize");

class ItemTag extends Sequelize.Model{
    static initiate(sequelize) {
        ItemTag.init({
            tag: {
                type: Sequelize.STRING(100),
                primaryKey:true,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            paranoid: false,
            modelName: "ItemTag",
            tableName: "item_tag",
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }

    static associate(db) {
        db.ItemTag.belongsToMany(db.Items, { 
            through: 'ItemDetail',
            sourceKey: 'tag',
            foreignKey:'tag',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
    }

};

module.exports = ItemTag;