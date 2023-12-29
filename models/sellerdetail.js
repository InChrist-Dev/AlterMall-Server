import { Sequelize } from "sequelize";

class SellerDetail extends Sequelize.Model{
    static initiate(sequelize) {
        SellerDetail.init({
            seller_id: {
                type: Sequelize.STRING(100),
                allowNull: false,
                unique: true,
            },
            img_src: {
                type: Sequelize.STRING(600),
                allowNull: false,
            },
            content: {
                type: Sequelize.STRING(600),
                allowNull: true,
            },
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

module.exports = SellerDetail;