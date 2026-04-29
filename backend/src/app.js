const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const { errorHandler } = require("./middlewares/errorHandler");
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requisições por IP
  message: {
    status: "error",
    message: "Muitas requisições. Tente novamente em 15 minutos.",
  },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10, // só 10 tentativas de login por IP
  message: { status: "error", message: "Muitas tentativas de login." },
});
const helmet = require("helmet");

const app = express();

app.use(cors());
app.use(express.json());

// Todas as rotas prefixadas com /api/v1
app.use("/api/v1", routes);

// Rota não encontrada
app.use((req, res) => {
  res.status(404).json({ status: "error", message: "Rota não encontrada." });
});

// Middleware de erros (SEMPRE por último)
app.use(errorHandler);

// Aplicando rate limiters
app.use("/api/v1", limiter);
app.use("/api/v1/auth", authLimiter);

// Aplicando Helmet para segurança
app.use(helmet());

module.exports = app;
