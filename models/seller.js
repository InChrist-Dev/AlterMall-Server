const Sequelize = require("sequelize");

class Seller extends Sequelize.Model{
    static initiate(sequelize) {
        Seller.init({
            id: {
                type: Sequelize.STRING(100),
                allowNull: false,
                unique: true,
                primaryKey: true,
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
            timestamps: true,
            underscored: false,
            paranoid: false,
            modelName: "Seller",
            tableName: "seller",
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }

    static associate(db) {
        db.Seller.hasMany(db.Items, { foreignKey: 'seller_id', sourceKey: 'id'} );
        db.Seller.hasOne(db.SellerDetail, { foreignKey: 'id', sourceKey: 'id' } );
    }

};

module.exports = Seller;