# 🛒 Desafio Jitter — API de Pedidos

API RESTful para gerenciamento de pedidos, desenvolvida com Node.js, Express, Sequelize e PostgreSQL (Neon). Inclui autenticação JWT, documentação Swagger e integração com banco de dados em nuvem.

---

## 🚀 Tecnologias

- **Node.js** + **Express**
- **Sequelize** ORM
- **PostgreSQL** via [Neon](https://neon.tech)
- **JWT** (jsonwebtoken) para autenticação
- **bcrypt** para hash de senhas
- **Swagger UI** para documentação interativa
- **dotenv** para variáveis de ambiente

---

## 📁 Estrutura do Projeto

```
src/
├── config/
│   └── database.js        # Conexão com PostgreSQL (Neon)
├── controllers/
│   ├── AuthController.js  # Login e Register
│   └── OrderController.js # CRUD de pedidos
├── middlewares/
│   └── auth.js            # Validação do token JWT
├── models/
│   ├── Order.js           # Modelo de pedido
│   ├── Item.js            # Modelo de item
│   └── Users.js           # Modelo de usuário
├── routes/
│   └── orderRoutes.js     # Rotas da API
└── app.js                 # Entrada da aplicação
```

---

## ⚙️ Instalação

```bash
# Clone o repositório
git clone https://github.com/RobertdeSMaio/Desafio-jitter.git
cd Desafio-jitter

# Instale as dependências
npm install
```

---

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL=postgresql://usuario:senha@host/banco?sslmode=require
JWT_SECRET=sua_chave_secreta_aqui
PORT=3000
```

> A `DATABASE_URL` pode ser obtida no painel do [Neon](https://neon.tech) em **Connection Details → Connection string**.

---

## ▶️ Executando

```bash
npm start
```

A API estará disponível em `http://localhost:3000`  
A documentação Swagger estará em `http://localhost:3000/api-docs`

---

## 📌 Endpoints

### 🔑 Autenticação

| Método | Rota              | Descrição               | Auth |
|--------|-------------------|-------------------------|------|
| POST   | /order/register   | Registrar novo usuário  | ❌   |
| POST   | /order/login      | Login e geração de token| ❌   |

#### Register — Body:
```json
{
  "username": "admin",
  "password": "123456"
}
```

#### Login — Body:
```json
{
  "username": "admin",
  "password": "123456"
}
```

#### Resposta:
```json
{
  "auth": true,
  "token": "eyJhbGci..."
}
```

---

### 📦 Pedidos

| Método | Rota                  | Descrição               | Auth |
|--------|-----------------------|-------------------------|------|
| POST   | /order                | Criar novo pedido       | ✅   |
| GET    | /order/list           | Listar todos os pedidos | ❌   |
| GET    | /order/:orderId       | Buscar pedido por ID    | ❌   |
| PUT    | /order/:orderId       | Atualizar pedido        | ❌   |
| DELETE | /order/:orderId       | Deletar pedido          | ❌   |

#### Criar Pedido — Body:
```json
{
  "numeroPedido": "PED001",
  "valorTotal": 350.00,
  "dataCriacao": "2026-03-09",
  "items": [
    {
      "idItem": 101,
      "quantidadeItem": 2,
      "valorItem": 50.00
    },
    {
      "idItem": 102,
      "quantidadeItem": 1,
      "valorItem": 150.00
    }
  ]
}
```

#### Atualizar Pedido — Body:
```json
{
  "valorTotal": 500.00,
  "dataCriacao": "2026-03-09",
  "items": [
    {
      "idItem": 201,
      "quantidadeItem": 3,
      "valorItem": 100.00
    }
  ]
}
```

---

## 🔒 Autenticação nas Requisições

Para rotas protegidas, adicione o token no header:

```
Authorization: Bearer SEU_TOKEN_AQUI
```

No Postman: aba **Authorization** → **Bearer Token** → cole o token.

---

## 🗄️ Modelos do Banco

### orders
| Campo        | Tipo           | Descrição         |
|--------------|----------------|-------------------|
| orderId      | VARCHAR (PK)   | ID do pedido      |
| value        | DECIMAL(10,2)  | Valor total       |
| creationDate | TIMESTAMP      | Data de criação   |

### items
| Campo     | Tipo          | Descrição              |
|-----------|---------------|------------------------|
| id        | SERIAL (PK)   | ID do item             |
| productId | INTEGER       | ID do produto          |
| quantity  | INTEGER       | Quantidade             |
| price     | DECIMAL(10,2) | Preço unitário         |
| orderId   | VARCHAR (FK)  | Referência ao pedido   |

### users
| Campo        | Tipo         | Descrição             |
|--------------|--------------|-----------------------|
| username     | VARCHAR (PK) | Nome de usuário       |
| password     | VARCHAR      | Senha (hash bcrypt)   |
| token        | TEXT         | Token JWT fixo        |
| creationDate | TIMESTAMP    | Data de criação       |

---

## 📄 Documentação Swagger

Acesse `http://localhost:3000/api-docs` para visualizar e testar todos os endpoints diretamente pelo navegador.

---

## 👤 Autor

**Robert de S. Maio**  
[github.com/RobertdeSMaio](https://github.com/RobertdeSMaio)
