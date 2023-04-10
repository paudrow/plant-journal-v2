import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getPlants: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.plant.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        PlantEvent: true,
        PlantImage: true,
      },
    });
  }),

  getPlant: protectedProcedure
    .input(z.object({ plantId: z.string() }))
    .query(async ({ ctx, input }) => {
      const plant = await ctx.prisma.plant.findUnique({
        where: {
          id: input.plantId,
        },
        include: {
          PlantEvent: true,
          PlantImage: true,
        },
      });
      if (!plant) {
        throw new Error("Plant not found");
      }
      return plant;
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
