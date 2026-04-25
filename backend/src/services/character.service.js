const prisma = require("../config/database");
const { AppError } = require("../middlewares/errorHandler");
const slugify = require("../utils/slug");

const findAll = async ({ search } = {}) => {
  return prisma.character.findMany({
    where: search
      ? { name: { contains: search, mode: "insensitive" } }
      : undefined,
    include: { _count: { select: { comics: true } } },
    orderBy: { name: "asc" },
  });
};

const findBySlug = async (slug) => {
  const character = await prisma.character.findUnique({
    where: { slug },
    include: { _count: { select: { comics: true } } },
  });

  if (!character) throw new AppError("Personagem não encontrado.", 404);
  return character;
};

const findComicsByCharacter = async (slug) => {
  const character = await prisma.character.findUnique({ where: { slug } });
  if (!character) throw new AppError("Personagem não encontrado.", 404);

  const comicRelations = await prisma.comicCharacter.findMany({
    where: { characterId: character.id },
    include: {
      comic: {
        include: {
          saga: {
            include: {
              universe: { select: { id: true, name: true, slug: true } },
            },
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

  return {
    character: { id: character.id, name: character.name, slug: character.slug },
    comics,
  };
};

const create = async ({ name, description, imageUrl }) => {
  if (!name) throw new AppError("name é obrigatório.", 400);
  const slug = slugify(name);
  return prisma.character.create({
    data: { name, slug, description, imageUrl },
  });
};

const update = async (id, { name, description, imageUrl }) => {
  const character = await prisma.character.findUnique({ where: { id } });
  if (!character) throw new AppError("Personagem não encontrado.", 404);

  const slug = name ? slugify(name) : character.slug;

  return prisma.character.update({
    where: { id },
    data: { name, slug, description, imageUrl },
  });
};

const remove = async (id) => {
  const character = await prisma.character.findUnique({ where: { id } });
  if (!character) throw new AppError("Personagem não encontrado.", 404);

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
  findBySlug,
  findComicsByCharacter,
  create,
  update,
  remove,
};
