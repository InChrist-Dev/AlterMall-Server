const Sequelize = require("sequelize");

class Seller extends Sequelize.Model{
    static initiate(sequelize) {
        Seller.init({
            id:{
                primaryKey:true,
                type:Sequelize.UUID,
                onDelete:'CASCADE',
                onUpdate:'CASCADE'
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
            timestamps: false,
            underscored: false,
            paranoid: false,
            modelName: "Seller",
            tableName: "seller",
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }

    static associate(db) {
        db.Seller.belongsTo(db.User, { foreignKey:'id', targetKey:'id' });

        db.Seller.hasMany(db.Items, { foreignKey: 'seller_id', sourceKey: 'id'} );
        db.Seller.hasOne(db.SellerDetail, { foreignKey: 'id', sourceKey: 'id' } );
    }

};

module.exports = Seller;