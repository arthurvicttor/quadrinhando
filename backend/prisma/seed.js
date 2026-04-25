const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const slugify = require("../src/utils/slug");
const prisma = new PrismaClient();

async function main() {
  console.log("Iniciando seed...");

  // --- Companies ---
  const marvel = await prisma.company.upsert({
    where: { name: "Marvel Comics" },
    update: {},
    create: {
      name: "Marvel Comics",
      description:
        "A Marvel Comics é uma editora americana de histórias em quadrinhos.",
      logoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/b/b9/Marvel_Logo.svg",
    },
  });

  const dc = await prisma.company.upsert({
    where: { name: "DC Comics" },
    update: {},
    create: {
      name: "DC Comics",
      description:
        "A DC Comics é uma editora americana de histórias em quadrinhos.",
      logoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/3/3d/DC_Comics_logo.svg",
    },
  });

  console.log("✅ Companies criadas");

  // --- Universes ---
  const marvelUniverse = await prisma.universe.create({
    data: {
      name: "Marvel 616 (Terra-616)",
      slug: slugify("Marvel 616 Terra-616"),
      description: "O universo principal da Marvel Comics.",
      startYear: 1961,
      companyId: marvel.id,
    },
  });

  const dcUniverse = await prisma.universe.create({
    data: {
      name: "DC Prime Earth (New 52)",
      slug: slugify("DC Prime Earth New 52"),
      description:
        "O universo principal da DC após o reboot do New 52 em 2011.",
      startYear: 2011,
      companyId: dc.id,
    },
  });

  console.log("✅ Universos criados");

  // --- Sagas ---
  const sagaGuerraCivil = await prisma.saga.create({
    data: {
      name: "Guerra Civil",
      slug: slugify("Guerra Civil Marvel"),
      description:
        "Conflito entre heróis sobre o Ato de Registro de Super-Humanos.",
      order: 1,
      universeId: marvelUniverse.id,
    },
  });

  const sagaGuerraInfinita = await prisma.saga.create({
    data: {
      name: "Guerra Infinita",
      slug: slugify("Guerra Infinita Marvel"),
      description:
        "Thanos busca as Joias do Infinito para reequilibrar o universo.",
      order: 2,
      universeId: marvelUniverse.id,
    },
  });

  const sagaBatman = await prisma.saga.create({
    data: {
      name: "Batman - Início",
      slug: slugify("Batman Inicio DC"),
      description: "As origens do homem morcego em Gotham City.",
      order: 1,
      universeId: dcUniverse.id,
    },
  });

  const sagaFlashpoint = await prisma.saga.create({
    data: {
      name: "Flashpoint",
      slug: slugify("Flashpoint DC"),
      description:
        "Barry Allen altera o passado e cria uma realidade alternativa.",
      order: 2,
      universeId: dcUniverse.id,
    },
  });

  console.log("✅ Sagas criadas");

  // --- Characters ---
  const homemAranha = await prisma.character.create({
    data: {
      name: "Homem-Aranha (Peter Parker)",
      slug: slugify("Homem-Aranha Peter Parker"),
      description:
        "Picado por uma aranha radioativa, Peter Parker ganhou habilidades sobre-humanas.",
      imageUrl:
        "https://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b.jpg",
    },
  });

  const ironMan = await prisma.character.create({
    data: {
      name: "Homem de Ferro (Tony Stark)",
      slug: slugify("Homem de Ferro Tony Stark"),
      description: "Gênio bilionário que construiu uma armadura tecnológica.",
      imageUrl:
        "https://i.annihil.us/u/prod/marvel/i/mg/9/c0/527bb7b37ff55.jpg",
    },
  });

  const capitaoAmerica = await prisma.character.create({
    data: {
      name: "Capitão América (Steve Rogers)",
      slug: slugify("Capitao America Steve Rogers"),
      description: "Super-soldado da Segunda Guerra Mundial.",
      imageUrl:
        "https://i.annihil.us/u/prod/marvel/i/mg/3/50/537ba56d31087.jpg",
    },
  });

  const batman = await prisma.character.create({
    data: {
      name: "Batman (Bruce Wayne)",
      slug: slugify("Batman Bruce Wayne"),
      description:
        "Bilionário que dedicou sua vida a combater o crime como Batman.",
      imageUrl:
        "https://www.dc.com/sites/default/files/imce/characters/batman_0.jpg",
    },
  });

  const superman = await prisma.character.create({
    data: {
      name: "Superman (Clark Kent)",
      slug: slugify("Superman Clark Kent"),
      description:
        "Kryptoniano enviado à Terra, dotado de poderes sobre-humanos.",
      imageUrl:
        "https://www.dc.com/sites/default/files/imce/characters/superman.jpg",
    },
  });

  console.log("✅ Personagens criados");

  // --- Comics ---
  const civilWar1 = await prisma.comic.create({
    data: {
      title: "Guerra Civil",
      slug: slugify("Guerra Civil 1"),
      volume: 1,
      issueNumber: 1,
      sagaId: sagaGuerraCivil.id,
      orderInSaga: 1,
      coverUrl: "https://i.annihil.us/u/prod/marvel/i/mg/b/40/image.jpg",
      officialBuyLink: "https://www.panini.com.br",
    },
  });

  const civilWar2 = await prisma.comic.create({
    data: {
      title: "Guerra Civil",
      slug: slugify("Guerra Civil 2"),
      volume: 1,
      issueNumber: 2,
      sagaId: sagaGuerraCivil.id,
      orderInSaga: 2,
      coverUrl: "https://i.annihil.us/u/prod/marvel/i/mg/b/40/image.jpg",
      officialBuyLink: "https://www.panini.com.br",
    },
  });

  const infinityWar = await prisma.comic.create({
    data: {
      title: "Guerra Infinita",
      slug: slugify("Guerra Infinita 1"),
      volume: 1,
      issueNumber: 1,
      sagaId: sagaGuerraInfinita.id,
      orderInSaga: 1,
      coverUrl: "https://i.annihil.us/u/prod/marvel/i/mg/b/40/image.jpg",
      officialBuyLink: "https://www.panini.com.br",
    },
  });

  const batmanYear1 = await prisma.comic.create({
    data: {
      title: "Batman: Ano Um",
      slug: slugify("Batman Ano Um 1"),
      volume: 1,
      issueNumber: 1,
      sagaId: sagaBatman.id,
      orderInSaga: 1,
      coverUrl:
        "https://www.dc.com/sites/default/files/imce/books/batman-year-one.jpg",
      officialBuyLink: "https://www.dccomics.com",
    },
  });

  const flashpoint = await prisma.comic.create({
    data: {
      title: "Flashpoint",
      slug: slugify("Flashpoint 1"),
      volume: 1,
      issueNumber: 1,
      sagaId: sagaFlashpoint.id,
      orderInSaga: 1,
      coverUrl:
        "https://www.dc.com/sites/default/files/imce/books/flashpoint.jpg",
      officialBuyLink: "https://www.dccomics.com",
    },
  });

  console.log("✅ HQs criadas");

  // --- ComicCharacters ---
  await prisma.comicCharacter.createMany({
    data: [
      { comicId: civilWar1.id, characterId: ironMan.id, appearanceOrder: 1 },
      {
        comicId: civilWar1.id,
        characterId: capitaoAmerica.id,
        appearanceOrder: 2,
      },
      {
        comicId: civilWar1.id,
        characterId: homemAranha.id,
        appearanceOrder: 3,
      },
      { comicId: civilWar2.id, characterId: ironMan.id, appearanceOrder: 1 },
      {
        comicId: civilWar2.id,
        characterId: capitaoAmerica.id,
        appearanceOrder: 2,
      },
      { comicId: infinityWar.id, characterId: ironMan.id, appearanceOrder: 1 },
      {
        comicId: infinityWar.id,
        characterId: homemAranha.id,
        appearanceOrder: 2,
      },
      {
        comicId: infinityWar.id,
        characterId: capitaoAmerica.id,
        appearanceOrder: 3,
      },
      { comicId: batmanYear1.id, characterId: batman.id, appearanceOrder: 1 },
      { comicId: flashpoint.id, characterId: batman.id, appearanceOrder: 1 },
      { comicId: flashpoint.id, characterId: superman.id, appearanceOrder: 2 },
    ],
  });

  // --- Events ---
  await prisma.event.createMany({
    data: [
      {
        name: "Guerra Civil",
        description: "Conflito entre heróis.",
        universeId: marvelUniverse.id,
      },
      {
        name: "Guerra Infinita",
        description: "Thanos busca as Joias do Infinito.",
        universeId: marvelUniverse.id,
      },
      {
        name: "Flashpoint",
        description: "Barry Allen altera o passado.",
        universeId: dcUniverse.id,
      },
    ],
  });

  // --- Admin ---
  const adminPassword = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { email: "admin@quadrinhando.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@quadrinhando.com",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  console.log("✅ Seed concluído com sucesso!");
}

main()
  .catch((e) => {
    console.error("❌ Erro no seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
