// Constructor conexión
const { Sequelize } = require("sequelize");

//Conexión 2param usuario 3param constraseña
const sequelize = new Sequelize("database", "", "", {
    dialect: "sqlite",
    storage: "./database/database.sqlite",
});

sequelize.authenticate().then(() => {
    console.log("Authenticated");
});

module.exports = sequelize;
