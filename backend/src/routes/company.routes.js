const { Router } = require("express");
const prisma = require("../config/database");

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const companies = await prisma.company.findMany({
      orderBy: { name: "asc" },
    });
    res.json({ status: "success", data: companies });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
