import { Sequelize } from "sequelize";

class Customer extends Sequelize.Model{
    static initiate(sequelize) {
        Customer.init({
            id: {
                type: Sequelize.STRING(100),
                allowNull: false,
                unique: true,
            },
            name: {
                type: Sequelize.STRING(100),
                allowNull: false,
                unique: true,
            },
            email: {
                type: Sequelize.STRING(100),
                allowNull: true,
                unique: true,
            },
            phone: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            class: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
        }, {
            sequelize,
            timestampts: true,
            underscored: false,
            paranoid: false,
            modelName: "Customer",
            tableName: "customer",
            charset: "utf8",
            clooate: "utf8_general_ci",

        });
    }

    static associate(db) {

    }

};

module.exports = Customer