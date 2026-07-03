import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../init";

export const appRouter = createTRPCRouter({
  // やること: プロシージャを作成する...
  workflows: {
    getOne: protectedProcedure.input(z.object({ id: z.string() })).mutation(({ ctx, input }) => {
      return prisma.workflow.findUnique({ where: { id: input.id, userId: ctx.userId } });
    }),
    getMany: protectedProcedure.query(({ ctx }) => {
      return prisma.workflow.findMany({ where: { userId: ctx.userId } });
    }),
    create: protectedProcedure.mutation(({ ctx }) => {
      return prisma.workflow.create({ data: { name: "Untitled", userId: ctx.userId } });
    }),
    updateName: protectedProcedure.input(z.object({ id: z.string(), name: z.string().min(1) })).mutation(({ ctx, input }) => {
      return prisma.workflow.update({ where: { id: input.id, userId: ctx.userId }, data: { name: input.name } });
    }),
    delete: protectedProcedure.input(z.object({ id: z.string() })).mutation(({ ctx, input }) => {
      return prisma.workflow.delete({ where: { id: input.id, userId: ctx.userId } });
    })
  }
});

export type AppRouter = typeof appRouter;
