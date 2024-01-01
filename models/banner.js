const Sequelize = require("sequelize");

class Banner extends Sequelize.Model{
    static initiate(sequelize) {
        Banner.init({
            img_id:{
                primaryKey:true,
                type:Sequelize.UUID,
                onDelete:'CASCADE',
                onUpdate:'CASCADE',
            },
            img: {
                type: Sequelize.STRING(600),
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            paranoid: false,
            modelName: "Banner",
            tableName: "banner",
            charset: "utf8",
            collate: "utf8_general_ci",

        });
    }

    static associate(db) {}

};

module.exports = Banner;