import { inngest } from "@/inngest/client";
import { prisma } from "@/lib/prisma";
import { createTRPCRouter, protectedProcedure } from "../init";

export const appRouter = createTRPCRouter({
  // やること: プロシージャを作成する...
  getWorkflow: protectedProcedure.query(() => {
    return prisma.workflow.findMany();
  }),
  createWorkflow: protectedProcedure.mutation(async ({ ctx }) => {
    await inngest.send({ name: "test-workflow", data: { userId: ctx.userId } });
    return { success: true, message: "Queued job" };
  })
});

export type AppRouter = typeof appRouter;
