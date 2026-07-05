"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useTransition } from "react";

export function LoginForm() {
  const [isPending, startTransition] = useTransition();

  function handleOAuth() {
    startTransition(async () => {
      await authClient.signIn.social({ provider: "github" });
    });
  }

  return (
    <Button onClick={handleOAuth} variant="outline" disabled={isPending}>
      Continue with GitHub
    </Button>
  );
}
