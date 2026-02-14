import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";

export const dynamic = "force-dynamic"; // 🔥 IMPORTANT

export default async function UpcomingEventsPage() {
  await connectDB();

  const now = new Date();

  const events = await Event.find({
    eventDate: { $gte: now },
  }).sort({ eventDate: 1 });

  return (
    <main className="min-h-screen pt-24 p-10">
      <h1 className="text-4xl font-bold mb-6">
        Upcoming Events
      </h1>

      {events.length === 0 ? (
        <p>No upcoming events.</p>
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

              {new Date(event.registrationDeadline) >= new Date() ? (
                <a
                  href={`/events/register/${event._id}`}
                  className="inline-block mt-4 bg-blue-600 px-4 py-2 rounded"
                >
                  Register
                </a>
              ) : (
                <p className="mt-4 text-red-500 font-semibold">
                  Registration Closed
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
