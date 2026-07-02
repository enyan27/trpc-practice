import { defaultShouldDehydrateQuery, QueryClient } from "@tanstack/react-query";

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { staleTime: 60 * 1000 },
      dehydrate: {
        // serializeData: superjson.serialize,
        shouldDehydrateQuery: q => defaultShouldDehydrateQuery(q) || q.state.status === "pending"
      },
      hydrate: {
        // deserializeData: superjson.deserialize,
      }
    }
  });
}
