import { connectDB } from "@/lib/mongodb";
import Member from "@/models/Member";
import { roleStructure } from "@/lib/roleStructure";

export default async function CurrentTeamPage() {
  await connectDB();

  const members = await Member.find({
    status: "current",
  });

  return (
    <main className="pt-24 p-10">
      <h1 className="text-4xl font-bold mb-10">
        Current Team
      </h1>

      {roleStructure.map((section) => {
        const sectionMembers = members.filter((m: any) =>
          section.roles.includes(m.role)
        );

        if (sectionMembers.length === 0) return null;

        return (
          <div key={section.heading} className="mb-14">
            <h2 className="text-2xl font-bold mb-6">
              {section.heading}
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {section.roles.map((role) =>
                sectionMembers
                  .filter((m: any) => m.role === role)
                  .map((member: any) => (
                    <div
                      key={member._id}
                      className="bg-gray-900 p-5 rounded-lg"
                    >
                      <img
                        src={member.image}
                        className="w-full h-48 object-cover rounded"
                      />

                      <h3 className="mt-4 font-semibold">
                        {member.name}
                      </h3>

                      <p className="text-sm text-gray-400">
                        {member.role}
                      </p>

                      <p className="text-sm text-gray-500">
                        {member.year}
                      </p>
                    </div>
                  ))
              )}
            </div>
          </div>
        );
      })}
    </main>
  );
}
