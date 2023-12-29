import { Sequelize } from "sequelize";

class Seller extends Sequelize.Model{
    static initiate(sequelize) {
        Seller.init({
            id: {
                type: Sequelize.STRING(100),
                allowNull: false,
                unique: true,
            },
            name: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            email: {
                type: Sequelize.String(100),
                allowNull: true,
            },
            phone: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            addr: {
                type: Sequelize.STRING(300),
                allowNull: false,
            },
            company_num: {
                type: Sequelize.STRING(100),
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
        db.Seller.hasMany(db.Items, { foreignKey: 'seller_id', sourceKey: 'id'} );
        db.Seller.hasOne(db.SellerDetail, { foreignKey: 'id', sourceKey: 'id' } );
    }

};

module.exports = Seller;