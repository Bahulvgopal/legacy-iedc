import Link from "next/link";

export const metadata = {
  title: "Legacy IEDC UCK | Innovation & Entrepreneurship Cell",
  description:
    "Official Legacy IEDC website of UCK College. Explore innovation programs, events and startup initiatives.",
};

export default function Page() {
  return (
    <main className="bg-[#f4b518] min-h-screen pt-24 lg:pt-0 pb-16 px-6 md:px-12 lg:px-20 flex items-center">
      <div className="max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* LEFT SIDE - TEXT */}
        <div className="space-y-8 md:space-y-12 text-black z-10 pb-40 order-1">
          <h1 className="text-[14vw] sm:text-[12vw] md:text-[10vw] lg:text-[7rem] font-black leading-[1.05]  uppercase">
            Create.<br />
            Sustain.<br />
            Thrive.
          </h1>

          <div className="flex flex-wrap gap-6 pt-4">
            <Link
              href="/join"
              className="bg-black text-[#f4b518] px-8 md:px-10 py-3 md:py-4 rounded-full font-bold text-base md:text-lg hover:scale-105 transition-transform shadow-xl shadow-black/20"
            >
              Join Us
            </Link>

            <Link
              href="/events"
              className="border-[3px] border-black text-black px-8 md:px-10 py-3 md:py-4 rounded-full font-bold text-base md:text-lg hover:bg-black hover:text-[#f4b518] transition-all"
            >
              Live Events
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE - IMAGES */}
        <div className="order-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 lg:gap-6 mt-10 lg:mt-0">

          {/* Column 1 */}
          <div className="flex flex-col gap-4 lg:gap-6 pt-8 lg:justify-center">
            <HeroImage src="/img7.jpg" />
            <HeroImage src="/img8.jpg" />
            <HeroImage src="/img9.jpg" />
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-4 lg:gap-6 lg:justify-center lg:translate-y-16">
            <HeroImage src="/img4.jpg" />
            <HeroImage src="/img5.jpg" />
            <HeroImage src="/img6.jpg" />
          </div>

          {/* Column 3 */}
          <div className="flex flex-col pt-8 gap-4 lg:gap-6 lg:justify-center ">
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
    <div className="relative w-full aspect-[4/4] rounded-2xl lg:rounded-[2rem] overflow-hidden shadow-lg border border-black/10">
      <img
        src={src}
        alt="Legacy Event"
        className="object-cover w-full h-full hover:scale-110 transition-transform duration-700"
      />
    </div>
  );
}
 