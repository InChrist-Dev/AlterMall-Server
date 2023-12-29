import { Sequelize } from "sequelize";

class Seller extends Sequelize.Model{
    static initiate(sequelize) {
        Seller.init({
            seller_id: {
                type: Sequelize.STRING(100),
                allowNull: false,
                unique: true,
            },
            name: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
            },
            email: {
                type: Sequelize.String(100),
                allowNull: false,
            },
            phone: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            addr: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            company_num: {
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

module.exports = Seller;