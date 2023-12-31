const Sequelize = require("sequelize");

class Customer extends Sequelize.Model{
    static initiate(sequelize) {
        Customer.init({
            id:{
                primaryKey:true,
                type:Sequelize.UUID,
                onDelete:'CASCADE',
                onUpdate:'CASCADE',
            },
            class: {
                type: Sequelize.STRING(100),
                allowNull: false,
                defaultValue: "normal",
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            paranoid: false,
            modelName: "Customer",
            tableName: "customer",
            charset: "utf8",
            collate: "utf8_general_ci",

        });
    }

    static associate(db) {
        db.Customer.hasMany(db.Order, { foreignKey: 'customer_id', sourceKey: 'id'});
        db.Customer.belongsTo(db.User, { foreignKey: 'id', targetKey: 'id' });
        db.Customer.belongsToMany(db.Items, {
            foreignKey:'customer_id',
            sourceKey:'id',
            through:'wish',
            onDelete:'CASCADE',
            onUpdate:'CASCADE'
        })
    }

};

module.exports = Customer;