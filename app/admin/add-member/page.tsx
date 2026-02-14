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

  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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

  /* ================= IMAGE UPLOAD ================= */

  async function handleImageUpload(file: File) {
    const reader = new FileReader();

    reader.onloadend = async () => {
      try {
        setUploading(true);

        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: reader.result }),
        });

        const data = await res.json();

        if (!res.ok) {
          alert("Image upload failed");
          return;
        }

        setForm((prev) => ({
          ...prev,
          image: data.url,
        }));
      } catch (error) {
        console.error(error);
        alert("Upload error");
      } finally {
        setUploading(false);
      }
    };

    reader.readAsDataURL(file);
  }

  /* ================= SUBMIT ================= */

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.image) {
      alert("Please upload image");
      return;
    }

    try {
      setSubmitting(true);

      const res = await fetch("/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert("Member added successfully");
        router.push("/admin");
        router.refresh();
      } else {
        const err = await res.json();
        alert(err.message || "Failed to add member");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen pt-28 p-8 bg-black text-white">
      <div className="max-w-2xl mx-auto bg-gray-900 p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Add Member
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* NAME */}
          <input
            type="text"
            placeholder="Member Name"
            required
            className="p-3 rounded bg-gray-800 outline-none"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          {/* IMAGE PREVIEW */}
          {form.image && (
            <img
              src={form.image}
              className="w-32 h-32 rounded-full object-cover border border-gray-700"
              alt="preview"
            />
          )}

          {/* IMAGE UPLOAD */}
          <input
            type="file"
            accept="image/*"
            className="p-3 rounded bg-gray-800"
            onChange={(e) =>
              e.target.files &&
              handleImageUpload(e.target.files[0])
            }
          />

          {uploading && (
            <p className="text-yellow-500">Uploading image...</p>
          )}

          {/* ROLE DROPDOWN */}
          <select
            required
            value={form.role}
            className="p-3 rounded bg-gray-800 outline-none"
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

          {/* YEAR */}
          <input
            type="text"
            placeholder="Year (e.g. 2024-2025)"
            required
            className="p-3 rounded bg-gray-800 outline-none"
            onChange={(e) =>
              setForm({ ...form, year: e.target.value })
            }
          />

          {/* STATUS */}
          <select
            value={form.status}
            className="p-3 rounded bg-gray-800 outline-none"
            onChange={(e) =>
              setForm({ ...form, status: e.target.value })
            }
          >
            <option value="current">Current Team</option>
            <option value="ex">Ex Team</option>
          </select>

          {/* BIO */}
          <textarea
            placeholder="Short Bio (Optional)"
            className="p-3 rounded bg-gray-800 outline-none"
            onChange={(e) =>
              setForm({ ...form, bio: e.target.value })
            }
          />

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={uploading || submitting}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded transition disabled:opacity-50"
          >
            {submitting ? "Adding..." : "Add Member"}
          </button>
        </form>
      </div>
    </main>
  );
}
