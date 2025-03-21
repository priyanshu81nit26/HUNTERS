import { UserProfile } from "@clerk/nextjs";

export default function ProfilePage() {
  return (
    <div className="flex justify-center items-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <UserProfile routing="hash" />
    </div>
  );
} 