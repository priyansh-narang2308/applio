import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  BarChart3,
  Layers,
} from "lucide-react";

export default function LandingPage({
  onGoToDashboard,
  user,
  onOpenAuth,
  onLogout,
}) {
  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#111111]">
      <header className="sticky top-0 z-40 border-b border-[#E8E0D2] bg-[#F7F5F0]/95 backdrop-blur-xs">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#111111] font-bold text-white text-sm">
              A
            </div>
            <span className="text-xl font-bold tracking-tight text-[#111111]">
              Applio
            </span>
          </div>

          <nav className="flex items-center gap-6">
            <a
              href="#features"
              className="text-sm font-medium text-[#6A665E] hover:text-[#111111]"
            >
              Features
            </a>
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-[#6A665E]">
                  Hi, {user.name}
                </span>
                <button
                  onClick={onGoToDashboard}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#111111] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#262626]"
                >
                  Visit Dashboard
                  <ArrowRight size={15} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={onOpenAuth}
                  className="rounded-lg border border-[#E8E0D2] bg-white px-4 py-2 text-sm font-semibold text-[#111111] hover:border-[#111111]"
                >
                  Sign In
                </button>
                <button
                  onClick={onGoToDashboard}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#111111] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#262626]"
                >
                  Visit Dashboard
                  <ArrowRight size={15} />
                </button>
              </div>
            )}
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#E8E0D2] bg-white px-3 py-1 text-xs font-semibold text-[#6A665E]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#111111]" />
          Minimalist Job Tracker SaaS
        </div>

        <h1 className="mt-8 text-5xl font-extrabold tracking-tight text-[#111111] sm:text-6xl md:text-7xl">
          Every Application. One Place.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-[#6A665E]">
          A clean, focused management tool for tracking your job search
          workflow. Monitor interview schedules, negotiate salary offers, and
          stay in total control.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onGoToDashboard}
            className="inline-flex items-center gap-2 rounded-lg bg-[#111111] px-6 py-3.5 text-base font-semibold text-white transition hover:bg-[#262626]"
          >
            Open Dashboard
            <ArrowRight size={17} />
          </button>
          {!user && (
            <button
              onClick={onOpenAuth}
              className="inline-flex items-center gap-2 rounded-lg border border-[#E8E0D2] bg-white px-6 py-3.5 text-base font-semibold text-[#111111] hover:border-[#111111]"
            >
              Create Free Account
            </button>
          )}
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#948F85]">
            Engineered for Precision
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-[#111111]">
            Everything needed to land your next role
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-[#E8E0D2] bg-white p-7 shadow-xs">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F7F5F0] text-[#111111]">
              <Layers size={20} />
            </div>
            <h3 className="mt-5 text-lg font-bold text-[#111111]">
              Status Workflows
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#6A665E]">
              Track applications effortlessly across Applied, Interview, Offer,
              and Rejected stages with one-click transitions.
            </p>
          </div>

          <div className="rounded-xl border border-[#E8E0D2] bg-white p-7 shadow-xs">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F7F5F0] text-[#111111]">
              <BarChart3 size={20} />
            </div>
            <h3 className="mt-5 text-lg font-bold text-[#111111]">
              Data Aggregation
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#6A665E]">
              Real-time summary metric cards calculating total applications,
              pending interviews, active offers, and conversion rates.
            </p>
          </div>

          <div className="rounded-xl border border-[#E8E0D2] bg-white p-7 shadow-xs">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F7F5F0] text-[#111111]">
              <ShieldCheck size={20} />
            </div>
            <h3 className="mt-5 text-lg font-bold text-[#111111]">
              Fast & Secure
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#6A665E]">
              Zero clutter, clean JWT user authentication, persistent MongoDB
              storage, and lightning-fast search and filtering.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#E8E0D2] bg-white py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#111111] font-bold text-white text-xs">
              A
            </div>
            <span className="font-bold text-sm text-[#111111]">Applio</span>
          </div>
          <p className="text-xs text-[#6A665E]">
            Designed with minimal aesthetics inspired by Linear and Vercel.
          </p>
        </div>
      </footer>
    </div>
  );
}
