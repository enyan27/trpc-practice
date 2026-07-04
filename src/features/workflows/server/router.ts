import { prisma } from "@/lib/prisma";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { generateSlug } from "random-word-slugs";
import { z } from "zod";

export const workflowsRouter = createTRPCRouter({
  getOne: protectedProcedure.input(z.object({ id: z.string() })).mutation(({ ctx, input }) => {
    return prisma.workflow.findUnique({ where: { id: input.id, userId: ctx.userId } });
  }),
  getMany: protectedProcedure.query(({ ctx }) => {
    return prisma.workflow.findMany({
      where: { userId: ctx.userId },
      orderBy: { createdAt: "desc" }
    });
  }),
  create: protectedProcedure.mutation(({ ctx }) => {
    return prisma.workflow.create({ data: { name: generateSlug(), userId: ctx.userId } });
  }),
  updateName: protectedProcedure.input(z.object({ id: z.string(), name: z.string().min(1) })).mutation(({ ctx, input }) => {
    return prisma.workflow.update({ where: { id: input.id, userId: ctx.userId }, data: { name: input.name } });
  }),
  delete: protectedProcedure.input(z.object({ id: z.string() })).mutation(({ ctx, input }) => {
    return prisma.workflow.delete({ where: { id: input.id, userId: ctx.userId } });
  })
});
