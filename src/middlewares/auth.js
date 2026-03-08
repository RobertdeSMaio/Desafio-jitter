const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // 1. Obtém o token do cabeçalho 'Authorization'
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  // O padrão comum é "Bearer <TOKEN>"
  const parts = authHeader.split(" ");

  if (parts.length !== 2) {
    return res.status(401).json({ error: "Erro no formato do token" });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: "Token malformatado" });
  }

  // 2. Verifica a validade do token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Token inválido ou expirado" });
    }

    // 3. Salva o ID do usuário (ou outros dados) na requisição para uso posterior
    req.userId = decoded.id;
    return next(); // Prossegue para o Controller
  });
};

module.exports = authMiddleware;
