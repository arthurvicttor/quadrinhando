const prisma = require("../config/database");
const { AppError } = require("../middlewares/errorHandler");
const slugify = require("../utils/slug");

const findAll = async () => {
  return prisma.universe.findMany({
    include: {
      company: { select: { id: true, name: true, logoUrl: true } },
      _count: { select: { sagas: true } },
    },
    orderBy: { startYear: "asc" },
  });
};

const findBySlug = async (slug) => {
  const universe = await prisma.universe.findUnique({
    where: { slug },
    include: {
      company: { select: { id: true, name: true, logoUrl: true } },
      events: { select: { id: true, name: true, description: true } },
      sagas: {
        orderBy: { order: "asc" },
        include: {
          _count: { select: { comics: true } },
        },
      },
    },
  });

  if (!universe) throw new AppError("Universo não encontrado.", 404);
  return universe;
};

const findSagasByUniverse = async (slug) => {
  const universe = await prisma.universe.findUnique({ where: { slug } });
  if (!universe) throw new AppError("Universo não encontrado.", 404);

  return prisma.saga.findMany({
    where: { universeId: universe.id },
    orderBy: { order: "asc" },
    include: {
      comics: {
        orderBy: { orderInSaga: "asc" },
        include: {
          characters: {
            include: {
              character: {
                select: { id: true, name: true, slug: true, imageUrl: true },
              },
            },
            orderBy: { appearanceOrder: "asc" },
          },
        },
      },
    },
  });
};

const create = async ({ name, description, startYear, companyId }) => {
  const company = await prisma.company.findUnique({ where: { id: companyId } });
  if (!company) throw new AppError("Empresa não encontrada.", 404);

  const slug = slugify(name);

  return prisma.universe.create({
    data: { name, slug, description, startYear, companyId },
    include: { company: { select: { id: true, name: true } } },
  });
};

const update = async (id, { name, description, startYear, companyId }) => {
  const universe = await prisma.universe.findUnique({ where: { id } });
  if (!universe) throw new AppError("Universo não encontrado.", 404);

  if (companyId) {
    const company = await prisma.company.findUnique({
      where: { id: companyId },
    });
    if (!company) throw new AppError("Empresa não encontrada.", 404);
  }

  const slug = name ? slugify(name) : universe.slug;

  return prisma.universe.update({
    where: { id },
    data: { name, slug, description, startYear, companyId },
    include: { company: { select: { id: true, name: true } } },
  });
};

const remove = async (id) => {
  const universe = await prisma.universe.findUnique({ where: { id } });
  if (!universe) throw new AppError("Universo não encontrado.", 404);

  const hasSagas = await prisma.saga.count({ where: { universeId: id } });
  if (hasSagas)
    throw new AppError(
      "Não é possível excluir um universo que possui sagas.",
      409,
    );

  await prisma.universe.delete({ where: { id } });
  return { message: "Universo excluído com sucesso." };
};

module.exports = {
  findAll,
  findBySlug,
  findSagasByUniverse,
  create,
  update,
  remove,
};
