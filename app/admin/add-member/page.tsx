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

  const [loading, setLoading] = useState(false);

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

    try {
      setLoading(true);

      const res = await fetch("/api/members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to add member");
        setLoading(false);
        return;
      }

      alert("Member added successfully");
      router.push("/admin");
      router.refresh();
    } catch (error) {
      alert("Something went wrong");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen pt-28 p-8 bg-black text-white">
      <div className="max-w-2xl mx-auto bg-gray-900 p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Add Member
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          <input
            type="text"
            placeholder="Member Name"
            required
            className="p-3 rounded bg-gray-800"
            value={form.name}
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

          {/* Base64 Image Upload */}
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
                setForm((prev) => ({
                  ...prev,
                  image: reader.result as string,
                }));
              };

              reader.readAsDataURL(file);
            }}
          />

          <select
            required
            value={form.role}
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

          <input
            type="text"
            placeholder="Year (e.g. 2024-2025)"
            required
            value={form.year}
            className="p-3 rounded bg-gray-800"
            onChange={(e) =>
              setForm({ ...form, year: e.target.value })
            }
          />

          <select
            value={form.status}
            className="p-3 rounded bg-gray-800"
            onChange={(e) =>
              setForm({ ...form, status: e.target.value })
            }
          >
            <option value="current">Current Team</option>
            <option value="ex">Ex Team</option>
          </select>

          <textarea
            placeholder="Short Bio"
            value={form.bio}
            className="p-3 rounded bg-gray-800"
            onChange={(e) =>
              setForm({ ...form, bio: e.target.value })
            }
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded"
          >
            {loading ? "Adding..." : "Add Member"}
          </button>
        </form>
      </div>
    </main>
  );
}
