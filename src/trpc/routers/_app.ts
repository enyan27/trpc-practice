import { createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
  // やること: プロシージャを作成する...
});

export type AppRouter = typeof appRouter;
