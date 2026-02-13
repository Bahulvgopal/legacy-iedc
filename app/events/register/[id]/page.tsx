"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function RegisterPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    year: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({
        ...form,
        eventId: id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      alert("Registered Successfully 🚀");
      router.push("/events/upcoming");
    } else {
      alert("Something went wrong ❌");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-lg w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6">Event Registration</h1>

        {["name", "email", "phone", "department", "year"].map((field) => (
          <input
            key={field}
            type="text"
            placeholder={field}
            required
            className="w-full mb-4 p-2 rounded bg-gray-800"
            onChange={(e) =>
              setForm({ ...form, [field]: e.target.value })
            }
          />
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </main>
  );
}
