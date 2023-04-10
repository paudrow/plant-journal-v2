import { prisma } from "../src/server/db";

async function main() {
  const user = await prisma.user.findFirst({
    where: {
      name: "Audrow",
    },
  });

  if (!user) {
    throw new Error("User not found");
  }


  const plantId = "clga2osuf0000vmuehkqair03";
  await prisma.plant.upsert({
    where: {
      id: plantId,
    },
    create: {
      id: plantId,
      name: "Plant 1",
      userId: user.id,
    },
    update: {},
  });

  const plantEventId = "clga2osuf0001vmuehj2q2q2q";
  await prisma.plantEvent.upsert({
    where: {
      id: plantEventId,
    },
    create: {
      id: plantEventId,
      event: "WATERED",
      plantId: plantId,
    },
    update: {},
  });

  const plantImageId = "clga2osuf0002vmuehj2q2q2q";
  await prisma.plantImage.upsert({
    where: {
      id: plantImageId,
    },
    create: {
      id: plantImageId,
      plantId: plantId,
      imageUrl: "https://example.com/image.png",
    },
    update: {},
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });