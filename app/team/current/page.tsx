import { connectDB } from "@/lib/mongodb";
import Member from "@/models/Member";
import { roleStructure } from "@/lib/roleStructure";
import TeamMemberCard from "./TeamMemberCard";

export const dynamic = "force-dynamic";

export default async function CurrentTeamPage() {
  await connectDB();

  const members = await Member.find({
    status: "current",
  });

  const totalMembers = members.length;

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Archivo+Black&family=Outfit:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />

      <main 
        className="-mt-4 min-h-screen bg-black relative overflow-hidden"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        {/* Vibrant Background Effects
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#f4b518] rounded-full blur-[150px] opacity-20 animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#ff6b35] rounded-full blur-[150px] opacity-15" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#f4b518] rounded-full blur-[180px] opacity-10" />
        </div> */}

        {/* Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `
                linear-gradient(#f4b518 1px, transparent 1px),
                linear-gradient(90deg, #f4b518 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px'
            }} 
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="max-w-[1900px] mx-auto">
            
            {/* Page Header - Ultra Bold */}
            <header className="mb-16 sm:mb-20 md:mb-24 text-center">
              <div className="inline-block mb-6 sm:mb-8">
                <div className="relative">
                  <span 
                    className="inline-block text-[#f4b518] font-black text-sm sm:text-base tracking-[0.4em] uppercase px-6 sm:px-8 py-3 rounded-full border-2 border-[#f4b518] shadow-[0_0_30px_rgba(244,181,24,0.3)]"
                    style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.3em' }}
                  >
                    THE SQUAD
                  </span>
                  <div className="absolute -inset-2 bg-[#f4b518] rounded-full blur-xl opacity-20 -z-10" />
                </div>
              </div>
              
              <h1 
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[12rem] font-black text-white mb-6 sm:mb-8 tracking-tighter leading-[0.85] uppercase"
                style={{ 
                  fontFamily: "'Archivo Black', sans-serif",
                  textShadow: '0 0 80px rgba(244, 181, 24, 0.3)'
                }}
              >
                CURRENT<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f4b518] via-[#ffd700] to-[#f4b518] animate-gradient">
                  TEAM
                </span>
              </h1>
              
              <div className="flex items-center justify-center gap-4 mb-6 sm:mb-8">
                <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-[#f4b518]" />
                <div className="w-3 h-3 rotate-45 bg-[#f4b518] shadow-[0_0_20px_rgba(244,181,24,0.6)]" />
                <div className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-[#f4b518]" />
              </div>
              
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 font-semibold max-w-3xl mx-auto leading-relaxed px-4">
                Meet the <span className="text-[#f4b518] font-black">visionaries</span>, <span className="text-[#f4b518] font-black">creators</span>, and <span className="text-[#f4b518] font-black">innovators</span> driving our mission forward
              </p>

              {totalMembers > 0 && (
                <div className="mt-8 sm:mt-10 inline-flex items-center gap-3 bg-gradient-to-r from-[#f4b518]/20 to-[#f4b518]/10 backdrop-blur-xl px-6 sm:px-8 py-3 sm:py-4 rounded-full border border-[#f4b518]/30 shadow-[0_0_30px_rgba(244,181,24,0.2)]">
                  <div className="relative">
                    <div className="w-3 h-3 bg-[#f4b518] rounded-full" />
                    <div className="absolute inset-0 bg-[#f4b518] rounded-full animate-ping" />
                  </div>
                  <span 
                    className="text-sm sm:text-base font-black text-[#f4b518] uppercase tracking-widest"
                    style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.2em' }}
                  >
                    {totalMembers} MEMBERS STRONG
                  </span>
                </div>
              )}
            </header>

            {/* Team Sections */}
            {members.length === 0 ? (
              // Empty State - Bold
              <div className="flex flex-col items-center justify-center py-20 sm:py-32 md:py-40">
                <div className="relative bg-gradient-to-br from-zinc-900 to-black border-2 border-[#f4b518]/30 rounded-3xl p-12 sm:p-16 md:p-20 max-w-3xl mx-auto text-center shadow-[0_0_60px_rgba(244,181,24,0.15)]">
                  <div className="absolute inset-0 bg-[#f4b518]/5 rounded-3xl blur-2xl -z-10" />
                  
                  <div className="w-20 h-20 sm:w-24 sm:h-24 mb-8 rounded-full bg-gradient-to-br from-[#f4b518]/20 to-transparent border-2 border-[#f4b518]/40 flex items-center justify-center mx-auto">
                    <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#f4b518]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  
                  <h3 
                    className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 uppercase tracking-tight"
                    style={{ fontFamily: "'Archivo Black', sans-serif" }}
                  >
                    COMING SOON
                  </h3>
                  <p className="text-base sm:text-lg text-gray-400 font-semibold">
                    Our incredible team is being assembled. Check back soon!
                  </p>
                </div>
              </div>
            ) : (
              // Team Sections - Dynamic Grid
              <div className="space-y-20 sm:space-y-24 md:space-y-32">
                {roleStructure.map((section, sectionIndex) => {
                  const sectionMembers = members.filter((m: any) =>
                    section.roles.includes(m.role)
                  );

                  if (sectionMembers.length === 0) return null;

                  return (
                    <section 
                      key={section.heading} 
                      className="opacity-0"
                      style={{
                        animation: `fadeInUp 0.8s ease-out ${sectionIndex * 0.2}s forwards`
                      }}
                    >
                      {/* Section Header - Aggressive Style */}
                      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-8 mb-10 sm:mb-12 md:mb-16">
                        <div className="relative">
                          <h2 
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tighter leading-none"
                            style={{ 
                              fontFamily: "'Archivo Black', sans-serif",
                              background: 'linear-gradient(135deg, #ffffff 0%, #f4b518 100%)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              backgroundClip: 'text'
                            }}
                          >
                            {section.heading}
                          </h2>
                          <div className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-[#f4b518] via-[#ffd700] to-transparent rounded-full" />
                        </div>
                        
                        <div className="hidden lg:block flex-1 h-px bg-gradient-to-r from-[#f4b518]/50 via-[#f4b518]/20 to-transparent" />
                        
                        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#f4b518] to-[#ffd700] px-5 py-2.5 rounded-full shadow-[0_0_30px_rgba(244,181,24,0.4)]">
                          <span 
                            className="text-sm sm:text-base font-black text-black uppercase tracking-wider"
                            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.15em' }}
                          >
                            {sectionMembers.length}
                          </span>
                        </div>
                      </div>

                      {/* Members Grid - Bold Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7 md:gap-8">
                        {section.roles.map((role) =>
                          sectionMembers
                            .filter((m: any) => m.role === role)
                            .map((member: any, memberIndex: number) => (
                              <TeamMemberCard
                                key={member._id}
                                member={member}
                                sectionIndex={sectionIndex}
                                memberIndex={memberIndex}
                              />
                            ))
                        )}
                      </div>

                      {/* Section Divider - Tech Style */}
                      {sectionIndex < roleStructure.filter(s => 
                        members.some((m: any) => s.roles.includes(m.role))
                      ).length - 1 && (
                        <div className="flex items-center gap-4 mt-16 sm:mt-20 md:mt-24">
                          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#f4b518]/40 to-transparent" />
                          <div className="flex gap-1.5">
                            <div className="w-1.5 h-1.5 bg-[#f4b518] rotate-45" />
                            <div className="w-1.5 h-1.5 bg-[#f4b518]/60 rotate-45" />
                            <div className="w-1.5 h-1.5 bg-[#f4b518]/30 rotate-45" />
                          </div>
                          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#f4b518]/40 to-transparent" />
                        </div>
                      )}
                    </section>
                  );
                })}
              </div>
            )}

            {/* Bottom CTA - Aggressive */}
            {totalMembers > 0 && (
              <div 
                className="mt-24 sm:mt-32 md:mt-40 text-center opacity-0"
                style={{
                  animation: `fadeInUp 0.8s ease-out ${roleStructure.length * 0.3}s forwards`
                }}
              >
                <div className="relative bg-gradient-to-br from-zinc-900 to-black border-2 border-[#f4b518] rounded-3xl p-10 sm:p-12 md:p-16 max-w-4xl mx-auto shadow-[0_0_80px_rgba(244,181,24,0.2)]">
                  <div className="absolute inset-0 bg-[#f4b518]/5 rounded-3xl blur-3xl -z-10" />
                  
                  <h3 
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 uppercase tracking-tighter"
                    style={{ fontFamily: "'Archivo Black', sans-serif" }}
                  >
                    JOIN THE<br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f4b518] to-[#ffd700]">
                      MOVEMENT
                    </span>
                  </h3>
                  
                  <p className="text-base sm:text-lg md:text-xl text-gray-400 font-semibold mb-8 sm:mb-10 max-w-2xl mx-auto">
                    Be part of something <span className="text-[#f4b518] font-black">bigger</span>. Shape the future of entrepreneurship with us.
                  </p>
                  
                  <a
                    href="/join"
                    className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#f4b518] to-[#ffd700] px-8 sm:px-10 md:px-12 py-4 sm:py-5 rounded-full font-black text-base sm:text-lg md:text-xl text-black uppercase tracking-wider overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(244,181,24,0.4)] hover:shadow-[0_0_60px_rgba(244,181,24,0.6)]"
                    style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.15em' }}
                  >
                    <span className="relative z-10">Apply Now</span>
                    <svg className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#ffd700] to-[#f4b518] translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
    </>
  );
}