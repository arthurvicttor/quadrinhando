const prisma = require('../config/database')
const { AppError } = require('../middlewares/errorHandler')

const findById = async (id) => {
  const comic = await prisma.comic.findUnique({
    where: { id },
    include: {
      universe: {
        select: { id: true, name: true },
      },
      characters: {
        include: {
          character: {
            select: { id: true, name: true, imageUrl: true },
          },
        },
        orderBy: { appearanceOrder: 'asc' },
      },
    },
  })

  if (!comic) throw new AppError('HQ não encontrada.', 404)
  return comic
}

module.exports = { findById }