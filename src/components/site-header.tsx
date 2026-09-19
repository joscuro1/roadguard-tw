import { Link } from "@tanstack/react-router";
import { Wordmark } from "@/components/logo";
import { useLang } from "@/components/language-provider";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const { t, locale, setLocale } = useLang();

  const links = [
    { to: "/", hash: "features", label: t.navFeatures },
    { to: "/", hash: "preview", label: t.navPreview },
    { to: "/", hash: "download", label: t.navDownload },
    { to: "/", hash: "reviews", label: t.navReviews },
  ] as const;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4">
        <Link to="/" aria-label="RoadGuard TW" className="shrink-0">
          <Wordmark />
        </Link>
        <nav className="hidden items-center gap-5 md:flex">
          {links.map((link) => (
            <Link
              key={link.hash}
              to={link.to}
              hash={link.hash}
              className="text-sm text-muted transition-colors duration-150 hover:text-fg"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            to="/deploy"
            className="px-2 text-sm text-muted transition-colors duration-150 hover:text-fg"
          >
            {t.navDeploy}
          </Link>
          <div className="flex items-center rounded-full bg-raised p-1 shadow-[var(--shadow-border)]">
            <LangBtn
              active={locale === "zh"}
              onClick={() => setLocale("zh")}
              label="繁"
            />
            <LangBtn
              active={locale === "en"}
              onClick={() => setLocale("en")}
              label="EN"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

function LangBtn({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-8 min-w-10 rounded-full px-2.5 text-xs font-medium transition-colors duration-150",
        active ? "bg-fg text-bg" : "text-muted hover:text-fg",
      )}
    >
      {label}
    </button>
  );
}
