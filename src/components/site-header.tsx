import { Link } from "@tanstack/react-router";

const navItems = [
  { label: "Home", mobileLabel: "Home", to: "/" as const, exact: true },
  { label: "Leadership", mobileLabel: "Leaders", to: "/leadership" as const },
  { label: "Recruitment", mobileLabel: "Recruit", to: "/recruitment" as const },
  { label: "Merch", mobileLabel: "Merch", to: "/merch" as const },
  { label: "Contact Info", mobileLabel: "Contact", to: "/contact" as const },
];

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 bottom-3 z-50 px-3 md:bottom-auto md:top-4 md:px-6">
      <nav
        aria-label="Primary navigation"
        className="glass-nav mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-3 rounded-2xl border border-border px-3 py-2 shadow-nav md:min-h-14 md:px-4"
      >
        <Link to="/" aria-label="LIPS Family home" className="hidden items-center gap-2 md:flex">
          <span className="grid size-8 place-items-center rounded-md border border-primary/40 bg-primary/15 font-display text-sm font-black text-primary">
            L
          </span>
          <span className="font-display text-base font-black text-foreground">LIPS</span>
        </Link>
        <div className="grid w-full grid-cols-5 items-center gap-1 md:flex md:w-auto md:gap-2">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={item.exact ? { exact: true } : undefined}
              className="min-w-0 rounded-lg px-1 py-2 text-center text-[10px] font-semibold uppercase text-muted-foreground transition-colors hover:bg-surface hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:px-3 md:text-xs"
              activeProps={{ className: "bg-primary/12 text-primary" }}
            >
              <span className="md:hidden">{item.mobileLabel}</span>
              <span className="hidden md:inline">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}