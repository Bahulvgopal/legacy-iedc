"use client";

import { useEffect, useState } from "react";
import { roleStructure } from "@/lib/roleStructure";

export default function ExTeamPage() {
  const [members, setMembers] = useState<any[]>([]);
  const [years, setYears] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    async function fetchMembers() {
      const res = await fetch("/api/members");
      const data = await res.json();

      const exMembers = data.filter(
        (m: any) => m.status === "ex"
      );

      setMembers(exMembers);

     const uniqueYears: string[] = [
  ...new Set(
    exMembers.map((m: any) => String(m.year))
  ),
].sort().reverse();

setYears(uniqueYears);

if (uniqueYears.length > 0) {
  setSelectedYear(uniqueYears[0]);
}

    }

    fetchMembers();
  }, []);

  const filteredMembers = members.filter(
    (m) => m.year === selectedYear
  );

  return (
    <main className="pt-24 p-10 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">
        Previous Members
      </h1>

      {/* Year Selector */}
      <div className="mb-10">
        <select
          value={selectedYear}
          onChange={(e) =>
            setSelectedYear(e.target.value)
          }
          className="px-4 py-2 rounded bg-gray-800 text-white"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Hierarchical Sections */}
      {roleStructure.map((section) => {
        const sectionMembers = filteredMembers.filter(
          (m: any) =>
            section.roles.includes(m.role)
        );

        if (sectionMembers.length === 0)
          return null;

        return (
          <div
            key={section.heading}
            className="mb-14"
          >
            <h2 className="text-2xl font-bold mb-6">
              {section.heading}
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {section.roles.map((role) =>
                sectionMembers
                  .filter(
                    (m: any) => m.role === role
                  )
                  .map((member: any) => (
                    <div
                      key={member._id}
                      className="bg-gray-900 p-5 rounded-lg"
                    >
                      <img
                        src={member.imageUrl}
                        className="w-full h-48 object-cover rounded"
                      />

                      <h3 className="mt-4 font-semibold">
                        {member.name}
                      </h3>

                      <p className="text-sm text-gray-400">
                        {member.role}
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
