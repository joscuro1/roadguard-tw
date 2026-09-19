import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PhoneSpeed } from "@/components/phone-frame";
import { StarRating } from "@/components/star-rating";
import { useLang } from "@/components/language-provider";
import { formatCount } from "@/lib/utils";
import type { BoardStats } from "@/lib/reviews";

export function Hero({ stats }: { stats: BoardStats }) {
  const { t } = useLang();
  const average = stats.reviewCount === 0 ? 0 : stats.average;

  return (
    <section id="top" className="relative overflow-hidden">
      <img
        src="/images/hero-highway.jpg"
        alt=""
        className="media absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-b from-bg/55 via-bg/80 to-bg" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pt-12 pb-16 md:grid-cols-2 md:pt-20 md:pb-24">
        <div className="stagger-in max-w-xl">
          <p className="text-sm font-medium tracking-wide text-accent">
            {t.heroKicker}
          </p>
          <h1 className="mt-3 text-3xl font-semibold">{t.heroTitle}</h1>
          <p className="mt-4 text-base text-muted">{t.heroBody}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-full bg-surface px-3 py-2 shadow-[var(--shadow-border)]">
              <StarRating value={Math.round(average)} size="sm" />
              <span className="font-display text-sm font-semibold tabular-nums">
                {average.toFixed(1)}
              </span>
              <span className="text-xs text-subtle">
                {stats.reviewCount} {t.ratedBy}
              </span>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href="#download">
                <Download />
                {t.ctaDownload}
              </a>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <a href="#reviews">{t.ctaReview}</a>
            </Button>
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-3">
            <Stat value={formatCount(stats.downloads)} label={t.downloads} />
            <Stat
              value={average.toFixed(1)}
              label={t.averageLabel}
            />
            <Stat value={t.camerasValue} label={t.cameras} />
          </dl>
        </div>
        <div className="mx-auto w-full max-w-xs">
          <PhoneSpeed />
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="text-xs text-subtle">{label}</dt>
      <dd className="font-display text-xl font-semibold tabular-nums">{value}</dd>
    </div>
  );
}
