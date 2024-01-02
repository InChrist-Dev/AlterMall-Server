const Sequelize = require("sequelize");

class Cart extends Sequelize.Model{
    static initiate(sequelize) {
        Cart.init({
            id:{
                type:Sequelize.UUID,
                defaultValue:Sequelize.UUIDV4,
                primaryKey:true
            },
            customer_id:{
                type:Sequelize.UUID,
                allowNull: false,
                onUpdate:'CASCADE',
                onDelete:'CASCADE'
            },
            item_id:{
                type:Sequelize.UUID,
                onUpdate:'CASCADE',
                onDelete:'CASCADE'
            },
            amount: {
                type: Sequelize.INTEGER(100),
                allowNull: false,
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            paranoid: false,
            modelName: "Cart",
            tableName: "cart",
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }

    static associate(db) {
        db.Cart.belongsTo(db.Items, {
            foreignKey: 'item_id',
            targetKey: 'item_id'
        });
        db.Cart.belongsTo(db.User, {
            foreignKey:'customer_id',
            targetKey:'id',
        });
    }

};

module.exports = Cart;