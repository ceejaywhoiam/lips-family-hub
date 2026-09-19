import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

const navItems = [
  { label: "Home", mobileLabel: "Home", to: "/" as const, exact: true },
  { label: "Leadership", mobileLabel: "Leaders", to: "/leadership" as const },
  { label: "Recruitment", mobileLabel: "Recruit", to: "/recruitment" as const },
  { label: "Merch", mobileLabel: "Merch", to: "/merch" as const },
  { label: "Contact Info", mobileLabel: "Contact", to: "/contact" as const },
];

export function SiteHeader() {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => setSignedIn(Boolean(data.session)));
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setSignedIn(Boolean(session));
    });
    return () => data.subscription.unsubscribe();
  }, []);

  return (
    <header className="fixed inset-x-0 bottom-0 z-50 px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 md:bottom-auto md:top-4 md:px-6 md:pb-0 md:pt-0">
      <nav
        aria-label="Primary navigation"
        className="glass-nav mx-auto flex max-w-6xl flex-col gap-2 rounded-2xl border border-border px-3 py-3 shadow-nav md:min-h-14 md:flex-row md:items-center md:justify-between md:gap-3 md:px-4 md:py-2"
      >
        <Link to="/" aria-label="LIPS Family home" className="hidden items-center gap-2 md:flex">
          <span className="grid size-8 place-items-center rounded-md border border-primary/40 bg-primary/15 font-display text-sm font-black text-primary">
            L
          </span>
          <span className="font-display text-base font-black text-foreground">LIPS</span>
        </Link>
        <div className="grid w-full flex-1 grid-cols-5 items-center gap-1 sm:gap-2 md:w-auto md:flex md:justify-center">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.exact === true }}
              className="flex min-h-11 min-w-0 items-center justify-center rounded-lg px-1 py-2 text-center text-[11px] leading-tight font-semibold uppercase text-muted-foreground transition-colors hover:bg-surface hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-2 sm:text-xs md:min-h-10 md:px-3"
              activeProps={{ className: "bg-primary/12 text-primary" }}
            >
              <span className="md:hidden">{item.mobileLabel}</span>
              <span className="hidden md:inline">{item.label}</span>
            </Link>
          ))}
        </div>
        <Link
          to={signedIn ? "/inbox" : "/auth"}
          className="flex min-h-11 w-full shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 text-xs font-semibold uppercase text-primary transition-colors hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:min-h-10 md:w-auto"
        >
          {signedIn ? "Inbox" : "Staff"}
        </Link>
      </nav>
    </header>
  );
}
