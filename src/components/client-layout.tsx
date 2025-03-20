"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { AuthProvider } from "@/lib/auth-context";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <AuthProvider>
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </AuthProvider>
  );
} 