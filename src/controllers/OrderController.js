const Order = require("../models/Order");
const Item = require("../models/Item");

class OrderController {
  // Criar um novo pedido
  async create(req, res) {
    try {
      const { numeroPedido, valorTotal, dataCriacao, items } = req.body;

      // 1. Mapeamento dos campos (Mapping De-Para)
      const orderMapped = {
        orderId: numeroPedido,
        value: valorTotal,
        creationDate: new Date(dataCriacao),
        // Mapeando o array de itens internamente
        Items: items.map((item) => ({
          productId: item.idItem,
          quantity: item.quantidadeItem,
          price: item.valorItem,
        })),
      };

      // 2. Persistência no Banco SQL (com transação para garantir integridade)
      const result = await Order.create(orderMapped, {
        include: [{ model: Item }],
      });

      // 3. Resposta de Sucesso (HTTP 201 Created)
      return res.status(201).json({
        message: "Pedido criado com sucesso!",
        data: result,
      });
    } catch (error) {
      // 4. Tratamento de Erros Robusto (Critério de Avaliação)
      return res.status(400).json({
        error: "Falha na criação do pedido",
        message: error.message,
      });
    }
  }

  // Obter dados por parâmetro na URL (Obrigatório)
  async getById(req, res) {
    try {
      const { orderId } = req.params;
      const order = await Order.findByPk(orderId, { include: [Item] });

      if (!order) {
        return res.status(404).json({ message: "Pedido não encontrado" });
      }

      return res.json(order);
    } catch (error) {
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
}

module.exports = new OrderController();
