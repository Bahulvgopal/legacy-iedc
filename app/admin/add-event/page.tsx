"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddEventPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    imageUrl: "",
    location: "",
    eventDate: "",
    registrationDeadline: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Event created successfully");
      router.push("/admin");
      router.refresh();
    } else {
      alert("Failed to create event");
    }
  }

  return (
    <main className="min-h-screen pt-28 p-8 bg-black text-white">
      <div className="max-w-2xl mx-auto bg-gray-900 p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Add Event
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          <input
            type="text"
            placeholder="Event Title"
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
              setForm({ ...form, description: e.target.value })
            }
          />

          {form.imageUrl && (
  <img
    src={form.imageUrl}
    className="w-32 h-32 object-cover rounded mb-4"
  />
)}

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
      imageUrl: data.filePath,
    });
  }}
/>


          <input
            type="text"
            placeholder="Location"
            required
            className="p-3 rounded bg-gray-800"
            onChange={(e) =>
              setForm({ ...form, location: e.target.value })
            }
          />

          {/* Event Date */}
          <input
            type="date"
            required
            className="p-3 rounded bg-gray-800"
            onChange={(e) =>
              setForm({ ...form, eventDate: e.target.value })
            }
          />

          {/* Registration Deadline */}
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
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded"
          >
            Create Event
          </button>
        </form>
      </div>
    </main>
  );
}
