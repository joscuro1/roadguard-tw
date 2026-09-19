import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Check,
  Copy,
  Globe,
  ShieldCheck,
  Timer,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useLang } from "@/components/language-provider";
import { cn } from "@/lib/utils";

const LINKS = {
  dash: "https://dash.cloudflare.com/?to=/:account/workers-and-pages",
  docs: "https://developers.cloudflare.com/pages/get-started/git-integration/",
  domain: "https://developers.cloudflare.com/pages/configuration/custom-domains/",
  repo: "https://repo.new",
} as const;

export function DeployGuide() {
  const { t } = useLang();

  return (
    <section className="mx-auto max-w-3xl px-4 py-12 md:py-16">
      <p className="text-sm font-medium tracking-wide text-accent">
        {t.deployKicker}
      </p>
      <h1 className="mt-3 text-3xl font-semibold">{t.deployTitle}</h1>
      <p className="mt-4 text-muted">{t.deployBody}</p>

      <dl className="mt-8 grid grid-cols-3 gap-2">
        <Fact label={t.deployTime} icon={Timer} />
        <Fact label={t.deployPrice} icon={Globe} />
        <Fact label={t.deploySsl} icon={ShieldCheck} />
      </dl>

      <div className="mt-10 rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)] md:p-6">
        <h2 className="font-display text-base font-semibold">
          {t.deployNeedTitle}
        </h2>
        <ol className="mt-4 space-y-3">
          {t.deployNeed.map((item, i) => (
            <li key={item} className="flex gap-3 text-sm text-muted">
              <span className="font-display w-6 shrink-0 tabular-nums text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              {item}
            </li>
          ))}
        </ol>
      </div>

      <h2 className="mt-12 font-display text-xl font-semibold">
        {t.deployGitTitle}
      </h2>
      <ol className="mt-6 space-y-3">
        {t.deploySteps.map((step, i) => (
          <li
            key={step.title}
            className="rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)]"
          >
            <p className="font-display text-xs tabular-nums tracking-wide text-accent">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-2 font-display text-base font-semibold">
              {step.title}
            </h3>
            <p className="mt-2 text-sm text-muted">{step.body}</p>
          </li>
        ))}
      </ol>

      <div className="mt-8 rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)] md:p-6">
        <h2 className="font-display text-base font-semibold">
          {t.deployBuildTitle}
        </h2>
        <ul className="mt-4 divide-y divide-border">
          {t.deployBuild.map((row) => (
            <BuildRow key={row.key} label={row.key} value={row.value} />
          ))}
        </ul>
      </div>

      <div className="mt-8 grid gap-3 md:grid-cols-2">
        <aside className="rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)]">
          <h2 className="font-display text-base font-semibold">
            {t.deployDirectTitle}
          </h2>
          <p className="mt-2 text-sm text-muted">{t.deployDirectBody}</p>
        </aside>
        <aside className="rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)]">
          <h2 className="font-display text-base font-semibold">
            {t.deployReviewTitle}
          </h2>
          <p className="mt-2 text-sm text-muted">{t.deployReviewBody}</p>
        </aside>
      </div>

      <h2 className="mt-12 font-display text-base font-semibold">
        {t.deployLinksTitle}
      </h2>
      <div className="mt-4 flex flex-col gap-3">
        <Button asChild size="lg">
          <a href={LINKS.dash} target="_blank" rel="noreferrer">
            {t.deployOpenDash}
            <ArrowUpRight />
          </a>
        </Button>
        <div className="grid gap-3 sm:grid-cols-3">
          <Button asChild variant="secondary">
            <a href={LINKS.docs} target="_blank" rel="noreferrer">
              {t.deployOpenDocs}
            </a>
          </Button>
          <Button asChild variant="secondary">
            <a href={LINKS.domain} target="_blank" rel="noreferrer">
              {t.deployOpenDomain}
            </a>
          </Button>
          <Button asChild variant="secondary">
            <a href={LINKS.repo} target="_blank" rel="noreferrer">
              {t.deployOpenRepo}
            </a>
          </Button>
        </div>
        <Button asChild variant="ghost">
          <Link to="/">{t.deployHome}</Link>
        </Button>
      </div>
    </section>
  );
}

function Fact({
  label,
  icon: Icon,
}: {
  label: string;
  icon: typeof Timer;
}) {
  return (
    <div className="rounded-xl bg-surface px-3 py-3 shadow-[var(--shadow-border)]">
      <Icon className="size-4 text-accent" strokeWidth={1.7} />
      <dd className="mt-2 text-xs font-medium">{label}</dd>
    </div>
  );
}

function BuildRow({ label, value }: { label: string; value: string }) {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success(t.deployCopied);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error(value);
    }
  }

  return (
    <li className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
      <div className="min-w-0">
        <p className="text-xs text-subtle">{label}</p>
        <p className="font-display text-sm font-medium">{value}</p>
      </div>
      <button
        type="button"
        onClick={() => void copy()}
        className={cn(
          "relative flex size-11 shrink-0 items-center justify-center rounded-lg text-muted transition-colors duration-150 hover:bg-raised hover:text-fg",
        )}
        aria-label={t.deployCopy}
      >
        <span
          className={cn(
            "absolute inset-0 flex items-center justify-center transition-[opacity,transform,filter] duration-200",
            copied ? "scale-100 opacity-100 blur-none" : "scale-[0.25] opacity-0 blur-sm",
          )}
        >
          <Check className="size-4 text-accent" />
        </span>
        <span
          className={cn(
            "flex items-center justify-center transition-[opacity,transform,filter] duration-200",
            copied ? "scale-[0.25] opacity-0 blur-sm" : "scale-100 opacity-100 blur-none",
          )}
        >
          <Copy className="size-4" />
        </span>
      </button>
    </li>
  );
}
