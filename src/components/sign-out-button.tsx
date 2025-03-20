"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export default function SignOutButton() {
  const { logout } = useAuth();

  return (
    <Button 
      onClick={logout} 
      variant="outline" 
      className="flex items-center gap-2"
    >
      <LogOut className="h-4 w-4" />
      Sign Out
    </Button>
  );
} 