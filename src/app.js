require("dotenv").config();
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const sequelize = require("./config/database");
const orderRoutes = require("./routes/orderRoutes");
const Order = require("./models/Order");
const Item = require("./models/Item");
const Users = require("./models/Users");

// 1. Relacionamentos
Order.hasMany(Item, {
  foreignKey: "orderId",
  as: "items",
  onDelete: "CASCADE",
});
Item.belongsTo(Order, { foreignKey: "orderId" });

sequelize.modelManager.addModel(Users);

const app = express();
const PORT = process.env.PORT || 3000;

// 2. Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: { title: "API Pedidos", version: "1.0.0" },
    servers: [{ url: `http://localhost:${PORT}` }],
  },
  apis: ["./src/routes/*.js"],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);

// 3. Middlewares
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/order", orderRoutes);

// 4. Teste de Conexão com Neon

// 5. Inicialização Segura
async function startServer() {
  try {
    console.log(" - Tentando conectar ao banco...");

    // Verifique se a URL do banco está chegando
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL não definida no .env");
    }

    await sequelize.authenticate();
    console.log(" - Conexão com Neon/PostgreSQL confirmada.");

    // Sincroniza tabelas (importante: os modelos devem ser importados antes disso)
    await sequelize.sync({ force: false });
    console.log(" - Tabelas sincronizadas.");

    app.listen(PORT, () => {
      console.log(` - Servidor rodando em: http://localhost:${PORT}`);
      console.log(` - Documentação: http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    // Aqui imprimimos o erro completo para identificar se é SSL, Senha ou Host
    console.error(" - Falha na infraestrutura:");
    console.error(error);
    process.exit(1);
  }
}

startServer();
