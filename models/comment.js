const Sequelize = require("sequelize");

class Comment extends Sequelize.Model{
    static initiate(sequelize) {
        Comment.init({
            writer_id:{
                primaryKey:true,
                type:Sequelize.UUID,
                defaultValue:Sequelize.UUIDV4,
            },
            id: {
                type: Sequelize.STRING(50),
                allowNull: false,
                onUpdate:'CASCADE',
                onDelete:'CASCADE'
            },
            content: {
                type: Sequelize.TEXT,
                allowNull: false
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            paranoid: false,
            modelName: "Comment",
            tableName: "comment",
            charset: "utf8",
            collate: "utf8_general_ci",

        });
    }

    static associate(db) {
        db.Comment.belongsTo(db.Board, {
            foreignKey: 'id',
            sourceKey:'id',
        })
    }

};

module.exports = Comment;