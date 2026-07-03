"use client";

import { EntityContainer, EntityHeader } from "@/components/entity";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function WorkflowList() {
  const trpc = useTRPC();
  const query = useSuspenseQuery(trpc.workflow.getWorkflows.queryOptions());

  return (
    <div className="flex-1 flex justify-center items-center">
      <pre>{JSON.stringify(query.data, null, 2)}</pre>
    </div>
  );
}

export function WorkflowHeader({ disabled }: { disabled?: boolean }) {
  const router = useRouter();
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const mutation = useMutation(
    trpc.workflow.create.mutationOptions({
      onSuccess: data => {
        queryClient.invalidateQueries(trpc.workflow.getWorkflows.queryOptions());
        toast.success("Workflow created");
        router.push(`/workflow/${data.id}`);
      },
      onError: e => toast.error(e.message)
    })
  );

  return (
    <EntityHeader title="Workflow" description="Create and manage your workflow" disabled={disabled} onNew={() => mutation.mutate()} newButtonLabel="New workflow" isCreating={mutation.isPending} />
  );
}

export function WorkflowContainer({ children }: { children: React.ReactNode }) {
  return (
    <EntityContainer header={<WorkflowHeader />} search={<></>} pagination={<></>}>
      {children}
    </EntityContainer>
  );
}
