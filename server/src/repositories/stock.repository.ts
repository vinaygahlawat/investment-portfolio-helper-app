import { PrismaClient, Stock, StepData, Prisma } from "@prisma/client";

type StockWithSteps = Prisma.StockGetPayload<{
  include: { stepValues: { orderBy: { date: "asc" } } };
}>;

export class StockRepository {
  private prisma: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }

  async getStockByTicker(ticker: string): Promise<StockWithSteps | null> {
    return this.prisma.stock.findUnique({
      where: { ticker: ticker },
      include: { stepValues: { orderBy: { date: "asc" } } },
    });
  }
}
