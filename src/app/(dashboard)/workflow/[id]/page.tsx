export default async function WorkflowId({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <div>Workflow: {id}</div>;
}
