import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";

export const revalidate = 10;

export default async function PreviousEventsPage() {
  await connectDB();

  const now = new Date();

  // 🔥 Get only past events
  const events = await Event.find({
    eventDate: { $lt: now },
  }).sort({ eventDate: -1 }); // newest past event first

  // 🔥 Group events by year
  const groupedEvents: Record<string, any[]> = {};

  events.forEach((event: any) => {
    const year = new Date(event.eventDate).getFullYear().toString();

    if (!groupedEvents[year]) {
      groupedEvents[year] = [];
    }

    groupedEvents[year].push(event);
  });

  const sortedYears = Object.keys(groupedEvents).sort(
    (a, b) => Number(b) - Number(a)
  );

  return (
    <main className="min-h-screen pt-24 p-6 md:p-10">
      <h1 className="text-4xl font-bold mb-10">
        Previous Events
      </h1>

      {sortedYears.length === 0 ? (
        <p>No previous events.</p>
      ) : (
        sortedYears.map((year) => (
          <div key={year} className="mb-14">

            {/* 🔥 Year Heading */}
            <h2 className="text-3xl font-bold mb-6 text-yellow-500 border-b border-gray-700 pb-2">
              {year}
            </h2>

            {/* 🔥 Events Under That Year */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedEvents[year].map((event: any) => (
                <div
                  key={event._id}
                  className="bg-gray-900 p-5 rounded-lg"
                >
                  {event.image && (
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover rounded mb-4"
                    />
                  )}

                  <h3 className="text-xl font-semibold">
                    {event.title}
                  </h3>

                  <p className="text-gray-400 mt-2">
                    {event.description}
                  </p>

                  <p className="mt-2 text-sm text-gray-400">
                    📅{" "}
                    {new Date(
                      event.eventDate
                    ).toDateString()}
                  </p>

                  <p className="text-sm text-gray-400">
                    📍 {event.location}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </main>
  );
}
