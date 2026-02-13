"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddMemberPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    image: "",
    role: "",
    year: "",
    status: "current",
    bio: "",
  });

  const roles = [
    "Nodal Officer",
    "Project Coordinator",
    "Mentor",
    "Chief Executive Officer",
    "Women Lead",
    "Chief Quality And Operation Officer",
    "Quality And Operation Officer",
    "Chief Technology Officer",
    "Technology Officer",
    "Chief Branding And Marketing Officer",
    "Branding And Marketing Officer",
    "Chief Finance Officer",
    "Finance Officer",
    "Chief Women Innovation Officer",
    "Women Innovation Officer",
    "Chief IPR And Research Officer",
    "IPR And Research Officer",
    "Chief Community Officer",
    "Community Officer",
    "Chief Creative And Innovation Officer",
    "Creative And Innovation Officer",
    "Executive Curator",
    "Member",
  ];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.image) {
      alert("Please upload an image");
      return;
    }

    const res = await fetch("/api/members", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Member added successfully");
      router.push("/admin");
      router.refresh();
    } else {
      alert("Failed to add member");
    }
  }

  return (
    <main className="min-h-screen pt-28 p-8 bg-black text-white">
      <div className="max-w-2xl mx-auto bg-gray-900 p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Add Member
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Name */}
          <input
            type="text"
            placeholder="Member Name"
            required
            className="p-3 rounded bg-gray-800"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          {/* Image Preview */}
          {form.image && (
            <img
              src={form.image}
              className="w-32 h-32 object-cover rounded"
              alt="Preview"
            />
          )}

          {/* 🔥 Base64 Image Upload */}
          <input
            type="file"
            accept="image/*"
            required
            className="p-3 rounded bg-gray-800"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              const reader = new FileReader();

              reader.onloadend = () => {
                setForm({
                  ...form,
                  image: reader.result as string, // ✅ Base64
                });
              };

              reader.readAsDataURL(file);
            }}
          />

          {/* Role */}
          <select
            required
            className="p-3 rounded bg-gray-800"
            onChange={(e) =>
              setForm({ ...form, role: e.target.value })
            }
          >
            <option value="">Select Role</option>
            {roles.map((role, index) => (
              <option key={index} value={role}>
                {role}
              </option>
            ))}
          </select>

          {/* Year */}
          <input
            type="text"
            placeholder="Year (e.g. 2024-2025)"
            required
            className="p-3 rounded bg-gray-800"
            onChange={(e) =>
              setForm({ ...form, year: e.target.value })
            }
          />

          {/* Status */}
          <select
            className="p-3 rounded bg-gray-800"
            onChange={(e) =>
              setForm({ ...form, status: e.target.value })
            }
          >
            <option value="current">Current Team</option>
            <option value="ex">Ex Team</option>
          </select>

          {/* Bio */}
          <textarea
            placeholder="Short Bio"
            className="p-3 rounded bg-gray-800"
            onChange={(e) =>
              setForm({ ...form, bio: e.target.value })
            }
          />

          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded"
          >
            Add Member
          </button>
        </form>
      </div>
    </main>
  );
}
