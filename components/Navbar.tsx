"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [teamOpen, setTeamOpen] = useState(false);
  const [eventsOpen, setEventsOpen] = useState(false);
  const [mobileTeamOpen, setMobileTeamOpen] = useState(false); // ✅ Added
  const [mobileEventsOpen, setMobileEventsOpen] = useState(false);

  const teamRef = useRef<HTMLDivElement | null>(null);
  const eventsRef = useRef<HTMLDivElement | null>(null);

  // Close desktop dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        teamRef.current &&
        !teamRef.current.contains(event.target as Node)
      ) {
        setTeamOpen(false);
      }

      if (
        eventsRef.current &&
        !eventsRef.current.contains(event.target as Node)
      ) {
        setEventsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lock scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  // Close everything when mobile menu closes
  useEffect(() => {
    if (!menuOpen) {
      setMobileTeamOpen(false);
      setMobileEventsOpen(false);
    }
  }, [menuOpen]);

  return (
    <nav className="bg-[#f4b518] rounded-b-[40px] fixed top-0 left-0 w-full z-[1000]">

      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">

        {/* Logos */}
       <div className="flex items-center gap-4">
  <Image
    src="/legacy.png"
    alt="Legacy"
    width={200}
    height={100}
    className="w-20 sm:w-16 md:w-20 lg:w-24 h-auto"
  />

  <Image
    src="/iedc.png"
    alt="IEDC"
    width={400}
    height={120}
    className="w-40  sm:w-50 md:w-40 lg:w-52 h-auto"
  />
</div>


        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 text-xl font-semibold text-black items-center">

          <Link href="/">Home</Link>

          {/* TEAM DROPDOWN */}
          <div ref={teamRef} className="relative">
            <button
              onClick={() => setTeamOpen((prev) => !prev)}
              className="flex items-center gap-2"
            >
              Team
              <span className={`transition-transform duration-300 ${teamOpen ? "rotate-180" : ""}`}>
                ▼
              </span>
            </button>

            <div
              className={`absolute left-0 mt-4 bg-[#f4b518] rounded-xl shadow-xl transition-all duration-300 origin-top ${
                teamOpen
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
              }`}
            >
              <div className="flex flex-col py-4 px-8 gap-4 text-black ">
                <Link href="/team/current" className="hover:text-gray-600  text-[1.2rem]">
                  Current
                </Link>
                <Link href="/team/ex" className="hover:text-gray-600 text-[1.2rem]">
                  Previous
                </Link>
              </div>
            </div>
          </div>

          <Link href="/about">About Us</Link>

          {/* EVENTS DROPDOWN */}
          <div ref={eventsRef} className="relative">
            <button
              onClick={() => setEventsOpen((prev) => !prev)}
              className="flex items-center gap-2"
            >
              Events
              <span className={`transition-transform duration-300 ${eventsOpen ? "rotate-180" : ""}`}>
                ▼
              </span>
            </button>

            <div
              className={`absolute left-0 mt-4 bg-[#f4b518] rounded-xl shadow-xl transition-all duration-300 origin-top ${
                eventsOpen
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
              }`}
            >
              <div className="flex flex-col py-4 px-8 gap-4 text-black">
                <Link href="/events/upcoming" className="hover:text-gray-600 text-[1.1rem]">
                  Upcoming
                </Link>
                <Link href="/events/previous" className="hover:text-gray-600 text-[1.1rem]">
                  Previous
                </Link>
              </div>
            </div>
          </div>

          <Link href="/join">Join Community</Link>
          <Link href="/opinion">Opinion</Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden flex flex-col justify-between w-8 h-6"
        >
          <span
            className={`block h-[3px] bg-black rounded-full transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-2.5" : ""
            }`}
          />
          <span
            className={`block h-[3px] bg-black rounded-full transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-[0.2rem] bg-black rounded-full transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2.5 " : "w-5"
            }`}
          />
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden fixed top-[80px] left-0 w-full h-[calc(100vh-80px)] bg-[#f4b518]/95 backdrop-blur-2xl flex flex-col gap-6 px-6 py-8 z-[999] text-black text-lg font-semibold transition-all duration-300 ${
          menuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-5 pointer-events-none"
        }`}
      >
        <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>

        {/* Mobile Team */}
        <div>
          <button
            onClick={() => setMobileTeamOpen((prev) => !prev)}
            className="flex items-center gap-1 w-full"
          >
            Team
            <span className={`transition-transform duration-300 ${mobileTeamOpen ? "rotate-180 " : ""}`}>
              ▼
            </span>
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              mobileTeamOpen ? "max-h-40 opacity-100 mt-3" : "max-h-0 opacity-0"
            }`}
          >
            <div className="ml-4 flex flex-col gap-3">
              <Link href="/team/current" onClick={() => setMenuOpen(false)}>
                Current
              </Link>
              <Link href="/team/ex" onClick={() => setMenuOpen(false)}>
                Ex-Team
              </Link>
            </div>
          </div>
        </div>

        <Link href="/about" onClick={() => setMenuOpen(false)}>About Us</Link>

        {/* Mobile Events */}
        <div>
          <button
            onClick={() => setMobileEventsOpen((prev) => !prev)}
            className="flex items-center gap-1 w-full"
          >
            Events
            <span className={`transition-transform duration-300 ${mobileEventsOpen ? "rotate-180" : ""}`} >
              ▼
            </span>
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              mobileEventsOpen ? "max-h-40 opacity-100 mt-3" : "max-h-0 opacity-0"
            }`}
          >
            <div className="ml-4 flex flex-col gap-3">
              <Link href="/events/upcoming" onClick={() => setMenuOpen(false)}>
                Upcoming
              </Link>
              <Link href="/events/previous" onClick={() => setMenuOpen(false)}>
                Previous
              </Link>
            </div>
          </div>
        </div>

        <Link href="/join" onClick={() => setMenuOpen(false)}>
          Join Community
        </Link>

        <Link href="/opinion" onClick={() => setMenuOpen(false)}>
          Opinion
        </Link>
      </div>
    </nav>
  );
}
