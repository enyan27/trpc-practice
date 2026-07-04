import { PAGINATION } from "@/lib/constant";
import { prisma } from "@/lib/prisma";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { generateSlug } from "random-word-slugs";
import { z } from "zod";

export const workflowsRouter = createTRPCRouter({
  getOne: protectedProcedure.input(z.object({ id: z.string() })).query(({ ctx, input }) => {
    return prisma.workflow.findUnique({
      where: { id: input.id, userId: ctx.userId }
    });
  }),
  getMany: protectedProcedure
    .input(
      z.object({
        page: z.number().default(PAGINATION.DEFAULT_PAGE),
        pageSize: z.number().min(PAGINATION.MIN_PAGE_SIZE).max(PAGINATION.MAX_PAGE_SIZE).default(PAGINATION.DEFAULT_PAGE_SIZE),
        search: z.string().default("")
      })
    )
    .query(async ({ ctx, input }) => {
      const { page, pageSize, search } = input;
      const [items, totalCount] = await Promise.all([
        prisma.workflow.findMany({
          skip: (page - 1) * pageSize,
          take: pageSize,
          where: {
            userId: ctx.userId,
            name: {
              contains: search,
              mode: "insensitive"
            }
          },
          orderBy: { updatedAt: "desc" }
        }),
        prisma.workflow.count({
          where: {
            userId: ctx.userId,
            name: {
              contains: search,
              mode: "insensitive"
            }
          }
        })
      ]);
      const totalPages = Math.ceil(totalCount / pageSize);
      const hasNextPage = page < totalPages;
      const hasPreviousPage = page > 1;

      return { items, totalCount, page, pageSize, search, totalPages, hasNextPage, hasPreviousPage };
    }),
  create: protectedProcedure.mutation(({ ctx }) => {
    return prisma.workflow.create({
      data: { name: generateSlug(3), userId: ctx.userId }
    });
  }),
  updateName: protectedProcedure.input(z.object({ id: z.string(), name: z.string().min(1) })).mutation(({ ctx, input }) => {
    return prisma.workflow.update({
      where: { id: input.id, userId: ctx.userId },
      data: { name: input.name }
    });
  }),
  delete: protectedProcedure.input(z.object({ id: z.string() })).mutation(({ ctx, input }) => {
    return prisma.workflow.delete({
      where: { id: input.id, userId: ctx.userId }
    });
  })
});
