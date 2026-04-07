// prisma/seed.js
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('Iniciando seed...')

  // --- Companhias ---
  const marvel = await prisma.company.upsert({
    where: { name: 'Marvel Comics' },
    update: {},
    create: {
      name: 'Marvel Comics',
      description: 'A Marvel Comics é uma editora americana de histórias em quadrinhos.',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Marvel_Logo.svg',
    },
  })

  const dc = await prisma.company.upsert({
    where: { name: 'DC Comics' },
    update: {},
    create: {
      name: 'DC Comics',
      description: 'A DC Comics é uma editora americana de histórias em quadrinhos.',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/DC_Comics_logo.svg',
    },
  })

  console.log('Companhia criadas')

  // --- Universos ---
  const marvelUniverse = await prisma.universe.create({
    data: {
      name: 'Marvel 616 (Terra-616)',
      description: 'O universo principal da Marvel Comics, onde a maioria das histórias acontece.',
      startYear: 1961,
      companyId: marvel.id,
    },
  })

  const dcUniverse = await prisma.universe.create({
    data: {
      name: 'DC Prime Earth (New 52)',
      description: 'O universo principal da DC após o reboot do New 52 em 2011.',
      startYear: 2011,
      companyId: dc.id,
    },
  })

  console.log('Universos criados')

  // --- Personagens ---
  const homemAranha = await prisma.character.create({
    data: {
      name: 'Homem-Aranha (Peter Parker)',
      description: 'Picado por uma aranha radioativa, Peter Parker ganhou habilidades sobre-humanas e se tornou o Homem-Aranha.',
      imageUrl: 'https://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b.jpg',
    },
  })

  const ironMan = await prisma.character.create({
    data: {
      name: 'Homem de Ferro (Tony Stark)',
      description: 'Gênio bilionário que construiu uma armadura tecnológica para se tornar o Homem de Ferro.',
      imageUrl: 'https://i.annihil.us/u/prod/marvel/i/mg/9/c0/527bb7b37ff55.jpg',
    },
  })

  const capitaoAmerica = await prisma.character.create({
    data: {
      name: 'Capitão América (Steve Rogers)',
      description: 'Super-soldado da Segunda Guerra Mundial, símbolo de patriotismo e justiça.',
      imageUrl: 'https://i.annihil.us/u/prod/marvel/i/mg/3/50/537ba56d31087.jpg',
    },
  })

  const batman = await prisma.character.create({
    data: {
      name: 'Batman (Bruce Wayne)',
      description: 'Bilionário que, após testemunhar a morte dos pais, dedicou sua vida a combater o crime como Batman.',
      imageUrl: 'https://www.dc.com/sites/default/files/imce/characters/batman_0.jpg',
    },
  })

  const superman = await prisma.character.create({
    data: {
      name: 'Superman (Clark Kent)',
      description: 'Kryptoniano enviado à Terra, dotado de poderes sobre-humanos sob o sol amarelo.',
      imageUrl: 'https://www.dc.com/sites/default/files/imce/characters/superman.jpg',
    },
  })

  console.log('✅ Personagens criados')

  // --- Quadrinhos (Marvel) ---
  const amFearItself = await prisma.comic.create({
    data: {
      title: 'Homem-Aranha: Revelação',
      volume: 1,
      issueNumber: 1,
      universeId: marvelUniverse.id,
      orderInUniverse: 1,
      coverUrl: 'https://i.annihil.us/u/prod/marvel/i/mg/e/10/4bc66b6e8e36b.jpg',
      officialBuyLink: 'https://www.panini.com.br',
    },
  })

  const civilWar1 = await prisma.comic.create({
    data: {
      title: 'Guerra Civil',
      volume: 1,
      issueNumber: 1,
      universeId: marvelUniverse.id,
      orderInUniverse: 2,
      coverUrl: 'https://i.annihil.us/u/prod/marvel/i/mg/b/40/image.jpg',
      officialBuyLink: 'https://www.panini.com.br',
    },
  })

  const civilWar2 = await prisma.comic.create({
    data: {
      title: 'Guerra Civil',
      volume: 1,
      issueNumber: 2,
      universeId: marvelUniverse.id,
      orderInUniverse: 3,
      coverUrl: 'https://i.annihil.us/u/prod/marvel/i/mg/b/40/image.jpg',
      officialBuyLink: 'https://www.panini.com.br',
    },
  })

  const infinityWar = await prisma.comic.create({
    data: {
      title: 'Guerra Infinita',
      volume: 1,
      issueNumber: 1,
      universeId: marvelUniverse.id,
      orderInUniverse: 4,
      coverUrl: 'https://i.annihil.us/u/prod/marvel/i/mg/b/40/image.jpg',
      officialBuyLink: 'https://www.panini.com.br',
    },
  })

  // --- Comics (DC) ---
  const batmanYear1 = await prisma.comic.create({
    data: {
      title: 'Batman: Ano Um',
      volume: 1,
      issueNumber: 1,
      universeId: dcUniverse.id,
      orderInUniverse: 1,
      coverUrl: 'https://www.dc.com/sites/default/files/imce/books/batman-year-one.jpg',
      officialBuyLink: 'https://www.dccomics.com',
    },
  })

  const flashpoint = await prisma.comic.create({
    data: {
      title: 'Flashpoint',
      volume: 1,
      issueNumber: 1,
      universeId: dcUniverse.id,
      orderInUniverse: 2,
      coverUrl: 'https://www.dc.com/sites/default/files/imce/books/flashpoint.jpg',
      officialBuyLink: 'https://www.dccomics.com',
    },
  })

  console.log('HQs criadas')

  await prisma.comicCharacter.createMany({
    data: [
      // Homem-Aranha: Revelação
      { comicId: amFearItself.id, characterId: homemAranha.id, appearanceOrder: 1 },

      // Guerra Civil #1
      { comicId: civilWar1.id, characterId: ironMan.id, appearanceOrder: 1 },
      { comicId: civilWar1.id, characterId: capitaoAmerica.id, appearanceOrder: 2 },
      { comicId: civilWar1.id, characterId: homemAranha.id, appearanceOrder: 3 },

      // Guerra Civil #2
      { comicId: civilWar2.id, characterId: ironMan.id, appearanceOrder: 1 },
      { comicId: civilWar2.id, characterId: capitaoAmerica.id, appearanceOrder: 2 },

      // Guerra Infinita
      { comicId: infinityWar.id, characterId: ironMan.id, appearanceOrder: 1 },
      { comicId: infinityWar.id, characterId: homemAranha.id, appearanceOrder: 2 },
      { comicId: infinityWar.id, characterId: capitaoAmerica.id, appearanceOrder: 3 },

      // Batman: Ano Um
      { comicId: batmanYear1.id, characterId: batman.id, appearanceOrder: 1 },

      // Flashpoint
      { comicId: flashpoint.id, characterId: batman.id, appearanceOrder: 1 },
      { comicId: flashpoint.id, characterId: superman.id, appearanceOrder: 2 },
    ],
  })

  // --- Events ---
  await prisma.event.createMany({
    data: [
      {
        name: 'Guerra Civil',
        description: 'Conflito entre heróis sobre o Ato de Registro de Super-Humanos.',
        universeId: marvelUniverse.id,
      },
      {
        name: 'Guerra Infinita',
        description: 'Thanos busca as Joias do Infinito para reequilibrar o universo.',
        universeId: marvelUniverse.id,
      },
      {
        name: 'Flashpoint',
        description: 'Barry Allen altera o passado e cria uma realidade alternativa.',
        universeId: dcUniverse.id,
      },
    ],
  })

  console.log('Eventos e relações criadas')
  console.log('Seed concluído com sucesso!')
}

main()
  .catch((e) => {
    console.error('Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })