const { Router } = require("express");
const ctrl = require("../controllers/saga.controller");
const {
  authenticate,
  requireAdmin,
} = require("../middlewares/auth.middleware");

const router = Router();

// Rotas públicas
router.get("/:slug", ctrl.getBySlug);

// Rotas protegidas por autenticação e autorização de admin
router.post("/", authenticate, requireAdmin, ctrl.create);
router.put("/:id", authenticate, requireAdmin, ctrl.update);
router.delete("/:id", authenticate, requireAdmin, ctrl.remove);

module.exports = router;
