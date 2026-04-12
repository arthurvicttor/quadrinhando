const prisma = require("../config/database");
const { AppError } = require("../middlewares/errorHandler");

const findAll = async ({ search } = {}) => {
  return prisma.character.findMany({
    where: search
      ? { name: { contains: search, mode: "insensitive" } }
      : undefined,
    include: {
      _count: { select: { comics: true } },
    },
    orderBy: { name: "asc" },
  });
};

const findById = async (id) => {
  const character = await prisma.character.findUnique({
    where: { id },
    include: {
      _count: { select: { comics: true } },
    },
  });

  if (!character) throw new AppError("Personagem não encontrado.", 404);
  return character;
};

const findComicsByCharacter = async (id) => {
  const character = await prisma.character.findUnique({ where: { id } });
  if (!character) throw new AppError("Personagem não encontrado.", 404);

  const comicRelations = await prisma.comicCharacter.findMany({
    where: { characterId: id },
    include: {
      comic: {
        include: {
          universe: {
            select: { id: true, name: true },
          },
        },
      },
    },
    orderBy: { appearanceOrder: "asc" },
  });

  const comics = comicRelations.map((rel) => ({
    appearanceOrder: rel.appearanceOrder,
    ...rel.comic,
  }));

  return { character: { id: character.id, name: character.name }, comics };
};

const create = async ({ name, description, imageUrl }) => {
  if (!name) throw new AppError("name é obrigatório.", 400);

  return prisma.character.create({
    data: { name, description, imageUrl },
  });
};

const update = async (id, { name, description, imageUrl }) => {
  await findById(id);

  return prisma.character.update({
    where: { id },
    data: { name, description, imageUrl },
  });
};

const remove = async (id) => {
  await findById(id);

  const hasComics = await prisma.comicCharacter.count({
    where: { characterId: id },
  });
  if (hasComics)
    throw new AppError(
      "Não é possível excluir um personagem vinculado a HQs.",
      409,
    );

  await prisma.character.delete({ where: { id } });
  return { message: "Personagem excluído com sucesso." };
};

module.exports = {
  findAll,
  findById,
  findComicsByCharacter,
  create,
  update,
  remove,
};
