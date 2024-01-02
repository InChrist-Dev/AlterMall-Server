const Sequelize = require("sequelize");

class Items extends Sequelize.Model{
    static initiate(sequelize) {
        Items.init({
            item_id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
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
            },
            seller_id:{
                type:Sequelize.UUID,
                onUpdate:'CASCADE',
                onDelete:'SET NULL'
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
        db.Items.hasMany(db.Order, { foreignKey: 'item_id', sourceKey: 'item_id' });

        db.Items.belongsToMany(db.ItemTag, { 
            through: 'item_detail',
            sourceKey: 'item_id',
            foreignKey:'item_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });

        db.Items.belongsToMany(db.Customer, { 
            through: 'wish',
            sourceKey: 'item_id',
            foreignKey:'item_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });

        db.Items.belongsTo(db.Seller, { foreignKey: 'seller_id', targetKey: 'id' });

        db.Items.hasMany(db.Cart, {
            foreignKey: 'item_id',
            sourceKey: 'item_id'
        })
    }
};

module.exports = Items;