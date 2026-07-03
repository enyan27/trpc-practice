import { workflowRouter } from "@/features/workflow/server/router";
import { createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
  workflow: workflowRouter
});

export type AppRouter = typeof appRouter;
