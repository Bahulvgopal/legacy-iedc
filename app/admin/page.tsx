import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";
import Registration from "@/models/Registration";
import Member from "@/models/Member";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import DeleteEventButton from "@/components/DeleteEventButton";
import DeleteMemberButton from "@/components/DeleteMemberButton";
import SignOutButton from "@/components/SignOutButton";

export const revalidate = 5;

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<{
    year?: string;
    status?: string;
  }>;
}) {
  const params = await searchParams;

  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  if (
    session.user.role !== "admin" &&
    session.user.role !== "mentor"
  ) {
    redirect("/");
  }

  await connectDB();

  /* ================= EVENTS ================= */

  const events = await Event.find().sort({
    createdAt: -1,
  });

  const eventData = await Promise.all(
    events.map(async (event: any) => {
      const count =
        await Registration.countDocuments({
          eventId: event._id,
        });

      return {
        ...event.toObject(),
        registrationCount: count,
      };
    })
  );

  /* ================= MEMBERS ================= */

  const allMembers = await Member.find().sort({
    createdAt: -1,
  });

  const uniqueYears = [
    ...new Set(allMembers.map((m: any) => m.year)),
  ].sort().reverse();

  const selectedYear =
    params.year || uniqueYears[0];

  const selectedStatus =
    params.status || "current";

  const filteredMembers = allMembers.filter(
    (m: any) =>
      m.year === selectedYear &&
      m.status === selectedStatus
  );

  return (
    <main className="min-h-screen pt-24 p-10 space-y-16">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">
          Admin Dashboard
        </h1>
        <SignOutButton />
      </div>

      {/* ================= EVENTS SECTION ================= */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">
            Events Management
          </h2>

          <a
            href="/admin/add-event"
            className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
          >
            + Add Event
          </a>
        </div>

       <div className="grid md:grid-cols-2 gap-6">
  {eventData.map((event: any) => (
    <div
      key={event._id}
      className="bg-gray-900 p-6 rounded-lg"
    >
      {event.imageUrl && (
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-48 object-cover rounded mb-4"
        />
      )}

      <h2 className="text-2xl font-semibold">
        {event.title}
      </h2>

      <p className="text-gray-400 mt-2">
        📍 {event.location}
      </p>

      <p className="mt-2 text-green-400 font-semibold">
        🧑 Registrations: {event.registrationCount}
      </p>

      <div className="flex gap-3 mt-4 flex-wrap">
        <a
          href={`/admin/events/${event._id}`}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          View Details
        </a>

        <a
          href={`/admin/edit/${event._id}`}
          className="bg-yellow-600 px-4 py-2 rounded hover:bg-yellow-700"
        >
          Edit
        </a>

        <DeleteEventButton
          id={event._id.toString()}
        />
      </div>
    </div>
  ))}
</div>

      </section>

      {/* ================= MEMBERS SECTION ================= */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">
            Team Management
          </h2>

          <a
            href="/admin/add-member"
            className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
          >
            + Add Member
          </a>
        </div>

        {/* Filters */}
        <form
          method="GET"
          className="flex gap-4 mb-6 flex-wrap"
        >
          <select
            name="year"
            defaultValue={selectedYear}
            className="px-4 py-2 rounded bg-gray-800"
          >
            {uniqueYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <select
            name="status"
            defaultValue={selectedStatus}
            className="px-4 py-2 rounded bg-gray-800"
          >
            <option value="current">
              Current Team
            </option>
            <option value="ex">
              Ex Team
            </option>
          </select>

          <button
            type="submit"
            className="bg-yellow-500 text-black px-4 py-2 rounded"
          >
            Apply
          </button>
        </form>

        {/* Members Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {filteredMembers.map((member: any) => (
            <div
              key={member._id}
              className="bg-gray-900 p-6 rounded-lg"
            >
              <img
                src={member.imageUrl}
                className="w-full h-48 object-cover rounded mb-4"
              />

              <h3 className="text-xl font-semibold">
                {member.name}
              </h3>

              <p className="text-gray-400 text-sm">
                {member.role}
              </p>

              <p className="text-gray-400 text-sm">
                {member.year}
              </p>

              <div className="flex gap-3 mt-4 flex-wrap">
                <a
                  href={`/admin/edit-member/${member._id}`}
                  className="bg-yellow-600 px-4 py-2 rounded hover:bg-yellow-700"
                >
                  Edit
                </a>

                <DeleteMemberButton
                  id={member._id.toString()}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
