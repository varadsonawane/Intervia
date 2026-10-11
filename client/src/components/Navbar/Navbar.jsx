import { useState } from "react";
import {
  AudioLines,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  ArrowUpRight,
  Sparkles,
  Mic,
  FileText,
  MessageCircle,
  BookOpen,
  CircleHelp,
  UserRound,
  Settings,
  LogOut,
} from "lucide-react";

function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const features = [
    {
      title: "AI Mock Interviews",
      description: "Practice with a real-time AI interviewer.",
      icon: Mic,
      href: "#interviews",
    },
    {
      title: "Interview Feedback",
      description: "Discover your strengths and weaknesses.",
      icon: Sparkles,
      href: "#feedback",
    },
    {
      title: "Resume Preparation",
      description: "Prepare for your next opportunity.",
      icon: FileText,
      href: "#resume",
    },
  ];

  const resources = [
    {
      title: "Interview Guides",
      description: "Prepare for common interview questions.",
      icon: BookOpen,
      href: "#guides",
    },
    {
      title: "Communication Practice",
      description: "Improve your interview communication.",
      icon: MessageCircle,
      href: "#communication",
    },
    {
      title: "Help Center",
      description: "Learn how to use Intervia.",
      icon: CircleHelp,
      href: "#help",
    },
  ];

  const closeMenus = () => {
    setActiveDropdown(null);
    setProfileMenuOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6 lg:px-8">
      <nav className="relative mx-auto flex h-[76px] max-w-[1500px] items-center justify-between rounded-full border border-white/80 bg-white/85 px-5 shadow-[0_8px_40px_rgba(55,40,100,0.07)] backdrop-blur-2xl sm:px-8">

        {/* Brand */}
        <a
          href="/"
          onClick={closeMenus}
          className="group flex shrink-0 items-center gap-2.5"
          aria-label="Intervia home"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white shadow-[0_5px_0_#31206f] transition-transform duration-200 group-hover:-translate-y-0.5">
            <AudioLines size={23} strokeWidth={2.3} />
          </div>

          <span className="text-[22px] font-extrabold tracking-[-1.1px] text-slate-900">
            intervia<span className="text-violet-600">.</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">

          {/* Features Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("features")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              type="button"
              onClick={() =>
                setActiveDropdown(
                  activeDropdown === "features" ? null : "features"
                )
              }
              aria-expanded={activeDropdown === "features"}
              className={`flex items-center gap-2 rounded-xl px-4 py-3 text-[15px] font-semibold transition-all duration-200 ${
                activeDropdown === "features"
                  ? "bg-violet-100 text-violet-700"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              Features

              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${
                  activeDropdown === "features" ? "rotate-180" : ""
                }`}
              />
            </button>

            {activeDropdown === "features" && (
              <div className="absolute left-0 top-full w-[330px] pt-3">
                <div className="rounded-2xl border border-slate-200/80 bg-white p-2 shadow-[0_20px_60px_rgba(30,20,70,0.15)]">
                  {features.map((item) => {
                    const Icon = item.icon;

                    return (
                      <a
                        key={item.title}
                        href={item.href}
                        onClick={closeMenus}
                        className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-violet-50"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700 transition-colors group-hover:bg-violet-600 group-hover:text-white">
                          <Icon size={19} />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {item.title}
                          </p>

                          <p className="mt-1 text-xs leading-5 text-slate-500">
                            {item.description}
                          </p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Resources Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("resources")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              type="button"
              onClick={() =>
                setActiveDropdown(
                  activeDropdown === "resources" ? null : "resources"
                )
              }
              aria-expanded={activeDropdown === "resources"}
              className={`flex items-center gap-2 rounded-xl px-4 py-3 text-[15px] font-semibold transition-all duration-200 ${
                activeDropdown === "resources"
                  ? "bg-violet-100 text-violet-700"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              Resources

              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${
                  activeDropdown === "resources" ? "rotate-180" : ""
                }`}
              />
            </button>

            {activeDropdown === "resources" && (
              <div className="absolute left-0 top-full w-[330px] pt-3">
                <div className="rounded-2xl border border-slate-200/80 bg-white p-2 shadow-[0_20px_60px_rgba(30,20,70,0.15)]">
                  {resources.map((item) => {
                    const Icon = item.icon;

                    return (
                      <a
                        key={item.title}
                        href={item.href}
                        onClick={closeMenus}
                        className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-violet-50"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700 transition-colors group-hover:bg-violet-600 group-hover:text-white">
                          <Icon size={19} />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {item.title}
                          </p>

                          <p className="mt-1 text-xs leading-5 text-slate-500">
                            {item.description}
                          </p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <a
            href="#pricing"
            className="rounded-xl px-4 py-3 text-[15px] font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-violet-700"
          >
            Pricing
          </a>

          <a
            href="#contact"
            className="rounded-xl px-4 py-3 text-[15px] font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-violet-700"
          >
            Contact
          </a>
        </div>

        {/* Desktop Actions */}
        <div className="hidden shrink-0 items-center gap-4 lg:flex">
          <a
            href="/login"
            className="text-sm font-semibold text-slate-700 transition-colors hover:text-violet-700"
          >
            Log in
          </a>

          <a
            href="/register"
            className="group flex items-center gap-2 rounded-full bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-violet-600/30"
          >
            Get started
            <ArrowUpRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-800 transition-colors hover:bg-slate-100 lg:hidden"
        >
          {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute left-0 right-0 top-[84px] rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_20px_60px_rgba(30,20,70,0.15)] lg:hidden">
            <div className="flex flex-col gap-1">
              <p className="px-3 pb-2 pt-1 text-xs font-bold uppercase tracking-widest text-slate-400">
                Explore Intervia
              </p>

              {[...features, ...resources].map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.title}
                    href={item.href}
                    onClick={closeMenus}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-violet-50 hover:text-violet-700"
                  >
                    <Icon size={18} />
                    {item.title}
                  </a>
                );
              })}

              <a
                href="#pricing"
                onClick={closeMenus}
                className="rounded-xl px-3 py-3 text-sm font-medium text-slate-700 hover:bg-violet-50"
              >
                Pricing
              </a>

              <a
                href="#contact"
                onClick={closeMenus}
                className="rounded-xl px-3 py-3 text-sm font-medium text-slate-700 hover:bg-violet-50"
              >
                Contact
              </a>

              <div className="mt-2 flex flex-col gap-2 border-t border-slate-100 pt-4">
                <a
                  href="/login"
                  onClick={closeMenus}
                  className="rounded-xl px-4 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Log in
                </a>

                <a
                  href="/register"
                  onClick={closeMenus}
                  className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white hover:bg-violet-700"
                >
                  Get started
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;