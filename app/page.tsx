"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Page() {
  const [events, setEvents] = useState<any[]>([]);
  const [index, setIndex] = useState(0);

  // 🔥 Fetch real events from DB
  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/events/latest", {
          cache: "no-store",
        });
        const data = await res.json();
        if (Array.isArray(data)) {
          setEvents(data);
        }
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    }
    fetchEvents();
  }, []);

  // 🔥 Auto rotate only if events exist
  useEffect(() => {
    if (events.length === 0) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % events.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [events]);

  const columns = [
    { images: [7, 8, 9], offset: "pt-4 md:pt-8" },
    { images: [4, 5, 6], offset: "translate-y-10 md:translate-y-12 lg:translate-y-20" },
    { images: [1, 2, 3], offset: "pt-4 md:pt-8" },
  ];

  return (
    <div className="bg-[#f4b518]">
      {/* HERO SECTION */}
      <main className="min-h-screen pt-28 lg:pt-0 pb-24 lg:pb-32 px-4 md:px-12 lg:px-20 flex items-center overflow-hidden">
        <div className="max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6 md:space-y-10 text-black z-10 -mt-15 lg:pb-20 order-1 text-left"
          >
            <h1 className="text-[15vw] sm:text-[12vw] md:text-[10vw] lg:text-[7.5rem] font-black leading-[0.95] uppercase tracking-tighter">
              Create.<br />
              Sustain.<br />
              Thrive.
            </h1>
            <div className="flex flex-wrap gap-4 md:gap-6 pt-4">
              <Link href="/join" className="bg-black text-[#f4b518] px-8 md:px-12 py-3 md:py-4 rounded-full font-bold text-sm md:text-lg hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/20">Join Us</Link>
              <Link href="/events" className="border-[3px] border-black text-black px-8 md:px-12 py-3 md:py-4 rounded-full font-bold text-sm md:text-lg hover:bg-black hover:text-[#f4b518] active:scale-95 transition-all">Live Events</Link>
            </div>
          </motion.div>
          
          <div className="order-2 grid grid-cols-3 gap-3 md:gap-4 lg:gap-6 items-start">
            {columns.map((col, colIndex) => (
              <div key={colIndex} className={`flex flex-col gap-3 md:gap-4 lg:gap-6 ${col.offset}`}>
                {col.images.map((num, imgIndex) => (
                  <motion.div key={num} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: (colIndex * 3 + imgIndex) * 0.1, duration: 0.6, ease: "easeOut" }}>
                    <HeroImage src={`/img${num}.jpg`} />
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* BLACK CONTENT SECTIONS */}
      <div className="bg-black text-white rounded-t-[60px] md:rounded-t-[120px] relative z-30 shadow-[0_-20px_50px_rgba(0,0,0,0.3)] overflow-hidden">
        
        {/* VISION & MISSION SECTION */}
        <motion.section 
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="py-24 px-6 md:px-12 lg:px-24"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
            <Reveal><InfoCard icon="/vision.svg" title="Vision" headline="We strive to help students have a vision of their own" description="Our vision is to inculcate amongst budding entrepreneurs, the rigor and conviction in their ideas to go out there to make a mark." /></Reveal>
            <Reveal delay={0.2}><InfoCard icon="/mission.png" title="Mission" headline="We grant a platform for innovators to express themselves and upscale" description="Our mission, put into perspective, is to lend a hand to emerging and struggling entrepreneurs to help them realize their vision." /></Reveal>
          </div>
        </motion.section>

        <div className="md:w-200 w-80 h-0.5 bg-[#f4b518] mx-auto rounded-full"></div>

        {/* OUR SAGA SECTION */}
        <section className="py-24 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto space-y-24 md:space-y-32">
            <Reveal>
              <h2 className="text-4xl md:text-6xl font-black text-center uppercase text-[#f4b518] tracking-tighter mb-16">Our Saga</h2>
            </Reveal>

            {/* Saga Items */}
            {[
              { id: 1, title: "Our Inception", text: "University College of Engineering, Karivattom (UCEK) welcomed us as we graced the college by establishing the cell in 2020 and the investiture of the first executive committee. The incumbent exe-com proved their mettle, explored, and went on to leave a trail of legacy for the future members to tread upon.", img: "/saga1.jpg", reverse: false },
              { id: 2, title: "Our Journey", text: "We have displayed our worth on various fronts. We have successfully organized districtwide, statewide, and national events including hands-on workshops, hackathons, ideathons, talks, masterclasses, mentorship programmes, talent searches, and non-technical events. We take pride in being able to collaborate with other cells and communities of the college to have come so far and to keep going.", img: "/saga2.jpg", reverse: true },
              { id: 3, title: "The Legacy Continues", text: "The legacy will be preserved by our lineage. Legacy-IEDC-UCEK will revolutionize the startup ecosystem globally starting with Kerala. We will strive to identify, grow and produce entrepreneurs who will shape the world.", img: "/saga3.jpg", reverse: false }
            ].map((saga) => (
              <div key={saga.id} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <Reveal className={saga.reverse ? "lg:order-last" : ""}>
                  <div className="space-y-6">
                    <h3 className="text-2xl md:text-3xl font-bold text-white">{saga.title}</h3>
                    <p className="text-gray-400 text-lg md:text-xl leading-relaxed">{saga.text}</p>
                  </div>
                </Reveal>
                <Reveal delay={0.2} className={saga.reverse ? "lg:order-first" : ""}>
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                    <img src={saga.img} className="w-full h-auto object-cover" alt={saga.title} />
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </section>

        {/* --- CAROUSEL EVENT CARDS --- */}
        <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#050505]">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <h2 className="text-4xl md:text-6xl font-black text-center uppercase text-[#f4b518] tracking-tighter mb-20">
                Latest Events
              </h2>
            </Reveal>

            {events.length === 0 ? (
              <p className="text-center text-gray-400">
                No upcoming events.
              </p>
            ) : (
              <div className="relative flex justify-center items-center h-[550px] md:h-[650px]">
                <AnimatePresence mode="popLayout">
                  {[
                    (index - 1 + events.length) % events.length,
                    index,
                    (index + 1) % events.length
                  ].map((itemIdx, i) => {
                    const event = events[itemIdx];
                    const isCenter = i === 1;

                    return (
                      <motion.div
                        key={event._id || event.id || itemIdx}
                        initial={{ opacity: 0, scale: 0.8, x: i === 0 ? -100 : i === 2 ? 100 : 0 }}
                        animate={{
                          opacity: isCenter ? 1 : 0.3,
                          scale: isCenter ? 1 : 0.8,
                          x: i === 0 ? "-110%" : i === 2 ? "110%" : "0%",
                          zIndex: isCenter ? 20 : 10,
                          filter: isCenter ? "blur(0px)" : "blur(4px)"
                        }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className={`absolute w-full max-w-[300px] md:max-w-[400px] ${!isCenter ? "hidden md:block" : "block"}`}
                      >
                        <EventCard event={event} highlighted={isCenter} />
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}

            {/* Pagination Dots */}
            {events.length > 0 && (
              <div className="flex justify-center gap-3 mt-12">
                {events.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`h-2 transition-all duration-500 rounded-full ${i === index ? "w-10 bg-[#f4b518]" : "w-2 bg-gray-700 hover:bg-gray-500"}`}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function EventCard({ event, highlighted }: { event: any; highlighted: boolean }) {
  return (
    <div 
      className={`bg-black/40 backdrop-blur-md p-5 rounded-[2rem] border-2 transition-all duration-500 flex flex-col h-full
      ${highlighted ? "border-[#f4b518] shadow-[0_0_40px_rgba(244,181,24,0.15)]" : "border-white/5 opacity-50"}`}
    >
      <div className="relative w-full aspect-[4/5] rounded-[1.5rem] overflow-hidden mb-6">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
        />
      </div>

      <div className="flex-1 space-y-3 text-center">
        <h3 className="text-xl font-black uppercase tracking-tight leading-tight min-h-[3rem]">
          {event.title}
        </h3>
        <p className="text-[#f4b518] font-bold text-sm tracking-widest">
          {event.eventDate ? new Date(event.eventDate).toDateString() : "Date TBD"}
        </p>
      </div>

      <Link 
        href="/events"
        className={`mt-6 w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all text-center
          ${highlighted ? "bg-[#f4b518] text-black hover:bg-white" : "bg-white/10 text-white"}`}
      >
        View More
      </Link>
    </div>
  );
}

function HeroImage({ src }: { src: string }) {
  return (
    <div className="relative w-full aspect-square rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-2xl border border-black/5">
      <img src={src} alt="Legacy Event" className="object-cover w-full h-full hover:scale-110 transition-transform duration-700 ease-in-out" />
    </div>
  );
}

function Reveal({ children, delay = 0, className = "" }: any) {
  return (
    <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, delay, ease: "easeOut" }} className={className}>
      {children}
    </motion.div>
  );
}

function InfoCard({ icon, title, headline, description }: any) {
  return (
    <div className="flex flex-col items-center text-center space-y-8">
      <motion.div whileHover={{ y: -10 }} className="w-24 h-24 md:w-40 md:h-40 flex items-center justify-center p-4 bg-white/5 rounded-full backdrop-blur-sm">
        <img src={icon} alt={title} className="w-full h-full object-contain" />
      </motion.div>
      <div className="space-y-4">
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#f4b518]">{title}</h2>
        <div className="w-20 md:h-1.5 h-1 bg-[#f4b518] mx-auto rounded-full"></div>
      </div>
      <div className="space-y-6 max-w-md">
        <p className="text-xl md:text-2xl font-bold leading-tight">{headline}</p>
        <p className="text-gray-400 text-base md:text-lg leading-relaxed font-medium">{description}</p>
      </div>
    </div>
  );
}