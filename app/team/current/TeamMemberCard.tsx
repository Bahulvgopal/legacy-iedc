"use client";

import { useState } from "react";

interface TeamMemberCardProps {
  member: {
    _id: string;
    name: string;
    role: string;
    year: string;
    image: string;
  };
  sectionIndex: number;
  memberIndex: number;
}

export default function TeamMemberCard({ member, sectionIndex, memberIndex }: TeamMemberCardProps) {
  const [isActive, setIsActive] = useState(false);

  const handleTouch = (e: React.TouchEvent) => {
    e.stopPropagation();
    setIsActive(true);
  };

  const handleClick = (e: React.MouseEvent) => {
    // Only handle on mobile/touch devices
    if ('ontouchstart' in window) {
      e.preventDefault();
      setIsActive(!isActive);
    }
  };

  return (
    <>
      {/* Invisible overlay to close active card when tapping elsewhere */}
      {isActive && (
        <div 
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setIsActive(false)}
          onTouchStart={() => setIsActive(false)}
        />
      )}

      <div
        className={`group relative opacity-0 ${isActive ? 'z-50' : 'z-0'}`}
        style={{
          animation: `fadeInUp 0.6s ease-out ${(sectionIndex * 0.2) + (memberIndex * 0.1)}s forwards`
        }}
        onTouchStart={handleTouch}
        onClick={handleClick}
      >
        {/* Card - Aggressive Design with Persistent Mobile State */}
        <div className={`relative bg-gradient-to-br from-zinc-900 to-black border-2 rounded-2xl overflow-hidden transition-all duration-500 
          ${isActive 
            ? 'border-[#f4b518] shadow-[0_0_50px_rgba(244,181,24,0.3)] -translate-y-3 scale-[1.02]' 
            : 'border-zinc-800'
          }
          md:hover:border-[#f4b518] md:hover:shadow-[0_0_50px_rgba(244,181,24,0.3)] md:hover:-translate-y-3 md:hover:scale-[1.02]
        `}>
          
          {/* Corner Accent */}
          <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#f4b518]/20 to-transparent transition-opacity duration-500 
            ${isActive ? 'opacity-100' : 'opacity-0'}
            md:opacity-0 md:group-hover:opacity-100
          `} />

          {/* Image */}
          <div className="relative aspect-[3/4] overflow-hidden">
            <img
              src={member.image}
              alt={member.name}
              className={`w-full h-full object-cover transform transition-transform duration-700 
                ${isActive ? 'scale-110 grayscale-0' : 'grayscale'}
                md:grayscale md:group-hover:scale-110 md:group-hover:grayscale-0
              `}
            />
            
            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent transition-opacity duration-500 
              ${isActive ? 'opacity-80' : 'opacity-60'}
              md:opacity-60 md:group-hover:opacity-80
            `} />
            
            {/* Role Badge */}
            <div className={`absolute bottom-4 left-4 right-4 transition-all duration-500 transform 
              ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
              md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0
            `}>
              <div className="bg-gradient-to-r from-[#f4b518] to-[#ffd700] px-4 py-2 rounded-lg shadow-[0_0_20px_rgba(244,181,24,0.6)]">
                <p 
                  className="text-xs sm:text-sm font-black uppercase tracking-wider text-black truncate"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.15em' }}
                >
                  {member.role}
                </p>
              </div>
            </div>

            {/* Scan Line Effect */}
            <div className={`absolute inset-0 transition-opacity duration-700 
              ${isActive ? 'opacity-100' : 'opacity-0'}
              md:opacity-0 md:group-hover:opacity-100
            `}>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#f4b518]/10 to-transparent animate-scan" />
            </div>
          </div>

          {/* Content - Bold Typography */}
          <div className="p-5 sm:p-6 space-y-3">
            <h3 
              className={`text-xl sm:text-2xl font-black line-clamp-2 leading-tight transition-colors duration-300 uppercase tracking-tight 
                ${isActive ? 'text-[#f4b518]' : 'text-white'}
                md:text-white md:group-hover:text-[#f4b518]
              `}
              style={{ fontFamily: "'Archivo Black', sans-serif" }}
            >
              {member.name}
            </h3>
            
            <div className="flex flex-col gap-2">
              <div className={`flex items-center gap-2.5 transition-colors 
                ${isActive ? 'text-[#f4b518]' : 'text-gray-400'}
                md:text-gray-400 md:group-hover:text-[#f4b518]
              `}>
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                </svg>
                <p className="text-xs sm:text-sm font-bold uppercase tracking-wide truncate">
                  {member.role}
                </p>
              </div>
              
              <div className="flex items-center gap-2.5 text-gray-500">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <p className="text-xs sm:text-sm font-bold uppercase tracking-wide truncate">
                  {member.year}
                </p>
              </div>
            </div>

            {/* Power Bar */}
            <div className="pt-4">
              <div className="relative h-1 bg-zinc-800 rounded-full overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-r from-[#f4b518] to-[#ffd700] rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(244,181,24,0.8)] 
                  ${isActive ? 'w-full' : 'w-0'}
                  md:w-0 md:group-hover:w-full
                `} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}