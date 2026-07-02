export default async function Workflow({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <div>Workflow: {id}</div>;
}
