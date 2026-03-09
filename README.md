# Estrutura de Arquivos - por enquanto

Certifique-se de que cada parte está em seu devido lugar para manter a separação de responsabilidades:

/src/config/database.js: Conexão com o banco SQL usando Sequelize.

/src/models: Arquivos Order.js e Item.js com o mapeamento para inglês (orderId, productId).

/src/controllers: OrderController.js (com o mapping de-para) e AuthController.js (para o JWT).

/src/routes: orderRoutes.js concentrando todos os endpoints.

/src/middlewares: auth.js validando o token Bearer.

src/app.js: O ponto de entrada que inicializa o servidor e o banco.
