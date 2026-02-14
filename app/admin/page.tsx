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
    (session.user.role !== "admin" && session.user.role !== "mentor")
  ) {
    redirect("/");
  }

  await connectDB();

  /* ================= EVENTS ================= */
  const events = await Event.find().sort({ createdAt: -1 });
  const eventData = await Promise.all(
    events.map(async (event: any) => {
      const count = await Registration.countDocuments({ eventId: event._id });
      return {
        ...event.toObject(),
        registrationCount: count,
      };
    })
  );

  /* ================= MEMBERS ================= */
  const allMembers = await Member.find().sort({ createdAt: -1 });
  const uniqueYears = [...new Set(allMembers.map((m: any) => m.year))]
    .filter(Boolean)
    .sort()
    .reverse();

  const selectedYear = params.year || "";
  const selectedStatus = params.status || "";

  const filteredMembers =
    selectedYear || selectedStatus
      ? allMembers.filter((m: any) => {
          const yearMatch = selectedYear ? m.year === selectedYear : true;
          const statusMatch = selectedStatus ? m.status === selectedStatus : true;
          return yearMatch && statusMatch;
        })
      : allMembers;

  return (
    <main className="min-h-screen pt-20 p-4 md:p-10 space-y-12 md:space-y-16 max-w-7xl mx-auto bg-[#f4b518] text-white">
      
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-gray-800 pb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
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
            className="w-full sm:w-auto text-center bg-green-600 px-6 py-2.5 rounded-lg font-bold hover:bg-green-700 transition-all shadow-lg"
          >
            + Add Event
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {eventData.map((event: any) => (
            <div
              key={event._id}
              className="bg-gray-900 border border-gray-800 p-5 rounded-2xl flex flex-col hover:border-blue-500/50 transition-all group"
            >
              {event.image && (
                <div className="overflow-hidden rounded-xl mb-4">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              <div className="flex-grow">
                <h3 className="text-xl font-bold line-clamp-1 group-hover:text-blue-400 transition-colors">
                  {event.title}
                </h3>
                <p className="text-gray-400 mt-1 text-sm flex items-center gap-1">
                  📍 {event.location}
                </p>
                <div className="mt-4 text-green-400 text-xs font-bold uppercase tracking-widest bg-green-400/10 w-fit px-3 py-1.5 rounded-full">
                  {event.registrationCount} Registrations
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-6">
                <a
                  href={`/admin/events/${event._id}`}
                  className="bg-blue-600 text-center text-sm font-semibold py-2.5 rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Details
                </a>
                <a
                  href={`/admin/edit/${event._id}`}
                  className="bg-yellow-600/10 text-yellow-500 border border-yellow-600/30 text-center text-sm font-semibold py-2.5 rounded-xl hover:bg-yellow-600 hover:text-white transition-all"
                >
                  Edit
                </a>
                <div className="col-span-2">
                  <DeleteEventButton id={event._id.toString()} />
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
            className="w-full sm:w-auto text-center bg-green-600 px-6 py-2.5 rounded-lg font-bold hover:bg-green-700 transition-all shadow-lg"
          >
            + Add Member
          </a>
        </div>

        {/* Responsive Filter Bar */}
        <form
          method="GET"
          className="flex flex-col md:flex-row gap-3 mb-8 bg-gray-900/50 p-4 rounded-2xl border border-gray-800"
        >
          <div className="grid grid-cols-2 md:flex gap-3 flex-grow">
            <select
              name="year"
              defaultValue={selectedYear}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-sm focus:ring-2 focus:ring-yellow-500 outline-none"
            >
              <option value="">All Years</option>
              {uniqueYears.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>

            <select
              name="status"
              defaultValue={selectedStatus}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-sm focus:ring-2 focus:ring-yellow-500 outline-none"
            >
              <option value="">All Status</option>
              <option value="current">Current Team</option>
              <option value="ex">Ex Team</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-grow md:flex-none bg-yellow-500 text-black font-black px-8 py-2.5 rounded-xl hover:bg-yellow-400 transition-all"
            >
              Apply
            </button>
            <a
              href="/admin"
              className="flex-grow md:flex-none bg-gray-700 px-6 py-2.5 rounded-xl text-center text-sm font-bold hover:bg-gray-600 transition-all"
            >
              Clear
            </a>
          </div>
        </form>

        <p className="mb-6 text-gray-500 text-sm font-medium">
          Showing <span className="text-white">{filteredMembers.length}</span> members
        </p>

        {/* Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMembers.map((member: any) => (
            <div
              key={member._id}
              className="bg-gray-900 border border-gray-800 p-6 rounded-2xl text-center group hover:bg-gray-800/40 transition-all"
            >
              <div className="relative w-32 h-32 md:w-full md:h-48 mx-auto mb-5 overflow-hidden rounded-full md:rounded-xl border-4 border-gray-800 group-hover:border-yellow-500 transition-all duration-300">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <h3 className="text-lg font-extrabold text-white line-clamp-1">
                {member.name}
              </h3>

              <p className="text-yellow-500 text-[10px] uppercase font-black tracking-widest mt-1">
                {member.role}
              </p>

              <p className="text-gray-500 text-sm mt-2 font-medium">
                {member.year}
              </p>

              <div className="grid grid-cols-2 gap-2 mt-8">
                <a
                  href={`/admin/edit-member/${member._id}`}
                  className="bg-yellow-600/10 text-yellow-500 border border-yellow-600/30 text-center text-xs font-bold py-2.5 rounded-xl hover:bg-yellow-600 hover:text-white transition-all"
                >
                  Edit
                </a>
                <DeleteMemberButton id={member._id.toString()} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}