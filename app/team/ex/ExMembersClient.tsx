"use client";

import { useState } from "react";

interface Member {
  _id: string;
  name: string;
  image: string;
  role: string;
  year: string;
}

export default function ExMembersClient({ members }: { members: Member[] }) {
  const [selectedYear, setSelectedYear] = useState<string>("all");

  // Get unique years
  const years = Array.from(new Set(members.map((m) => m.year))).sort(
    (a, b) => parseInt(b) - parseInt(a)
  );

  // Group members by year
  const membersByYear: { [key: string]: Member[] } = {};
  members.forEach((member) => {
    if (!membersByYear[member.year]) {
      membersByYear[member.year] = [];
    }
    membersByYear[member.year].push(member);
  });

  // Filter members
  const filteredMembers =
    selectedYear === "all"
      ? members
      : members.filter((m) => m.year === selectedYear);

  return (
    <div className="min-h-screen bg-black">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#f4b518]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#f4b518]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '700ms' }}></div>
      </div>

      {/* Hero Section */}
      <div className="relative pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-6 sm:pb-10 md:pb-12 px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-block mb-4 sm:mb-5">
            <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#f4b518]/10 border border-[#f4b518]/30 rounded-full text-[#f4b518] text-[10px] sm:text-xs font-bold tracking-wider backdrop-blur-sm uppercase">
              ★ Alumni Hall of Fame ★
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 sm:mb-4 tracking-tight">
            Our{" "}
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-[#f4b518] blur-xl sm:blur-2xl opacity-50"></span>
              <span className="relative text-[#f4b518] drop-shadow-[0_0_20px_rgba(244,181,24,0.5)]">
                Legacy
              </span>
            </span>
          </h1>

          <p className="text-gray-400 text-xs sm:text-sm md:text-base max-w-xl mx-auto px-2 mb-6 sm:mb-8">
            Honoring the pioneers who shaped our journey
          </p>

          {/* Year Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 px-2">
            <button
              onClick={() => setSelectedYear("all")}
              className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg font-bold transition-all duration-300 text-xs sm:text-sm uppercase tracking-wide ${
                selectedYear === "all"
                  ? "bg-[#f4b518] text-black shadow-lg shadow-[#f4b518]/50 scale-105 border-2 border-[#f4b518]"
                  : "bg-zinc-900 text-gray-400 hover:bg-zinc-800 hover:text-[#f4b518] border border-zinc-800 hover:border-[#f4b518]/30"
              }`}
            >
              All Years
            </button>
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg font-bold transition-all duration-300 text-xs sm:text-sm uppercase tracking-wide ${
                  selectedYear === year
                    ? "bg-[#f4b518] text-black shadow-lg shadow-[#f4b518]/50 scale-105 border-2 border-[#f4b518]"
                    : "bg-zinc-900 text-gray-400 hover:bg-zinc-800 hover:text-[#f4b518] border border-zinc-800 hover:border-[#f4b518]/30"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Members Display */}
      <div className="relative max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pb-12 sm:pb-16 md:pb-20">
        {selectedYear === "all" ? (
          // Show grouped by year
          Object.keys(membersByYear)
            .sort((a, b) => parseInt(b) - parseInt(a))
            .map((year) => (
              <section key={year} className="mb-12 sm:mb-16 md:mb-20">
                {/* Year Header */}
                <div className="relative mb-6 sm:mb-10">
                  <div className="flex items-center justify-center gap-3 sm:gap-4">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#f4b518]/50 to-[#f4b518]/20"></div>
                    
                    <div className="relative group">
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-[#f4b518]/20 blur-xl rounded-full scale-150"></div>
                      
                      {/* Year badge */}
                      <div className="relative bg-gradient-to-br from-zinc-900 to-black px-4 sm:px-8 py-2 sm:py-3 rounded-xl border-2 border-[#f4b518] shadow-xl shadow-[#f4b518]/30">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#f4b518] tracking-tight">
                          {year}
                        </h2>
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#f4b518] rounded-full animate-ping"></div>
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#f4b518] rounded-full"></div>
                      </div>
                    </div>
                    
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#f4b518]/50 to-[#f4b518]/20"></div>
                  </div>
                  
                  {/* Member count */}
                  <div className="flex justify-center mt-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-900/80 border border-[#f4b518]/20 rounded-full">
                      <div className="w-1.5 h-1.5 bg-[#f4b518] rounded-full animate-pulse"></div>
                      <p className="text-gray-400 text-xs font-medium">
                        {membersByYear[year].length} Member{membersByYear[year].length !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Members Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
                  {membersByYear[year].map((member, index) => (
                    <div
                      key={member._id}
                      className="group relative"
                      style={{
                        animation: `fadeInUp 0.5s ease-out ${index * 0.05}s both`,
                      }}
                    >
                      <div className="relative bg-zinc-950 rounded-xl overflow-hidden border border-zinc-800 hover:border-[#f4b518] transition-all duration-500 hover:shadow-xl hover:shadow-[#f4b518]/30 hover:-translate-y-1">
                        {/* Corner accents */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#f4b518]/0 group-hover:border-[#f4b518] transition-all duration-500 rounded-tl-xl"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#f4b518]/0 group-hover:border-[#f4b518] transition-all duration-500 rounded-br-xl"></div>

                        {/* Image Container */}
                        <div className="relative h-36 sm:h-40 md:h-44 overflow-hidden">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          
                          {/* Dark overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                          
                          {/* Gold overlay on hover */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#f4b518]/40 via-[#f4b518]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                          {/* Role Badge */}
                          {member.role && (
                            <div className="absolute top-2 right-2 bg-black/90 backdrop-blur-sm px-1.5 py-0.5 rounded border border-[#f4b518]/50">
                              <p className="text-[#f4b518] text-[8px] sm:text-[9px] font-bold uppercase tracking-wider line-clamp-1">
                                {member.role}
                              </p>
                            </div>
                          )}

                          {/* Gold accent line */}
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#f4b518] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                        </div>

                        {/* Content */}
                        <div className="p-2 sm:p-2.5 relative bg-gradient-to-b from-zinc-950 to-black">
                          <h3 className="text-xs sm:text-sm font-bold text-white mb-1 group-hover:text-[#f4b518] transition-colors duration-300 line-clamp-1">
                            {member.name}
                          </h3>

                          <div className="flex items-center text-gray-500 text-[10px] sm:text-xs">
                            <svg
                              className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1 text-[#f4b518] flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="group-hover:text-gray-300 transition-colors duration-300">
                              {member.year}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))
        ) : (
          // Show filtered by selected year
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
            {filteredMembers.map((member, index) => (
              <div
                key={member._id}
                className="group relative"
                style={{
                  animation: `fadeInUp 0.5s ease-out ${index * 0.05}s both`,
                }}
              >
                <div className="relative bg-zinc-950 rounded-xl overflow-hidden border border-zinc-800 hover:border-[#f4b518] transition-all duration-500 hover:shadow-xl hover:shadow-[#f4b518]/30 hover:-translate-y-1">
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#f4b518]/0 group-hover:border-[#f4b518] transition-all duration-500 rounded-tl-xl"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#f4b518]/0 group-hover:border-[#f4b518] transition-all duration-500 rounded-br-xl"></div>

                  {/* Image Container */}
                  <div className="relative h-36 sm:h-40 md:h-44 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                    
                    {/* Gold overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#f4b518]/40 via-[#f4b518]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Role Badge */}
                    {member.role && (
                      <div className="absolute top-2 right-2 bg-black/90 backdrop-blur-sm px-1.5 py-0.5 rounded border border-[#f4b518]/50">
                        <p className="text-[#f4b518] text-[8px] sm:text-[9px] font-bold uppercase tracking-wider line-clamp-1">
                          {member.role}
                        </p>
                      </div>
                    )}

                    {/* Gold accent line */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#f4b518] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  </div>

                  {/* Content */}
                  <div className="p-2 sm:p-2.5 relative bg-gradient-to-b from-zinc-950 to-black">
                    <h3 className="text-xs sm:text-sm font-bold text-white mb-1 group-hover:text-[#f4b518] transition-colors duration-300 line-clamp-1">
                      {member.name}
                    </h3>

                    <div className="flex items-center text-gray-500 text-[10px] sm:text-xs">
                      <svg
                        className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1 text-[#f4b518] flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="group-hover:text-gray-300 transition-colors duration-300">
                        {member.year}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {filteredMembers.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <div className="inline-block p-6 bg-zinc-900 rounded-xl mb-4 border border-[#f4b518]/30">
              <svg
                className="w-12 h-12 sm:w-16 sm:h-16 text-[#f4b518]/50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              No Members Found
            </h3>
            <p className="text-gray-500 text-sm sm:text-base">
              No members found for the selected year.
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}