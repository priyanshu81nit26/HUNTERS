"use client";

import { UserProfile } from "@clerk/nextjs";

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <UserProfile
          appearance={{
            elements: {
              card: "shadow-none",
              navbar: "hidden",
              rootBox: "mx-auto w-full max-w-3xl",
              formButtonPrimary: "bg-blue-600 hover:bg-blue-700"
            }
          }}
          routing="path"
          path="/profile"
        />
      </div>
    </div>
  );
} 