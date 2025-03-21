"use client";

import { SignOutButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

interface SignOutProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg";
}

export default function SignOut({ variant = "outline", size = "sm" }: SignOutProps) {
  return (
    <SignOutButton>
      <Button variant={variant} size={size}>
        Sign Out
      </Button>
    </SignOutButton>
  );
} 