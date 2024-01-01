const Sequelize = require("sequelize");

class Board extends Sequelize.Model{
    static initiate(sequelize) {
        Board.init({
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
        
    }

};

module.exports = Board;