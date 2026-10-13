import { ArrowRight, BriefcaseBusiness, Mic, ChartNoAxesCombined } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: BriefcaseBusiness,
    title: "Set up your interview",
    description:
      "Choose your target role, interview round, duration, and AI interviewer. Make every practice session relevant to your goal.",
  },
  {
    number: "02",
    icon: Mic,
    title: "Practice out loud",
    description:
      "Meet your AI interviewer in a live voice conversation. Listen to each question and answer naturally using your microphone.",
  },
  {
    number: "03",
    icon: ChartNoAxesCombined,
    title: "Review and improve",
    description:
      "Use your conversation transcript and interview feedback to identify strengths, spot gaps, and prepare for the next round.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-[#fbfaff] px-5 py-20 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700">
            A simpler way to prepare
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            From practice to{" "}
            <span className="text-violet-600">interview-ready.</span>
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
            Build confidence through realistic conversations, thoughtful
            practice, and a clear path to improvement.
          </p>
        </div>

        <div className="relative mt-14 grid gap-5 md:grid-cols-3 md:gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <article
                key={step.number}
                className="group relative rounded-2xl border border-violet-100 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-100/60 sm:p-8"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 transition group-hover:bg-violet-600 group-hover:text-white">
                    <Icon size={26} strokeWidth={1.8} aria-hidden="true" />
                  </div>
                  <span className="text-sm font-bold tracking-[0.2em] text-violet-200">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-7 text-xl font-bold text-slate-900 sm:text-2xl">
                  {step.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {step.description}
                </p>

                {index < steps.length - 1 && (
                  <div
                    className="absolute -right-4 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-violet-100 bg-white text-violet-500 md:flex"
                    aria-hidden="true"
                  >
                    <ArrowRight size={16} />
                  </div>
                )}
              </article>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 text-center sm:flex-row">
          <p className="text-sm text-slate-500">
            Your next interview starts with one practice session.
          </p>
          <a
            href="/interview/setup"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
          >
            Start practicing <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
