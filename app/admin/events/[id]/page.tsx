import { connectDB } from "@/lib/mongodb";
import Registration from "@/models/Registration";
import Event from "@/models/Event";
import mongoose from "mongoose";
import { notFound } from "next/navigation";

export default async function EventDetailsPage(
  props: {
    params: Promise<{ id: string }>;
  }
) {
  await connectDB();

  const { id } = await props.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return notFound();
  }

  const eventId = new mongoose.Types.ObjectId(id);

  const event = await Event.findById(eventId);
  if (!event) return notFound();

  const registrations = await Registration.find({
    eventId,
  }).sort({ createdAt: -1 });

  return (
    <main className="min-h-screen pt-24 p-10">

      {/* EVENT INFO */}
      <div className="mb-10 bg-gray-900 p-6 rounded-xl shadow-lg">
        {event.image && (
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        )}

        <h1 className="text-3xl font-bold mb-2">
          {event.title}
        </h1>

        <p className="text-gray-400 mb-2">
          📍 {event.location}
        </p>

        <p className="text-gray-400">
          📅 {new Date(event.eventDate).toDateString()}
        </p>
      </div>

      {/* REGISTRATIONS */}
      <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Registrations ({registrations.length})
          </h2>

          <a
            href={`/api/export/${id}`}
            className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Export as CSV
          </a>
        </div>

        {registrations.length === 0 ? (
          <p className="text-gray-400">
            No registrations yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-700 rounded-lg overflow-hidden">
              <thead className="bg-gray-800 text-left">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Department</th>
                  <th className="p-3">Year</th>
                </tr>
              </thead>

              <tbody>
                {registrations.map((reg: any) => (
                  <tr
                    key={reg._id}
                    className="border-t border-gray-700 hover:bg-gray-800 transition"
                  >
                    <td className="p-3">{reg.name}</td>
                    <td className="p-3">{reg.email}</td>
                    <td className="p-3">{reg.phone}</td>
                    <td className="p-3">{reg.department}</td>
                    <td className="p-3">{reg.year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
