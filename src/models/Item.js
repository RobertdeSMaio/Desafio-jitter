const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Order = require("./Order");

const Item = sequelize.define(
  "Item",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: "items",
    timestamps: false,
  },
);

// Configuração do Relacionamento (SQL Association)
Order.hasMany(Item, {
  foreignKey: "orderId",
  onDelete: "CASCADE", // Se deletar o pedido, deleta os itens
});
Item.belongsTo(Order, {
  foreignKey: "orderId",
});

module.exports = Item;
