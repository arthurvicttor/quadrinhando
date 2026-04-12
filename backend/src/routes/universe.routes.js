const { Router } = require("express");
const ctrl = require("../controllers/universe.controller");
const {
  authenticate,
  requireAdmin,
} = require("../middlewares/auth.middleware");

const router = Router();

// Rotas públicas
router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getById);
router.get("/:id/comics", ctrl.getComics);

// Rotas protegidas por autenticação e autorização de admin
router.post("/", authenticate, requireAdmin, ctrl.create);
router.put("/:id", authenticate, requireAdmin, ctrl.update);
router.delete("/:id", authenticate, requireAdmin, ctrl.remove);

module.exports = router;
