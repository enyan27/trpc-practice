"use client";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export default function Test() {
  const trpc = useTRPC();
  const query = useQuery(trpc.getWorkflow.queryOptions());
  const mutation = useMutation(trpc.createWorkflow.mutationOptions({ onSuccess: () => toast.success("Queued job"), onError: e => toast.error(e.message) }));

  return (
    <>
      <Button onClick={() => mutation.mutate()} variant="ghost" disabled={mutation.isPending}>
        Create workflow
      </Button>
      <pre>{JSON.stringify(query.data, null, 2)}</pre>
    </>
  );
}
