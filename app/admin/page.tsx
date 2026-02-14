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
    !session?.user ||
    (session.user.role !== "admin" &&
      session.user.role !== "mentor")
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
  ]
    .filter(Boolean)
    .sort()
    .reverse();

  const selectedYear = params.year || "";
  const selectedStatus = params.status || "";

  const filteredMembers =
    selectedYear || selectedStatus
      ? allMembers.filter((m: any) => {
          const yearMatch = selectedYear
            ? m.year === selectedYear
            : true;

          const statusMatch = selectedStatus
            ? m.status === selectedStatus
            : true;

          return yearMatch && statusMatch;
        })
      : allMembers;

  return (
    <main className="min-h-screen pt-20 p-4 md:p-10 space-y-12 md:space-y-16 max-w-7xl mx-auto">
      
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-800 pb-8">
        <h1 className="text-3xl md:text-4xl font-bold">
          Admin Dashboard
        </h1>
        <SignOutButton />
      </div>

      {/* ================= EVENTS SECTION ================= */}
      <section>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-400">
            Events Management
          </h2>
          <a
            href="/admin/add-event"
            className="w-full sm:w-auto text-center bg-green-600 px-6 py-2.5 rounded-lg font-semibold hover:bg-green-700 transition-all"
          >
            + Add Event
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {eventData.map((event: any) => (
            <div
              key={event._id}
              className="bg-gray-900 border border-gray-800 p-5 rounded-xl flex flex-col hover:border-blue-500/50 transition-colors"
            >
              {event.image && (
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
              )}

              <div className="flex-grow">
                <h3 className="text-xl font-bold line-clamp-1">
                  {event.title}
                </h3>

                <p className="text-gray-400 mt-1 text-sm">
                  📍 {event.location}
                </p>

                <p className="mt-3 text-green-400 text-sm font-medium bg-green-400/10 w-fit px-2 py-1 rounded">
                  {event.registrationCount} Registrations
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-5">
                <a
                  href={`/admin/events/${event._id}`}
                  className="bg-blue-600 text-center text-sm py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Details
                </a>

                <a
                  href={`/admin/edit/${event._id}`}
                  className="bg-yellow-600/20 text-yellow-500 border border-yellow-600/30 text-center text-sm py-2 rounded-md hover:bg-yellow-600 hover:text-white transition-all"
                >
                  Edit
                </a>

                <div className="col-span-2">
                  <DeleteEventButton
                    id={event._id.toString()}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= TEAM SECTION ================= */}
      <section>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-purple-400">
            Team Management
          </h2>
          <a
            href="/admin/add-member"
            className="w-full sm:w-auto text-center bg-green-600 px-6 py-2.5 rounded-lg font-semibold hover:bg-green-700 transition-all"
          >
            + Add Member
          </a>
        </div>

        {/* 🔥 FILTERS WITH CLEAR BUTTON */}
        <form
          method="GET"
          className="grid grid-cols-2 sm:flex gap-3 mb-8 bg-gray-900/50 p-4 rounded-xl items-center"
        >
          <select
            name="year"
            defaultValue={selectedYear}
            className="px-3 py-2 rounded bg-gray-800 border border-gray-700 text-sm"
          >
            <option value="">All Years</option>
            {uniqueYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <select
            name="status"
            defaultValue={selectedStatus}
            className="px-3 py-2 rounded bg-gray-800 border border-gray-700 text-sm"
          >
            <option value="">All Status</option>
            <option value="current">
              Current Team
            </option>
            <option value="ex">Ex Team</option>
          </select>

          <button
            type="submit"
            className="col-span-2 sm:col-auto bg-yellow-500 text-black font-bold px-6 py-2 rounded-md hover:bg-yellow-400 transition-colors"
          >
            Apply Filter
          </button>

          <a
            href="/admin"
            className="col-span-2 sm:col-auto bg-gray-700 px-6 py-2 rounded-md text-center hover:bg-gray-600 transition-colors"
          >
            Clear Filter
          </a>
        </form>

        {/* Member Count */}
        <p className="mb-4 text-gray-400">
          Showing {filteredMembers.length} members
        </p>

        {/* Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMembers.map((member: any) => (
            <div
              key={member._id}
              className="bg-gray-900 border border-gray-800 p-6 rounded-xl text-center group"
            >
              <div className="relative w-32 h-32 mx-auto mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover rounded-full border-2 border-gray-700 group-hover:border-yellow-500 transition-all"
                />
              </div>

              <h3 className="text-lg font-bold">
                {member.name}
              </h3>

              <p className="text-yellow-500 text-xs uppercase font-semibold tracking-wider">
                {member.role}
              </p>

              <p className="text-gray-500 text-sm mt-1">
                {member.year}
              </p>

              <div className="grid grid-cols-2 gap-2 mt-6">
                <a
                  href={`/admin/edit-member/${member._id}`}
                  className="bg-yellow-600/20 text-yellow-500 border border-yellow-600/30 text-center text-sm py-2 rounded-md hover:bg-yellow-600 hover:text-white transition-all"
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
