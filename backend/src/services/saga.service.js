const prisma = require("../config/database");
const { AppError } = require("../middlewares/errorHandler");
const slugify = require("../utils/slug");

const findBySlug = async (slug) => {
  const saga = await prisma.saga.findUnique({
    where: { slug },
    include: {
      universe: { select: { id: true, name: true, slug: true } },
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

  if (!saga) throw new AppError("Saga não encontrada.", 404);
  return saga;
};

const create = async ({ name, description, order, universeId }) => {
  const universe = await prisma.universe.findUnique({
    where: { id: universeId },
  });
  if (!universe) throw new AppError("Universo não encontrado.", 404);

  const slug = slugify(`${name} ${universe.name}`);

  return prisma.saga.create({
    data: { name, slug, description, order, universeId },
    include: { universe: { select: { id: true, name: true, slug: true } } },
  });
};

const update = async (id, { name, description, order, universeId }) => {
  const saga = await prisma.saga.findUnique({ where: { id } });
  if (!saga) throw new AppError("Saga não encontrada.", 404);

  const slug = name ? slugify(`${name}`) : saga.slug;

  return prisma.saga.update({
    where: { id },
    data: { name, slug, description, order, universeId },
    include: { universe: { select: { id: true, name: true, slug: true } } },
  });
};

const remove = async (id) => {
  const saga = await prisma.saga.findUnique({ where: { id } });
  if (!saga) throw new AppError("Saga não encontrada.", 404);

  const hasComics = await prisma.comic.count({ where: { sagaId: id } });
  if (hasComics)
    throw new AppError("Não é possível excluir uma saga que possui HQs.", 409);

  await prisma.saga.delete({ where: { id } });
  return { message: "Saga excluída com sucesso." };
};

module.exports = { findBySlug, create, update, remove };
