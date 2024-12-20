import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearDatabase() {
  try {
    // Delete Clicks first as they have foreign key relations to Url
    await prisma.click.deleteMany();

    // Delete Urls next, which are related to Workspaces
    await prisma.url.deleteMany();

    await prisma.workspace.deleteMany();

    // await prisma.user.deleteMany();

    console.log("Database cleared successfully");
  } catch (error) {
    console.error("Error clearing database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

clearDatabase();
