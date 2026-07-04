"use client";

import { EntityContainer, EntityHeader, EntityPagination, EntitySearch } from "@/components/entity-components";
import { useEntitySearch } from "@/hooks/use-entity-search";
import { useRouter } from "next/navigation";
import { useCreateWorkflow, useSuspenseWorkflows } from "../hooks/use-workflows";
import { useWorkflowsParams } from "../hooks/use-workflows-params";

export function WorkflowsSearch() {
  const [params, setParams] = useWorkflowsParams();
  const { searchValue, onSearchChange } = useEntitySearch({ params, setParams });

  return <EntitySearch value={searchValue} onChange={onSearchChange} placeholder="Search workflows..." />;
}

export function WorkflowsList() {
  const workflows = useSuspenseWorkflows();

  return (
    <div className="flex-1 flex justify-center items-center">
      <p>{JSON.stringify(workflows.data, null, 2)}</p>
    </div>
  );
}

export function WorkflowsHeader({ disabled }: { disabled?: boolean }) {
  const router = useRouter();
  const createWorkflow = useCreateWorkflow();

  function handleCreate() {
    createWorkflow.mutate(undefined, {
      onSuccess: data => router.push(`/workflows/${data.id}`)
    });
  }

  return <EntityHeader title="Workflows" description="Create and manage your workflows" onNew={handleCreate} newButtonLabel="New workflow" disabled={disabled} isCreating={createWorkflow.isPending} />;
}

export function WorkflowsPagination() {
  const workflows = useSuspenseWorkflows();
  const [params, setParams] = useWorkflowsParams();

  return <EntityPagination page={workflows.data.page} totalPages={workflows.data.totalPages} onPageChange={page => setParams({ ...params, page })} disabled={workflows.isFetching} />;
}

export function WorkflowsContainer({ children }: { children: React.ReactNode }) {
  return (
    <EntityContainer header={<WorkflowsHeader />} search={<WorkflowsSearch />} pagination={<WorkflowsPagination />}>
      {children}
    </EntityContainer>
  );
}
