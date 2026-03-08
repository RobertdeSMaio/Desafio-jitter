const jwt = require("jsonwebtoken");

class AuthController {
  async login(req, res) {
    const { username, password } = req.body;

    // Validação simples (Substituir por consulta ao banco SQL em produção)
    if (username === "admin" && password === "123456") {
      const id = 1; // ID do usuário vindo do banco

      // Gera o token com validade de 1 hora
      const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      return res.json({
        auth: true,
        token: token,
      });
    }

    return res.status(401).json({ message: "Login inválido!" });
  }
}

module.exports = new AuthController();
