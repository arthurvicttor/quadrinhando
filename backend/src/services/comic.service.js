const prisma = require("../config/database");
const { AppError } = require("../middlewares/errorHandler");

const findAll = async () => {
  return prisma.comic.findMany({
    include: {
      universe: { select: { id: true, name: true } },
      characters: {
        include: { character: { select: { id: true, name: true } } },
        orderBy: { appearanceOrder: "asc" },
      },
    },
    orderBy: { orderInUniverse: "asc" },
  });
};

const findById = async (id) => {
  const comic = await prisma.comic.findUnique({
    where: { id },
    include: {
      universe: { select: { id: true, name: true } },
      characters: {
        include: {
          character: { select: { id: true, name: true, imageUrl: true } },
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
  universeId,
  orderInUniverse,
  coverUrl,
  officialBuyLink,
  characters,
}) => {
  if (!title || !universeId || orderInUniverse === undefined)
    throw new AppError(
      "title, universeId e orderInUniverse são obrigatórios.",
      400,
    );

  const universe = await prisma.universe.findUnique({
    where: { id: universeId },
  });
  if (!universe) throw new AppError("Universo não encontrado.", 404);

  const comic = await prisma.comic.create({
    data: {
      title,
      volume: volume ?? 1,
      issueNumber,
      universeId,
      orderInUniverse,
      coverUrl,
      officialBuyLink,
      // Cria as relações com personagens se enviados
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
      universe: { select: { id: true, name: true } },
      characters: {
        include: { character: { select: { id: true, name: true } } },
        orderBy: { appearanceOrder: "asc" },
      },
    },
  });

  return comic;
};

const update = async (
  id,
  {
    title,
    volume,
    issueNumber,
    universeId,
    orderInUniverse,
    coverUrl,
    officialBuyLink,
  },
) => {
  await findById(id);

  if (universeId) {
    const universe = await prisma.universe.findUnique({
      where: { id: universeId },
    });
    if (!universe) throw new AppError("Universo não encontrado.", 404);
  }

  return prisma.comic.update({
    where: { id },
    data: {
      title,
      volume,
      issueNumber,
      universeId,
      orderInUniverse,
      coverUrl,
      officialBuyLink,
    },
    include: {
      universe: { select: { id: true, name: true } },
      characters: {
        include: { character: { select: { id: true, name: true } } },
        orderBy: { appearanceOrder: "asc" },
      },
    },
  });
};

const remove = async (id) => {
  await findById(id);

  // Remove as relações antes de deletar
  await prisma.comicCharacter.deleteMany({ where: { comicId: id } });
  await prisma.comic.delete({ where: { id } });

  return { message: "HQ excluída com sucesso." };
};

module.exports = { findAll, findById, create, update, remove };
