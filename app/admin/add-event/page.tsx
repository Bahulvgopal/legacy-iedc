"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);

  /* ================= IMAGE COMPRESSION FUNCTION ================= */

  async function compressImage(file: File): Promise<File> {
    return new Promise((resolve) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (event) => {
        img.src = event.target?.result as string;
      };

      img.onload = () => {
        const canvas = document.createElement("canvas");

        const MAX_WIDTH = 1000;
        const scaleSize = MAX_WIDTH / img.width;

        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;

        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
          (blob) => {
            if (!blob) return;

            const compressed = new File([blob], file.name, {
              type: "image/jpeg",
              lastModified: Date.now(),
            });

            resolve(compressed);
          },
          "image/jpeg",
          0.7 // compression quality (0.7 = 70%)
        );
      };

      reader.readAsDataURL(file);
    });
  }

  /* ================= HANDLE IMAGE SELECT ================= */

  async function handleImageChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create preview
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    // Compress image
    const compressed = await compressImage(file);
    setCompressedFile(compressed);
  }

  /* ================= HANDLE SUBMIT ================= */

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    // Replace original image with compressed image
    if (compressedFile) {
      formData.set("image", compressedFile);
    }

    const res = await fetch("/api/events", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("Event created successfully");
      router.push("/admin");
      router.refresh();
    } else {
      alert("Failed to create event");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen pt-28 p-8 bg-black text-white">
      <div className="max-w-2xl mx-auto bg-gray-900 p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Add Event
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >
          <input
            name="title"
            placeholder="Event Title"
            required
            className="p-3 bg-gray-800 rounded"
          />

          <textarea
            name="description"
            placeholder="Description"
            required
            className="p-3 bg-gray-800 rounded"
          />

          <input
            name="location"
            placeholder="Location"
            required
            className="p-3 bg-gray-800 rounded"
          />

          <input
            type="date"
            name="eventDate"
            required
            className="p-3 bg-gray-800 rounded"
          />

          <input
            type="date"
            name="registrationDeadline"
            required
            className="p-3 bg-gray-800 rounded"
          />

          {/* IMAGE UPLOAD */}
          <input
            type="file"
            name="image"
            accept="image/*"
            required
            onChange={handleImageChange}
            className="p-3 bg-gray-800 rounded"
          />

          {/* IMAGE PREVIEW */}
          {preview && (
            <div className="mt-4">
              <p className="mb-2 text-sm text-gray-400">
                Image Preview:
              </p>
              <img
                src={preview}
                alt="Preview"
                className="w-full h-64 object-cover rounded-lg border border-gray-700"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-yellow-500 text-black py-3 rounded font-semibold hover:bg-yellow-600 transition"
          >
            {loading ? "Creating..." : "Create Event"}
          </button>
        </form>
      </div>
    </main>
  );
}
