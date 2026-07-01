import { prisma } from "@/lib/prisma";
import { inngest } from "./client";

export const testWorkflow = inngest.createFunction({ id: "test-workflow", triggers: { event: "test-workflow" } }, async ({ step }) => {
  await step.sleep("pause", "5s");
  await step.run("test-workflow", () => {
    return prisma.workflow.create({ data: { name: "寝ても覚めても" } });
  });
});
