import Link from "next/link";

export const metadata = {
  title: "Legacy IEDC UCK | Innovation & Entrepreneurship Cell",
  description:
    "Official Legacy IEDC website of UCK College. Explore innovation programs, events and startup initiatives.",
};

export default function Page() {
  return (
    <main className="bg-[#f4b518] min-h-screen pt-24 lg:pt-0 pb-12 lg:pb-0 px-4 md:px-12 lg:px-20 flex items-center overflow-hidden">
      <div className="max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

        {/* LEFT SIDE - TEXT */}
        {/* Adjusted padding and alignment for mobile to prevent overlap */}
        <div className="space-y-6 md:space-y-12 text-black z-10 lg:pb-40 order-1 text-left -mt-15 md:-mt-8 lg:mt-0">

          <h1 className="text-[16vw] sm:text-[12vw] md:text-[10vw] lg:text-[7.5rem] font-black leading-[0.9] uppercase tracking-tighter">
            Create.<br />
            Sustain.<br />
            Thrive.
          </h1>

          <div className="flex flex-wrap gap-4 md:gap-6 pt-2">
            <Link
              href="/join"
              className="bg-black text-[#f4b518] px-6 md:px-10 py-3 md:py-4 rounded-full font-bold text-sm md:text-lg hover:scale-105 transition-transform shadow-xl shadow-black/20"
            >
              Join Us
            </Link>

            <Link
              href="/events"
              className="border-[3px] border-black text-black px-6 md:px-10 py-3 md:py-4 rounded-full font-bold text-sm md:text-lg hover:bg-black hover:text-[#f4b518] transition-all"
            >
              Live Events
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE - IMAGES */}
        {/* Forced 3 columns even on mobile to maintain the desktop staggered look */}
        <div className="order-2 grid grid-cols-3 gap-2 md:gap-4 lg:gap-6 mt-4 lg:mt-0 items-center">

          {/* Column 1 - Offset Down */}
          <div className="flex flex-col gap-2 md:gap-4 lg:gap-6 pt-4 md:pt-8 lg:justify-center">
            <HeroImage src="/img7.jpg" />
            <HeroImage src="/img8.jpg" />
            <HeroImage src="/img9.jpg" />
          </div>

          {/* Column 2 - Main Center (Staggered Up) */}
          <div className="flex flex-col gap-2 md:gap-4 lg:gap-6 lg:justify-center translate-y-6 md:translate-y-10 lg:translate-y-16">
            <HeroImage src="/img4.jpg" />
            <HeroImage src="/img5.jpg" />
            <HeroImage src="/img6.jpg" />
          </div>

          {/* Column 3 - Offset Down */}
          <div className="flex flex-col pt-4 md:pt-8 gap-2 md:gap-4 lg:gap-6 lg:justify-center">
            <HeroImage src="/img1.jpg" />
            <HeroImage src="/img2.jpg" />
            <HeroImage src="/img3.jpg" />
          </div>

        </div>
      </div>
    </main>
  );
}

/* Reusable Image Component */
function HeroImage({ src }: { src: string }) {
  return (
    <div className="relative w-full aspect-square rounded-xl md:rounded-2xl lg:rounded-[2rem] overflow-hidden shadow-lg border border-black/10">
      <img
        src={src}
        alt="Legacy Event"
        className="object-cover w-full h-full hover:scale-110 transition-transform duration-700"
      />
    </div>
  );
}