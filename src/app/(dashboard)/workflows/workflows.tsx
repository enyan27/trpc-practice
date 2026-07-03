"use client";

import { EntityContainer, EntityHeader } from "@/components/entity";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function WorkflowsList() {
  const trpc = useTRPC();
  const workflows = useSuspenseQuery(trpc.workflow.getWorkflows.queryOptions());

  return (
    <div className="flex-1 flex justify-center items-center">
      <pre>{JSON.stringify(workflows.data, null, 2)}</pre>
    </div>
  );
}

export function WorkflowsHeader({ disabled }: { disabled?: boolean }) {
  const router = useRouter();
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const mutation = useMutation(
    trpc.workflow.create.mutationOptions({
      onSuccess: data => {
        queryClient.invalidateQueries(trpc.workflow.getWorkflows.queryOptions());
        toast.success("Workflow created");
        router.push(`/workflows/${data.id}`);
      },
      onError: e => toast.error(e.message)
    })
  );

  return (
    <EntityHeader title="Workflows" description="Create and manage your workflows" disabled={disabled} onNew={() => mutation.mutate()} newButtonLabel="New workflow" isCreating={mutation.isPending} />
  );
}

export function WorkflowsContainer({ children }: { children: React.ReactNode }) {
  return (
    // Todo: add search and pagination...
    <EntityContainer header={<WorkflowsHeader />} search={<></>} pagination={<></>}>
      {children}
    </EntityContainer>
  );
}
