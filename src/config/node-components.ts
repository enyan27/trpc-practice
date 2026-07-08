import { InitialNode } from "@/components/initial-node";
import type { NodeTypes } from "@xyflow/react";

export const nodeComponents = {
  INITIAL: InitialNode
} as const satisfies NodeTypes;

export type RegisteredNodeType = keyof typeof nodeComponents;
