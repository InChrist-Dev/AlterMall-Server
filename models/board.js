const Sequelize = require("sequelize");

class Board extends Sequelize.Model{
    static initiate(sequelize) {
        Board.init({
            id:{
                primaryKey:true,
                type:Sequelize.UUID,
                defaultValue:Sequelize.UUIDV4,
            },
            title: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            content: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            writer_id:{
                type: Sequelize.UUID,
                onDelete:'SET NULL',
                onUpdate:'CASCADE'
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            paranoid: false,
            modelName: "Board",
            tableName: "board",
            charset: "utf8",
            collate: "utf8_general_ci",

        });
    }

    static associate(db) {
        db.Board.belongsTo(db.User, {
            foreignKey:'writer_id',
            sourceKey:'id',
        });

        db.Board.hasMany(db.Comment, {
            foreignKey:'id',
            sourceKey:'id',
        })
    }

};

module.exports = Board;