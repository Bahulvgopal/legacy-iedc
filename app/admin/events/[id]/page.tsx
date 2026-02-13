import { connectDB } from "@/lib/mongodb";
import Registration from "@/models/Registration";
import mongoose from "mongoose";

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await connectDB();

  const { id } = await params; // ✅ FIX HERE

  const registrations = await Registration.find({
    eventId: new mongoose.Types.ObjectId(id),
  }).sort({ createdAt: -1 });

  return (
    <main className="min-h-screen p-10">
      <h1 className="text-3xl font-bold mb-6">
        Event Registrations
      </h1>

      {registrations.length === 0 ? (
        <p>No registrations yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <a
  href={`/api/export/${id}`}
  className="inline-block mb-6 bg-green-600 px-4 py-2 rounded hover:bg-green-700"
>
  Export as CSV
</a>

          <table className="w-full border border-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th className="p-3">Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Department</th>
                <th>Year</th>
              </tr>
            </thead>

            <tbody>
              {registrations.map((reg: any) => (
                <tr key={reg._id} className="border-t border-gray-700">
                  <td className="p-3">{reg.name}</td>
                  <td>{reg.email}</td>
                  <td>{reg.phone}</td>
                  <td>{reg.department}</td>
                  <td>{reg.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
