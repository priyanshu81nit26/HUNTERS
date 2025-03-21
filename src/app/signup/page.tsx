"use client";

import { SignUp } from "@clerk/nextjs";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join Dream Team for advanced cricket analytics
          </p>
        </div>
        
        <div className="mt-8">
          <SignUp 
            appearance={{
              elements: {
                formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-sm normal-case",
                footerAction: "text-blue-600 hover:text-blue-800",
                card: "rounded-lg shadow-md",
              }
            }}
            routing="path"
            path="/signup"
            signInUrl="/login"
          />
        </div>
      </div>
    </div>
  );
} 