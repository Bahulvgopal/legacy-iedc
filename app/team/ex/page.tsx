"use client";

import { useEffect, useState } from "react";
import { roleStructure } from "@/lib/roleStructure";

interface Member {
  _id: string;
  name: string;
  image?: string;
  role: string;
  year: string;
  status: string;
  bio?: string;
}

export default function ExTeamPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [years, setYears] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("");

  useEffect(() => {
    async function fetchMembers() {
      try {
        const res = await fetch("/api/members");
        const data: Member[] = await res.json();

        const exMembers = data.filter(
          (m) => m.status === "ex"
        );

        setMembers(exMembers);

        // ✅ Unique years sorted newest first
        const uniqueYears: string[] = Array.from(
          new Set<string>(
            exMembers.map((m) => String(m.year))
          )
        ).sort((a: string, b: string) => {
          const yearA = parseInt(a.split("-")[0]);
          const yearB = parseInt(b.split("-")[0]);
          return yearB - yearA;
        });

        setYears(uniqueYears);

        if (uniqueYears.length > 0) {
          setSelectedYear(uniqueYears[0]);
        }
      } catch (error) {
        console.error("Failed to fetch members", error);
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
      {years.length > 0 && (
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
      )}

      {/* Role-Based Sections */}
      {roleStructure.map((section) => {
        const sectionMembers = filteredMembers.filter(
          (m) => section.roles.includes(m.role)
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
                  .filter((m) => m.role === role)
                  .map((member) => (
                    <div
                      key={member._id}
                      className="bg-gray-900 p-5 rounded-lg shadow-lg hover:shadow-xl transition"
                    >
                      <img
                        src={
                          member.image ||
                          "/placeholder.png"
                        }
                        alt={member.name}
                        className="w-full h-48 object-cover rounded"
                      />

                      <h3 className="mt-4 font-semibold text-lg">
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
