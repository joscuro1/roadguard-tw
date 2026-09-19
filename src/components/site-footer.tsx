import { Link } from "@tanstack/react-router";
import { Wordmark } from "@/components/logo";
import { useLang } from "@/components/language-provider";

export function SiteFooter() {
  const { t } = useLang();
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Wordmark />
          <p className="mt-2 text-sm text-muted">{t.footerTag}</p>
        </div>
        <div className="flex flex-col items-start gap-2 sm:items-end">
          <Link
            to="/deploy"
            className="text-sm text-muted transition-colors duration-150 hover:text-fg"
          >
            {t.footerDeploy}
          </Link>
          <p className="text-xs text-subtle">{t.footerNote}</p>
        </div>
      </div>
    </footer>
  );
}
