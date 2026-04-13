"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password");
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm space-y-4"
      >
        <h1 className="text-xl font-semibold text-center">Sign In</h1>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-3 py-2 rounded-md"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-3 py-2 rounded-md"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded-md hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-2">
          <div className="h-px bg-gray-300 flex-1" />
          <span className="text-xs text-gray-400">OR</span>
          <div className="h-px bg-gray-300 flex-1" />
        </div>

        {/* GitHub Login */}
        <button
          type="button"
          onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
          className="w-full border border-gray-300 py-2 text-gray-900 rounded-md hover:bg-gray-100"
        >
          Continue with GitHub
        </button>
      </form>
    </div>
  );
}
