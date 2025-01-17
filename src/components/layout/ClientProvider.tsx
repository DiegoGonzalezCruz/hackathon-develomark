"use client";

import { createContext, PropsWithChildren, useState } from "react";

export const SidebarContext = createContext<{
  open: boolean;
  toggle: () => void;
}>(null!);

export function SidebarProvider({ children }: PropsWithChildren) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <SidebarContext.Provider
      value={{ open: sidebarOpen, toggle: () => setSidebarOpen((s) => !s) }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
