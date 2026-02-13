"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/admin");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-gray-900 p-8 rounded-lg w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6">Admin Login</h1>

        <input
          type="email"
          placeholder="Email"
          required
          className="w-full mb-4 p-2 rounded bg-gray-800"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          className="w-full mb-4 p-2 rounded bg-gray-800"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </main>
  );
}
