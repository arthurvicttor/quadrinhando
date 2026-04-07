const prisma = require('../config/database')
const { AppError } = require('../middlewares/errorHandler')

const findAll = async () => {
  return prisma.universe.findMany({
    include: {
      company: {
        select: { id: true, name: true, logoUrl: true },
      },
      _count: {
        select: { comics: true, events: true },
      },
    },
    orderBy: { startYear: 'asc' },
  })
}

const findById = async (id) => {
  const universe = await prisma.universe.findUnique({
    where: { id },
    include: {
      company: {
        select: { id: true, name: true, logoUrl: true },
      },
      events: {
        select: { id: true, name: true, description: true },
        orderBy: { id: 'asc' },
      },
      _count: {
        select: { comics: true },
      },
    },
  })

  if (!universe) throw new AppError('Universo não encontrado.', 404)
  return universe
}

const findComicsByUniverse = async (id) => {
  // Garante que o universo existe
  const universe = await prisma.universe.findUnique({ where: { id } })
  if (!universe) throw new AppError('Universo não encontrado.', 404)

  const comics = await prisma.comic.findMany({
    where: { universeId: id },
    include: {
      characters: {
        include: {
          character: {
            select: { id: true, name: true, imageUrl: true },
          },
        },
        orderBy: { appearanceOrder: 'asc' },
      },
    },
    orderBy: { orderInUniverse: 'asc' },
  })

  return { universe: { id: universe.id, name: universe.name }, comics }
}

module.exports = { findAll, findById, findComicsByUniverse }