import {
  BrainCircuit,
  Mic,
  Video,
  MessageSquareText,
  ChartNoAxesCombined,
  ShieldCheck,
  ArrowUpRight,
  Sparkles,
  AudioLines,
  CirclePlay,
} from "lucide-react";

const features = [
  {
    number: "01",
    icon: BrainCircuit,
    title: "Interviews that think.",
    highlight: "Not just talk.",
    description:
      "Meet an AI interviewer that listens to your answers, understands your approach, and asks relevant follow-up questions.",
    tag: "AI-POWERED",
    type: "brain",
    className: "md:col-span-2",
  },
  {
    number: "02",
    icon: Mic,
    title: "Speak naturally.",
    description:
      "Forget typing rehearsed answers. Speak your mind and practice expressing yourself with confidence.",
    tag: "REAL-TIME VOICE",
    type: "voice",
    className: "md:col-span-1",
  },
  {
    number: "03",
    icon: Video,
    title: "Face your next interview.",
    description:
      "Practice with realistic virtual interviewers in a professional interview environment.",
    tag: "REALISTIC PRACTICE",
    type: "video",
    className: "md:col-span-1",
  },
  {
    number: "04",
    icon: MessageSquareText,
    title: "Every round. One place.",
    description:
      "Prepare for introductions, coding challenges, technical discussions, and behavioral interviews.",
    tag: "MULTIPLE ROUNDS",
    type: "rounds",
    className: "md:col-span-1",
  },
  {
    number: "05",
    icon: ChartNoAxesCombined,
    title: "Turn feedback into progress.",
    description:
      "Discover what went well, identify weak areas, and understand what to improve before your next attempt.",
    tag: "PERFORMANCE INSIGHTS",
    type: "insights",
    className: "md:col-span-2",
  },
  {
    number: "06",
    icon: ShieldCheck,
    title: "Fail here. Shine out there.",
    description:
      "Make mistakes without judgment. Learn at your own pace and build confidence before the real thing.",
    tag: "ZERO PRESSURE",
    type: "confidence",
    className: "md:col-span-3",
  },
];

