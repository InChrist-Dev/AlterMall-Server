const Sequelize = require("sequelize");

class Customer extends Sequelize.Model{
    static initiate(sequelize) {
        Customer.init({
            id: {
                type: Sequelize.STRING(100),
                allowNull: false,
                primaryKey:true
            },
            name: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            phone: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            class: {
                type: Sequelize.STRING(100),
                allowNull: false,
                defaultValue: "normal",
            },
        }, {
            sequelize,
            timestamps: true,
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
    }

};

module.exports = Customer;