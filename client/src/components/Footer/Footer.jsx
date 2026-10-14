import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  GitFork,
  Mail,
  Sparkles,
  Heart,
  MoveUpRight,
} from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Features", href: "/#features" },
    { label: "How it works", href: "/#how-it-works" },
    { label: "Start an interview", href: "/interview/setup" },
    { label: "Pricing", href: "/#pricing" },
  ],
  Resources: [
    { label: "Interview preparation", href: "/#features" },
    { label: "Practice interviews", href: "/interview/setup" },
    { label: "FAQs", href: "/#faq" },
  ],
  Company: [
    { label: "About Intervia", href: "/#about" },
    { label: "Contact", href: "mailto:hello@intervia.ai" },
  ],
};

function FooterLink({ label, href }) {
  return (
    <a
      href={href}
      className="group inline-flex w-fit items-center gap-1.5 text-sm text-slate-500 transition-colors duration-300 hover:text-violet-700"
    >
      <span>{label}</span>

      <ArrowUpRight
        size={13}
        className="opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
      />
    </a>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-white">

      {/* Top decorative border */}
      <div className="h-px  w-full bg-gradient-to-r from-transparent via-violet-300  to-transparent" />

      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 top-40 h-72 w-72 rounded-full bg-violet-100/60 blur-[110px]" />

      <div className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full bg-purple-100/60 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

        {/* ================= CTA SECTION ================= */}

        <div className="relative overflow-hidden rounded-[32px] border border-violet-200/70 bg-[#f5f3ff] px-6 top-10  py-12 sm:px-10 sm:py-14 lg:px-16 lg:py-16">

          {/* CTA background effects */}
          <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full border border-violet-200/70" />

          <div className="pointer-events-none absolute -right-4 -top-12 h-52 w-52 rounded-full border border-dashed border-violet-300/80 animate-[spin_45s_linear_infinite]" />

          <div className="pointer-events-none absolute right-20 top-12 h-32 w-32 rounded-full bg-violet-300/30 blur-3xl" />

          <div className="relative z-10 flex flex-col justify-between gap-10 lg:flex-row lg:items-center">

            {/* CTA text */}
            <div className="max-w-2xl">

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-4 py-2 shadow-sm">
                <Sparkles size={14} className="text-violet-600" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-700">
                  Your next chapter starts here
                </span>
              </div>

              <h2 className="text-3xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Your dream job
                <br />

                <span className="text-violet-600">
                  deserves your best.
                </span>
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-7 text-slate-600 sm:text-base">
                Stop wondering whether you're ready. Practice with AI,
                improve your answers, and walk into your next interview
                with confidence.
              </p>

            </div>

            {/* CTA button */}
            <div className="relative z-10 flex shrink-0 flex-col items-start gap-4 lg:items-center">

              <a
                href="/interview/setup"
                className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-violet-600 px-7 py-4 text-sm font-semibold text-white shadow-xl shadow-violet-200/70 transition-all duration-300 hover:-translate-y-1 hover:bg-violet-700 hover:shadow-2xl hover:shadow-violet-300/60"
              >
                Start practicing

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>

              <p className="flex items-center gap-2 text-xs text-slate-500">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />

                Your next interview starts with one practice session.
              </p>

            </div>

          </div>

        </div>

        {/* ================= MAIN FOOTER ================= */}

        <div className="grid grid-cols-1 gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-10 lg:py-20">

          {/* Brand column */}
          <div className="lg:col-span-4">

            <a href="/" className="group inline-flex items-center gap-3">

              <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-violet-600 text-white shadow-lg shadow-violet-200 transition-all duration-300 group-hover:-rotate-6 group-hover:scale-105">
                <BrainCircuit size={27} strokeWidth={1.7} />

                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/25" />
              </div>

              <div>
                <span className="block text-2xl font-bold tracking-tight text-slate-900">
                  Intervia<span className="text-violet-600">.</span>
                </span>

                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400">
                  Interview smarter
                </span>
              </div>

            </a>

            <p className="mt-6 max-w-sm text-sm leading-7 text-slate-500">
              Your personal AI interview partner. Practice real
              conversations, sharpen your thinking, and build the
              confidence to perform at your best.
            </p>

            {/* Brand badge */}
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50/70 px-3 py-2">
              <Sparkles size={13} className="text-violet-600" />

              <span className="text-xs font-medium text-violet-800">
                Built for your next breakthrough
              </span>
            </div>

          </div>

          {/* Navigation links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5 lg:col-start-6">

            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>

                <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.16em] text-slate-900">
                  {title}
                </h3>

                <div className="flex flex-col items-start gap-4">
                  {links.map((link) => (
                    <FooterLink
                      key={link.label}
                      label={link.label}
                      href={link.href}
                    />
                  ))}
                </div>

              </div>
            ))}

          </div>

        </div>

        {/* ================= NEWSLETTER-STYLE CTA ================= */}

        <div className="flex flex-col justify-between gap-5 border-t border-slate-100 py-8 sm:flex-row sm:items-center">

          <div>
            <p className="text-sm font-semibold text-slate-900">
              Every great career starts with preparation.
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Make your next interview count.
            </p>
          </div>

          <a
            href="/interview/setup"
            className="group inline-flex w-fit items-center gap-2 rounded-full border border-violet-200 bg-violet-50/70 px-5 py-3 text-sm font-semibold text-violet-700 transition-all duration-300 hover:border-violet-300 hover:bg-violet-100"
          >
            Practice with AI

            <MoveUpRight
              size={15}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>

        </div>

        {/* ================= BOTTOM BAR ================= */}

        <div className="flex flex-col gap-5 border-t border-slate-100 py-7 sm:flex-row sm:items-center sm:justify-between">

          {/* Copyright */}
          <p className="text-xs text-slate-500">
            © {currentYear} Intervia. All rights reserved.
          </p>

          {/* Made with love */}
          <p className="flex items-center gap-1.5 text-xs text-slate-500">
            Crafted with

            <Heart
              size={13}
              className="fill-violet-500 text-violet-500"
            />

            for your next big opportunity.
          </p>

          {/* Social links */}
          <div className="flex items-center gap-3">

            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
            >
              <GitFork size={17} />
            </a>

            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
            >
              <svg
  xmlns="http://www.w3.org/2000/svg"
  width="17"
  height="17"
  viewBox="0 0 24 24"
  fill="currentColor"
  aria-hidden="true"
>
  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14ZM8 10H5v9h3v-9ZM6.5 5.5a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5ZM19 13.5c0-2.7-1.44-3.95-3.36-3.95A3.1 3.1 0 0 0 13 10.9V10h-3v9h3v-4.5c0-1.19.23-2.34 1.7-2.34 1.45 0 1.47 1.36 1.47 2.42V19H19v-5.5Z" />
</svg>
            </a>

            <a
              href="mailto:hello@intervia.ai"
              aria-label="Email Intervia"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
            >
              <Mail size={17} />
            </a>

          </div>

        </div>

      </div>

    </footer>
  );
}