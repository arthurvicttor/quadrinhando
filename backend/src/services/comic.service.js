const prisma = require("../config/database");
const { AppError } = require("../middlewares/errorHandler");
const slugify = require("../utils/slug");

const findAll = async () => {
  return prisma.comic.findMany({
    include: {
      saga: {
        include: { universe: { select: { id: true, name: true, slug: true } } },
      },
      characters: {
        include: {
          character: { select: { id: true, name: true, slug: true } },
        },
        orderBy: { appearanceOrder: "asc" },
      },
    },
    orderBy: { orderInSaga: "asc" },
  });
};

const findBySlug = async (slug) => {
  const comic = await prisma.comic.findUnique({
    where: { slug },
    include: {
      saga: {
        include: { universe: { select: { id: true, name: true, slug: true } } },
      },
      characters: {
        include: {
          character: {
            select: { id: true, name: true, slug: true, imageUrl: true },
          },
        },
        orderBy: { appearanceOrder: "asc" },
      },
    },
  });

  if (!comic) throw new AppError("HQ não encontrada.", 404);
  return comic;
};

const create = async ({
  title,
  volume,
  issueNumber,
  sagaId,
  orderInSaga,
  coverUrl,
  officialBuyLink,
  characters,
}) => {
  if (!title || !sagaId || orderInSaga === undefined)
    throw new AppError("title, sagaId e orderInSaga são obrigatórios.", 400);

  const saga = await prisma.saga.findUnique({ where: { id: sagaId } });
  if (!saga) throw new AppError("Saga não encontrada.", 404);

  const slug = slugify(`${title} ${issueNumber || orderInSaga}`);

  return prisma.comic.create({
    data: {
      title,
      slug,
      volume: volume ?? 1,
      issueNumber,
      sagaId,
      orderInSaga,
      coverUrl,
      officialBuyLink,
      characters: characters?.length
        ? {
            create: characters.map((c) => ({
              characterId: c.characterId,
              appearanceOrder: c.appearanceOrder ?? 0,
            })),
          }
        : undefined,
    },
    include: {
      saga: {
        include: { universe: { select: { id: true, name: true, slug: true } } },
      },
      characters: {
        include: {
          character: { select: { id: true, name: true, slug: true } },
        },
        orderBy: { appearanceOrder: "asc" },
      },
    },
  });
};

const update = async (
  id,
  {
    title,
    volume,
    issueNumber,
    sagaId,
    orderInSaga,
    coverUrl,
    officialBuyLink,
  },
) => {
  const comic = await prisma.comic.findUnique({ where: { id } });
  if (!comic) throw new AppError("HQ não encontrada.", 404);

  if (sagaId) {
    const saga = await prisma.saga.findUnique({ where: { id: sagaId } });
    if (!saga) throw new AppError("Saga não encontrada.", 404);
  }

  const slug = title
    ? slugify(`${title} ${issueNumber || orderInSaga || comic.orderInSaga}`)
    : comic.slug;

  return prisma.comic.update({
    where: { id },
    data: {
      title,
      slug,
      volume,
      issueNumber,
      sagaId,
      orderInSaga,
      coverUrl,
      officialBuyLink,
    },
    include: {
      saga: {
        include: { universe: { select: { id: true, name: true, slug: true } } },
      },
      characters: {
        include: {
          character: { select: { id: true, name: true, slug: true } },
        },
        orderBy: { appearanceOrder: "asc" },
      },
    },
  });
};

const remove = async (id) => {
  const comic = await prisma.comic.findUnique({ where: { id } });
  if (!comic) throw new AppError("HQ não encontrada.", 404);

  await prisma.comicCharacter.deleteMany({ where: { comicId: id } });
  await prisma.comic.delete({ where: { id } });
  return { message: "HQ excluída com sucesso." };
};

module.exports = { findAll, findBySlug, create, update, remove };
