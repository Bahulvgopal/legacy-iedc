"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    location: "",
    eventDate: "",
    registrationDeadline: "",
  });

  /* ================= FETCH EVENT ================= */
  useEffect(() => {
    async function fetchEvent() {
      try {
        const res = await fetch(`/api/events/${id}`);
        if (!res.ok) throw new Error("Failed to fetch event");

        const event = await res.json();

        setForm({
          title: event.title || "",
          description: event.description || "",
          image: event.image || "",
          location: event.location || "",
          eventDate: event.eventDate?.slice(0, 10) || "",
          registrationDeadline: event.registrationDeadline?.slice(0, 10) || "",
        });
      } catch (err) {
        console.error(err);
        alert("Could not load event details.");
        router.push("/admin");
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchEvent();
  }, [id, router]);

  /* ================= IMAGE UPLOAD ================= */
  async function handleImageUpload(file: File) {
    if (!file) return;
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error();

      // Adjusting to use the correct key from your API response
      setForm((prev) => ({ ...prev, image: data.filePath || data.url }));
    } catch (error) {
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  }

  /* ================= SUBMIT ================= */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setSubmitting(true);
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
        throw new Error();
      }
    } catch (error) {
      alert("Update failed");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent animate-spin rounded-full mb-4"></div>
        <p className="text-gray-400 animate-pulse font-medium">Loading Event Data...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-12 px-4 md:px-8 bg-black text-white flex justify-center items-start">
      <div className="w-full max-w-2xl bg-gray-900 p-6 md:p-10 rounded-2xl shadow-2xl border border-gray-800">
        
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white">
            Edit Event
          </h1>
          
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* EVENT BANNER SECTION */}
          <div className="flex flex-col gap-3">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Event Banner</label>
            <div className="relative group w-full h-48 md:h-56 bg-gray-800 rounded-xl overflow-hidden border-2 border-dashed border-gray-700 hover:border-blue-500/50 transition-all">
              {form.image ? (
                <img
                  src={form.image}
                  className="w-full h-full object-cover"
                  alt="Event Banner"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
                  <span className="text-3xl mb-2">🖼️</span>
                  <p className="text-sm font-medium">No Banner Set</p>
                </div>
              )}
              
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                <p className="text-white text-sm font-bold uppercase tracking-wide">Replace Image</p>
              </div>

              {uploading && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                  <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent animate-spin rounded-full"></div>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => e.target.files && handleImageUpload(e.target.files[0])}
                disabled={uploading}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* TITLE */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Title</label>
              <input
                type="text"
                value={form.title}
                required
                className="p-3.5 rounded-xl bg-gray-800 border border-gray-700 focus:border-blue-500 outline-none transition-all"
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            {/* DESCRIPTION */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Description</label>
              <textarea
                value={form.description}
                rows={4}
                required
                className="p-3.5 rounded-xl bg-gray-800 border border-gray-700 focus:border-blue-500 outline-none transition-all resize-none"
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>

            {/* LOCATION */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Location / Venue</label>
              <input
                type="text"
                value={form.location}
                required
                className="p-3.5 rounded-xl bg-gray-800 border border-gray-700 focus:border-blue-500 outline-none transition-all"
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
            </div>

            {/* EVENT DATE */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Event Date</label>
              <input
                type="date"
                value={form.eventDate}
                required
                className="p-3.5 rounded-xl bg-gray-800 border border-gray-700 focus:border-blue-500 outline-none [color-scheme:dark]"
                onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
              />
            </div>

            {/* DEADLINE */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Registration Deadline</label>
              <input
                type="date"
                value={form.registrationDeadline}
                required
                className="p-3.5 rounded-xl bg-gray-800 border border-gray-700 focus:border-blue-500 outline-none [color-scheme:dark]"
                onChange={(e) => setForm({ ...form, registrationDeadline: e.target.value })}
              />
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="w-full sm:w-1/3 py-3.5 rounded-xl font-bold text-gray-400 border border-gray-800 hover:bg-gray-800 transition-all"
            >
              CANCEL
            </button>
            <button
              type="submit"
              disabled={uploading || submitting}
              className="w-full sm:w-2/3 bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 text-black font-black py-3.5 rounded-xl transition-all shadow-xl shadow-yellow-500/10"
            >
              {submitting ? "SAVING CHANGES..." : "UPDATE EVENT"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}