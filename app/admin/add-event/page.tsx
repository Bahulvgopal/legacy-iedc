"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddEventPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    location: "",
    eventDate: "",
    registrationDeadline: "",
  });

  const [uploading, setUploading] = useState(false);

  async function handleImageUpload(file: File) {
    const reader = new FileReader();

    reader.onloadend = async () => {
      setUploading(true);

      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: reader.result }),
      });

      const data = await res.json();

      setForm((prev) => ({
        ...prev,
        image: data.url,
      }));

      setUploading(false);
    };

    reader.readAsDataURL(file);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.image) {
      alert("Upload image");
      return;
    }

    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Event created");
      router.push("/admin");
      router.refresh();
    }
  }

  return (
    <main className="min-h-screen pt-28 p-8 bg-black text-white">
      <div className="max-w-2xl mx-auto bg-gray-900 p-8 rounded-xl">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Add Event
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          <input
            type="text"
            placeholder="Title"
            required
            className="p-3 rounded bg-gray-800"
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <textarea
            placeholder="Description"
            required
            className="p-3 rounded bg-gray-800"
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
          />

          {form.image && (
            <img
              src={form.image}
              className="w-full h-48 rounded object-cover"
              alt="preview"
            />
          )}

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
            <p className="text-yellow-500">Uploading...</p>
          )}

          <input
            type="text"
            placeholder="Location"
            required
            className="p-3 rounded bg-gray-800"
            onChange={(e) =>
              setForm({ ...form, location: e.target.value })
            }
          />

          <input
            type="date"
            required
            className="p-3 rounded bg-gray-800"
            onChange={(e) =>
              setForm({ ...form, eventDate: e.target.value })
            }
          />

          <input
            type="date"
            required
            className="p-3 rounded bg-gray-800"
            onChange={(e) =>
              setForm({
                ...form,
                registrationDeadline: e.target.value,
              })
            }
          />

          <button
            type="submit"
            className="bg-yellow-500 text-black py-3 rounded"
          >
            Create Event
          </button>
        </form>
      </div>
    </main>
  );
}
