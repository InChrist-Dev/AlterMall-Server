const Sequelize = require("sequelize");

class SellerDetail extends Sequelize.Model{
    static initiate(sequelize) {
        SellerDetail.init({
            id: {
                type: Sequelize.UUID,
                primaryKey: true,
                onDelete:'CASCADE',
                onUpdate:'CASCADE'
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
            timestamps: true,
            underscored: false,
            paranoid: false,
            modelName: "SellerDetail",
            tableName: "seller_detail",
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }

    static associate(db) {
        db.SellerDetail.hasOne(db.Seller, { foreignKey: 'id', targetKey: 'id'});
    }

};

module.exports = SellerDetail;