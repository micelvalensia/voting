"use client";

import SignUp from "@/components/features/auth/SignUp";

export default function SignUpPage() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <SignUp />
      </div>
    </div>
  );
}
