"use client";

import { useHotkey } from "@tanstack/react-hotkeys";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import * as React from "react";

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props} attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
      <ThemeHotkey />
    </NextThemesProvider>
  );
}

function ThemeHotkey() {
  const { resolvedTheme, setTheme } = useTheme();
  useHotkey("D", () => setTheme(resolvedTheme === "dark" ? "light" : "dark"));
  return null;
}
