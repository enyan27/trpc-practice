import { prefetch, trpc } from "@/trpc/server";
import type { inferInput } from "@trpc/tanstack-react-query";

type Params = inferInput<typeof trpc.workflow.getWorkflows>;

export function prefetchWorkflows(params: Params) {
  return prefetch(trpc.workflow.getWorkflows.queryOptions(params));
}
