"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { memo } from "react";
import { toast } from "sonner";

export const AddNodeButton = memo(() => {
  return (
    <Button onClick={() => toast.success("♡")} size="icon" variant="outline" className="bg-background">
      <PlusIcon />
    </Button>
  );
});

AddNodeButton.displayName = "AddNodeButton";
