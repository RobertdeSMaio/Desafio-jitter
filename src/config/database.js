const { Sequelize } = require("sequelize");

// Cria a instância da conexão
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    logging: false, // limpa o log do console
  },
);

module.exports = sequelize;
