import { Sparkles, Play , ArrowRight } from "lucide-react";
function Hero() {
  return (
    <div className="bg-[#f5f3ff]">
      <main className="mx-auto max-w-7xl px-6 pb-20 pt-36">
        <section className="text-center">
          <div className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-violet-200/80 bg-white/80 px-4 py-2 text-sm font-medium text-violet-700 shadow-sm backdrop-blur transition hover:border-violet-300">
            <Sparkles size={16} />

            Your AI-powered interview partner

            <span className="ml-1 rounded-full bg-violet-100 px-2 py-0.5 text-xs font-semibold">
              New
            </span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl">
            Your next opportunity
            <br />
            starts with{" "}
            <span className="text-violet-600">Intervia.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Practice real interviews with an AI that listens, asks follow-up
            questions, and helps you become interview-ready.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="interview/setup"
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-violet-600 px-7 py-4 font-semibold text-white shadow-lg shadow-violet-600/25 transition duration-300 hover:-translate-y-1 hover:bg-violet-700 hover:shadow-xl hover:shadow-violet-600/30 sm:w-auto"
            >
              Start your free interview

              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>

            <a
              href="#how-it-works"
              className="flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/80 px-7 py-4 font-semibold text-slate-800 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-violet-300 hover:bg-white sm:w-auto"
            >
              <Play size={17} className="fill-current" />

              See how it works
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Hero;