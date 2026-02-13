"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    location: "",
    eventDate: "",
    registrationDeadline: "",
  });

  useEffect(() => {
    async function fetchEvent() {
      try {
        const res = await fetch(`/api/events/${id}`);

        if (!res.ok) {
          console.error("Failed to fetch event");
          return;
        }

        const event = await res.json();

        setForm({
          title: event.title || "",
          description: event.description || "",
          image: event.image || "",
          location: event.location || "",
          eventDate: event.eventDate?.slice(0, 10) || "",
          registrationDeadline:
            event.registrationDeadline?.slice(0, 10) || "",
        });

        setLoading(false);

      } catch (err) {
        console.error(err);
      }
    }

    if (id) fetchEvent();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch(`/api/events/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Event updated successfully");
      router.push("/admin");
      router.refresh();
    } else {
      alert("Update failed");
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-28 p-8 bg-black text-white">
      <div className="max-w-2xl mx-auto bg-gray-900 p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Edit Event
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          <input
            type="text"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            className="p-3 rounded bg-gray-800"
            required
          />

          <textarea
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            className="p-3 rounded bg-gray-800"
            required
          />

          {form.image && (
  <img
    src={form.image}
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
      image: data.filePath,
    });
  }}
/>


          <input
            type="text"
            value={form.location}
            onChange={(e) =>
              setForm({ ...form, location: e.target.value })
            }
            className="p-3 rounded bg-gray-800"
            required
          />

          <input
            type="date"
            value={form.eventDate}
            onChange={(e) =>
              setForm({ ...form, eventDate: e.target.value })
            }
            className="p-3 rounded bg-gray-800"
            required
          />

          <input
            type="date"
            value={form.registrationDeadline}
            onChange={(e) =>
              setForm({
                ...form,
                registrationDeadline: e.target.value,
              })
            }
            className="p-3 rounded bg-gray-800"
            required
          />

          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded"
          >
            Update Event
          </button>

        </form>
      </div>
    </main>
  );
}