function FeatureVisual({ type }) {
  if (type === "brain") {
    return (
      <div className="relative mt-8 flex h-40 items-center justify-center overflow-hidden rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 via-white to-purple-50 sm:h-48">
        <div className="absolute h-40 w-40 rounded-full border border-violet-200/70" />

        <div className="absolute h-28 w-28 animate-[spin_30s_linear_infinite] rounded-full border border-dashed border-violet-300" />

        <div className="absolute h-24 w-24 rounded-full bg-violet-300/30 blur-2xl" />

        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-200 bg-white shadow-lg shadow-violet-200/50 transition-transform duration-500 group-hover:scale-110">
          <BrainCircuit
            size={34}
            strokeWidth={1.5}
            className="text-violet-600"
          />
        </div>

        <div className="absolute left-[7%] top-[20%] flex items-center gap-2 rounded-xl border border-violet-100 bg-white px-3 py-2 text-xs text-slate-600 shadow-md sm:left-[12%]">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Listening
        </div>

        <div className="absolute bottom-[15%] right-[5%] flex items-center gap-2 rounded-xl border border-violet-100 bg-white px-3 py-2 text-xs text-violet-700 shadow-md sm:right-[8%]">
          <Sparkles size={13} />
          Adaptive questions
        </div>

        <div className="absolute bottom-3 left-4 text-[9px] uppercase tracking-[0.15em] text-slate-400 sm:bottom-4 sm:left-5 sm:text-[10px]">
          Intelligence in every interaction
        </div>
      </div>
    );
  }

  if (type === "voice") {
    return (
      <div className="mt-8 flex h-28 items-center justify-center gap-1 overflow-hidden rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 to-white px-3 sm:px-4">
        {Array.from({ length: 35 }).map((_, index) => (
          <span
            key={index}
            className="w-1 rounded-full bg-violet-500/70 transition-all duration-300 group-hover:bg-violet-600"
            style={{
              height: `${
                10 + Math.abs(Math.sin(index * 0.65)) * 46
              }px`,
              opacity:
                0.35 + Math.abs(Math.sin(index * 0.4)) * 0.65,
            }}
          />
        ))}
      </div>
    );
  }

  if (type === "video") {
    return (
      <div className="relative mt-8 flex h-36 items-center justify-center overflow-hidden rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-100 via-white to-purple-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(167,139,250,0.18),transparent_65%)]" />

        <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-violet-200 bg-white/80 shadow-lg shadow-violet-200/50 transition-transform duration-300 group-hover:scale-105">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-violet-200 bg-violet-50">
            <CirclePlay
              size={28}
              strokeWidth={1.5}
              className="text-violet-600"
            />
          </div>
        </div>

        <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-lg border border-violet-100 bg-white/90 px-3 py-2 shadow-sm backdrop-blur-md">
          <span className="h-2 w-2 animate-pulse rounded-full bg-rose-500" />

          <span className="text-[9px] uppercase tracking-widest text-slate-600">
            Interview simulation
          </span>
        </div>
      </div>
    );
  }

  if (type === "rounds") {
    return (
      <div className="mt-8 space-y-2">
        {[
          ["01", "Introduction"],
          ["02", "Technical round"],
          ["03", "Coding challenge"],
          ["04", "Behavioral round"],
        ].map(([number, label], index) => (
          <div
            key={number}
            className={`flex items-center gap-3 rounded-xl border px-3 py-3 transition-all duration-300 ${
              index === 1
                ? "border-violet-200 bg-violet-50"
                : "border-slate-100 bg-white"
            }`}
          >
            <span
              className={`font-mono text-xs ${
                index === 1 ? "text-violet-600" : "text-slate-400"
              }`}
            >
              {number}
            </span>

            <span
              className={`text-xs ${
                index === 1
                  ? "font-medium text-violet-800"
                  : "text-slate-600"
              }`}
            >
              {label}
            </span>

            {index === 1 && (
              <span className="ml-auto text-[9px] font-semibold tracking-wider text-violet-600">
                READY
              </span>
            )}
          </div>
        ))}
      </div>
    );
  }

  if (type === "insights") {
    return (
      <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-3">
        {[
          { label: "Clarity", value: "Improve", width: "72%" },
          { label: "Confidence", value: "Practice", width: "85%" },
          { label: "Relevance", value: "Refine", width: "65%" },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-violet-100 bg-gradient-to-br from-white to-violet-50/70 p-3 sm:p-4"
          >
            <p className="text-[10px] text-slate-500 sm:text-xs">
              {item.label}
            </p>

            <p className="mt-3 text-xs font-semibold text-slate-800 sm:text-base">
              {item.value}
            </p>

            <div className="mt-4 h-1 overflow-hidden rounded-full bg-violet-100">
              <div
                className="h-full rounded-full bg-violet-500"
                style={{ width: item.width }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-8 flex flex-wrap gap-2">
      {[
        "Learn from mistakes",
        "Build confidence",
        "Improve every attempt",
      ].map((label) => (
        <span
          key={label}
          className="rounded-full border border-violet-100 bg-violet-50/70 px-3 py-2 text-xs text-slate-600 transition-colors duration-300 group-hover:border-violet-200 group-hover:text-violet-800"
        >
          <span className="mr-2 text-violet-500">✳</span>
          {label}
        </span>
      ))}
    </div>
  );
}

function FeatureCard({ feature }) {
  const Icon = feature.icon;

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.025)] transition-all duration-500 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_20px_55px_rgba(124,58,237,0.09)] sm:p-7 lg:p-8 ${feature.className}`}
    >
      {/* Soft hover glow */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-violet-200/0 blur-[80px] transition-all duration-500 group-hover:bg-violet-200/40" />

      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50/70 px-3 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />

          <span className="text-[9px] font-semibold tracking-[0.15em] text-violet-700 sm:text-[10px]">
            {feature.tag}
          </span>
        </div>

        <span className="font-mono text-xs text-slate-400">
          {feature.number}
        </span>
      </div>

      <div className="relative z-10 mt-7 flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 to-purple-100/70 transition-all duration-500 group-hover:rotate-[-6deg] group-hover:scale-110 group-hover:border-violet-200 group-hover:shadow-lg group-hover:shadow-violet-100">
        <Icon
          size={23}
          strokeWidth={1.6}
          className="text-violet-600"
        />
      </div>

      <div className="relative z-10 mt-6">
        <h3 className="max-w-md text-xl font-semibold leading-snug tracking-tight text-slate-900 sm:text-2xl">
          {feature.title}

          {feature.highlight && (
            <>
              {" "}
              <span className="text-violet-600">
                {feature.highlight}
              </span>
            </>
          )}
        </h3>

        <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500 sm:text-[15px]">
          {feature.description}
        </p>
      </div>

      <div className="relative z-10 mt-auto">
        <FeatureVisual type={feature.type} />
      </div>

      <div className="pointer-events-none absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-violet-400/0 to-transparent transition-all duration-500 group-hover:via-violet-400/60" />
    </article>
  );
}

export default function Features() {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-[#f5f3ff] px-5 py-24 sm:px-8 sm:py-28 lg:px-16 lg:py-36"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-violet-100/60 blur-[130px]" />

      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-purple-100/70 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-14 flex flex-col justify-between gap-7 sm:mb-16 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2">
              <Sparkles size={13} className="text-violet-600" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-700">
                The Intervia advantage
              </span>
            </div>

            <h2 className="text-4xl font-semibold leading-[1.1] tracking-[-0.045em] text-slate-900 sm:text-5xl lg:text-7xl">
              Practice with purpose.
              <br />

              <span className="text-violet-600">
                Perform with confidence.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-slate-500 sm:text-base lg:pb-2">
            Your next interview shouldn't be your first real practice.
            Build the skills, sharpen your answers, and show up ready.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard
              key={feature.number}
              feature={feature}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 flex flex-col justify-between gap-6 rounded-[24px] border border-violet-100 bg-gradient-to-r from-white via-violet-50/60 to-purple-50/70 p-6 sm:flex-row sm:items-center sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-violet-200 bg-white shadow-sm">
              <AudioLines
                size={21}
                className="text-violet-600"
              />
            </div>

            <div>
              <p className="text-base font-semibold text-slate-900 sm:text-lg">
                Your next interview starts here.
              </p>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                One practice session can be the beginning of real progress.
              </p>
            </div>
          </div>

          <a
            href="/interview/setup"
            className="group inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-violet-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-200/60 transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-xl hover:shadow-violet-200/70"
          >
            Start your interview

            <ArrowUpRight
              size={17}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>

        {/* Bottom label */}
        <div className="mt-8 flex flex-col gap-2 text-[10px] uppercase tracking-[0.15em] text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:tracking-[0.2em]">
          <span>Built for your next breakthrough</span>

          <span>INTERVIA © 2026</span>
        </div>
      </div>
    </section>
  );
}