const { Router } = require("express");
const universeRoutes = require("./universe.routes");
const characterRoutes = require("./character.routes");
const comicRoutes = require("./comic.routes");
const authRoutes = require("./auth.routes");
const sagaRoutes = require("./saga.routes");
const companyRoutes = require("./company.routes");

const router = Router();

router.use("/auth", authRoutes);
router.use("/universes", universeRoutes);
router.use("/characters", characterRoutes);
router.use("/comics", comicRoutes);
router.use("/sagas", sagaRoutes);
router.use("/companies", companyRoutes);

router.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

module.exports = router;
