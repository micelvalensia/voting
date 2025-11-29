"use client";

import SignIn from "@/components/features/auth/SignIn";

export default function SignInPage() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <SignIn />
      </div>
    </div>
  );
}
