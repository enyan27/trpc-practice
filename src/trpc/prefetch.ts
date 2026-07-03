import { prefetch, trpc } from "@/trpc/server";
import type { inferInput } from "@trpc/tanstack-react-query";

type Params = inferInput<typeof trpc.workflows.getMany>;

export const prefetchWorkflows = (params: Params) => {
  return prefetch(trpc.workflows.getMany.queryOptions(params));
};
