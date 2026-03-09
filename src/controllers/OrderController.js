const Order = require("../models/Order");
const Item = require("../models/Item");

class OrderController {
  // Criar um novo pedido
  async create(req, res) {
    try {
      const { numeroPedido, valorTotal, dataCriacao, items } = req.body;

      const orderMapped = {
        orderId: numeroPedido,
        value: valorTotal,
        creationDate: new Date(dataCriacao),
        items: items.map((item) => ({
          productId: item.idItem,
          quantity: item.quantidadeItem,
          price: item.valorItem,
        })),
      };

      const result = await Order.create(orderMapped, {
        include: [{ model: Item, as: "items" }],
      });

      return res.status(201).json({
        message: "Pedido criado com sucesso!",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        error: "Falha na criação do pedido",
        message: error.message,
      });
    }
  }

  // Obter dados por parâmetro na URL
  async getById(req, res) {
    try {
      const { orderId } = req.params;
      const order = await Order.findByPk(orderId, {
        include: [{ model: Item, as: "items" }], // ← adicione as: "items"
      });

      if (!order) {
        return res.status(404).json({ message: "Pedido não encontrado" });
      }

      return res.json(order);
    } catch (error) {
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }

  // Listar todos os pedidos
  async listAll(req, res) {
    try {
      const orders = await Order.findAll({
        include: [{ model: Item, as: "items" }], // ← adicione as: "items"
      });
      return res.json(orders);
    } catch (error) {
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }

  // Atualizar pedido
  async update(req, res) {
    try {
      const { orderId } = req.params;
      const { numeroPedido, valorTotal, dataCriacao, items } = req.body;

      const order = await Order.findByPk(orderId);
      if (!order) {
        return res.status(404).json({ message: "Pedido não encontrado" });
      }

      // 1. Atualiza o pedido
      await order.update({
        orderId: numeroPedido ?? order.orderId,
        value: valorTotal ?? order.value,
        creationDate: dataCriacao ? new Date(dataCriacao) : order.creationDate,
      });

      // 2. Atualiza os itens se foram enviados
      if (items && items.length > 0) {
        // Deleta os itens antigos
        await Item.destroy({ where: { orderId: order.orderId } });

        // Cria os novos itens
        const newItems = items.map((item) => ({
          productId: item.idItem,
          quantity: item.quantidadeItem,
          price: item.valorItem,
          orderId: order.orderId,
        }));

        await Item.bulkCreate(newItems);
      }

      // 3. Retorna o pedido atualizado com itens
      const updatedOrder = await Order.findByPk(order.orderId, {
        include: [{ model: Item, as: "items" }],
      });

      return res.json({
        message: "Pedido atualizado com sucesso!",
        data: updatedOrder,
      });
    } catch (error) {
      return res.status(400).json({
        error: "Falha na atualização do pedido",
        message: error.message,
      });
    }
  }

  // Deletar pedido
  async delete(req, res) {
    try {
      const { orderId } = req.params;

      const order = await Order.findByPk(orderId);
      if (!order) {
        return res.status(404).json({ message: "Pedido não encontrado" });
      }

      await order.destroy();
      return res.json({ message: "Pedido deletado com sucesso!" });
    } catch (error) {
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
}

module.exports = new OrderController();
