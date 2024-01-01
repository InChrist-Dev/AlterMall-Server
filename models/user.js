const Sequelize = require("sequelize");

class User extends Sequelize.Model{
    static initiate(sequelize) {
        User.init({
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV1,
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
            profile: {
                type: Sequelize.STRING(600),
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            paranoid: false,
            modelName: "User",
            tableName: "user",
            charset: "utf8",
            collate: "utf8_general_ci",

        });
    }

    static associate(db) {
        db.User.hasOne(db.Customer, { 
            foreignKey: {
                name: 'id',
                primaryKey:true,
                type:Sequelize.UUID
            }, 
            sourceKey: 'id', 
            onDelete:'CASCADE', 
            onUpdate:'CASCADE'
        });

        db.User.hasOne(db.Seller, { 
            foreignKey: {
                name: 'id',
                primaryKey:true,
                type:Sequelize.UUID
            },
            sourceKey: 'id', 
            onDelete:'CASCADE', 
            onUpdate:'CASCADE'
        });

        db.User.hasMany(db.Cart, {
            foreignKey: 'id',
            sourceKey: 'id',
            onDelete: 'CASCADE',
            onUpdate:'CASCADE'
        })

    }

};

module.exports = User;