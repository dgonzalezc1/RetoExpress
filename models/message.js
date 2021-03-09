const { Model, DataTypes } = require("sequelize");
const sequelize = require("../lib/sequelize");

class Message extends Model{}

Message.init({
    message: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize,
    modelName: "Message",
    timestamps: false
    //createdAt: false,
    //updatedAt: 'ts'
});

Message.sync();

module.exports = Message;

