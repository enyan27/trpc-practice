import { WorkflowContainer, WorkflowList } from "@/features/workflow/components/workflow";
import { prefetchWorkflow } from "@/features/workflow/server/prefetch";
import { HydrateClient } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function Workflow() {
  prefetchWorkflow();

  return (
    <WorkflowContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<div>Error!</div>}>
          <Suspense fallback={<div>Loading...</div>}>
            <WorkflowList />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </WorkflowContainer>
  );
}
