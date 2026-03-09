const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Users = require("../models/Users");

class AuthController {
  async login(req, res) {
    const { username, password } = req.body;
      // Procura se já existe o username
    try { 
      const user = await Users.findByPk(username);

      if (!user) {
        return res.status(401).json({ message: "Login inválido!" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: "Login inválido!" });
      }

      // Retorna o token fixo salvo no banco
      return res.json({ auth: true, token: user.token });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erro interno", message: error.message });
    }
  }
  async register(req, res) {
    const { username, password } = req.body;

    try {
      const existing = await Users.findByPk(username);
      if (existing) {
        return res.status(409).json({ message: "Usuário já existe!" });
      }

      // 1. Criptografa a senha
      const hash = await bcrypt.hash(password, 10);

      // 2. Gera o token fixo para o usuário
      const token = jwt.sign({ username }, process.env.JWT_SECRET);
      // Sem expiresIn = token permanente

      // 3. Cria o usuário já com o token salvo
      await Users.create({ username, password: hash, token });

      return res.status(201).json({
        message: "Usuário criado com sucesso!",
        token,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erro interno", message: error.message });
    }
  }
}

module.exports = new AuthController();
