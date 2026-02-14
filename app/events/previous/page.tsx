import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";

export const dynamic = "force-dynamic"; // 🔥 important for production

export default async function PreviousEventsPage() {
  await connectDB();

  const now = new Date();

  const events = await Event.find({
    eventDate: { $lt: now }, // 🔥 THIS IS THE FIX
  }).sort({ eventDate: -1 }); // latest past event first

  return (
    <main className="min-h-screen pt-24 p-10">
      <h1 className="text-4xl font-bold mb-6">
        Previous Events
      </h1>

      {events.length === 0 ? (
        <p>No previous events.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {events.map((event: any) => (
            <div
              key={event._id}
              className="bg-gray-900 p-6 rounded-lg"
            >
              {event.image && (
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover rounded mb-4"
                />
              )}

              <h2 className="text-2xl font-semibold">
                {event.title}
              </h2>

              <p className="text-gray-400">
                {event.description}
              </p>

              <p className="mt-2">
                📍 {event.location}
              </p>

              <p>
                📅 {new Date(event.eventDate).toDateString()}
              </p>

              <p className="mt-4 text-gray-500 font-semibold">
                Event Completed
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
