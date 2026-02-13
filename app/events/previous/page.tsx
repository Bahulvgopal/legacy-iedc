import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";

export default async function PreviousEventsPage() {
  await connectDB();

  const events = await Event.find({
    eventDate: { $lt: new Date() },
  }).sort({ eventDate: -1 });

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
              <img
                src={event.image}
                className="w-full h-48 object-cover rounded mb-4"
              />

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
                📅{" "}
                {new Date(
                  event.eventDate
                ).toDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
