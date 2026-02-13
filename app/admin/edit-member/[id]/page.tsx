"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditMemberPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [loading, setLoading] = useState(true);

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

  /* ================= FETCH MEMBER ================= */

  useEffect(() => {
    async function fetchMember() {
      try {
        const res = await fetch(`/api/members/${id}`);
        if (!res.ok) return;

        const data = await res.json();
        setForm(data);
      } catch (err) {
        console.error("Failed to fetch member");
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchMember();
  }, [id]);

  /* ================= SUBMIT ================= */

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch(`/api/members/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Member updated successfully");
      router.push("/admin");
      router.refresh();
    } else {
      alert("Update failed");
    }
  }

  if (loading) {
    return (
      <div className="pt-32 text-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-28 p-8 bg-black text-white">
      <div className="max-w-2xl mx-auto bg-gray-900 p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Edit Member
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          <input
            type="text"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            placeholder="Member Name"
            required
            className="p-3 rounded bg-gray-800 outline-none"
          />

          {/* IMAGE PREVIEW */}
          {form.image && (
            <img
              src={form.image}
              className="w-32 h-32 object-cover rounded"
            />
          )}

          {/* IMAGE UPLOAD */}
          <input
            type="file"
            accept="image/*"
            className="p-3 rounded bg-gray-800"
            onChange={async (e) => {
              if (!e.target.files?.[0]) return;

              const formData = new FormData();
              formData.append("file", e.target.files[0]);

              const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
              });

              const data = await res.json();

              setForm({
                ...form,
                image: data.filePath,
              });
            }}
          />

          <select
            value={form.role}
            onChange={(e) =>
              setForm({ ...form, role: e.target.value })
            }
            required
            className="p-3 rounded bg-gray-800 outline-none"
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
            value={form.year}
            onChange={(e) =>
              setForm({ ...form, year: e.target.value })
            }
            placeholder="Year (e.g. 2024-2025)"
            required
            className="p-3 rounded bg-gray-800 outline-none"
          />

          <select
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value })
            }
            className="p-3 rounded bg-gray-800 outline-none"
          >
            <option value="current">Current Team</option>
            <option value="ex">Ex Team</option>
          </select>

          <textarea
            value={form.bio}
            onChange={(e) =>
              setForm({ ...form, bio: e.target.value })
            }
            placeholder="Short Bio (Optional)"
            className="p-3 rounded bg-gray-800 outline-none"
          />

          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded transition"
          >
            Update Member
          </button>
        </form>
      </div>
    </main>
  );
}
