"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export function GoogleSignInButton() {
  const [loading, setLoading] = useState(false);

  return (
    <button
      type="button"
      className="studio-google-button"
      disabled={loading}
      onClick={() => {
        setLoading(true);
        void signIn("google", { callbackUrl: "/studio/dashboard" });
      }}
    >
      <span className="studio-google-mark" aria-hidden="true">G</span>
      {loading ? "Opening Google…" : "Continue with Google"}
    </button>
  );
}
