"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function Login() {
  function handleOAuth() {
    authClient.signIn.social({ provider: "github" });
  }

  return (
    <div className="h-svh grid place-content-center">
      <Button onClick={handleOAuth}>Log in</Button>
    </div>
  );
}
