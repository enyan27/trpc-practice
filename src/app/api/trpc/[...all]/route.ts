import { createTRPCContext } from "@/app/trpc/init";
import { appRouter } from "@/app/trpc/routers/_app";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

function handler(req: Request) {
  return fetchRequestHandler({
    req,
    endpoint: "/api/trpc",
    router: appRouter,
    createContext: createTRPCContext
  });
}

export { handler as GET, handler as POST };
