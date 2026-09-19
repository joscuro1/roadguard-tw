import { useMemo, useState, type FormEvent } from "react";
import { useRouter } from "@tanstack/react-router";
import { ThumbsUp } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/star-rating";
import { useLang } from "@/components/language-provider";
import { cn } from "@/lib/utils";
import {
  createReview,
  markHelpful,
  type BoardStats,
  type Review,
} from "@/lib/reviews";
import type { ReviewKind } from "@/lib/i18n";

const VOTED_KEY = "rg-helpful";

function readVoted(): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(VOTED_KEY);
    const parsed = raw ? (JSON.parse(raw) as unknown) : [];
    return Array.isArray(parsed) ? parsed.filter((n) => typeof n === "number") : [];
  } catch {
    return [];
  }
}

export function ReviewsSection({
  reviews,
  stats,
}: {
  reviews: Review[];
  stats: BoardStats;
}) {
  const { t, locale } = useLang();
  const router = useRouter();
  const [filter, setFilter] = useState<"all" | ReviewKind>("all");
  const [rating, setRating] = useState(0);
  const [kind, setKind] = useState<ReviewKind>("review");
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [pending, setPending] = useState(false);
  const [voted, setVoted] = useState<number[]>(readVoted);

  const visible = useMemo(
    () => (filter === "all" ? reviews : reviews.filter((r) => r.kind === filter)),
    [filter, reviews],
  );

  const dist = useMemo(() => {
    return [5, 4, 3, 2, 1].map((star) => ({
      star,
      count: reviews.filter((r) => r.rating === star).length,
    }));
  }, [reviews]);
  const distMax = Math.max(1, ...dist.map((d) => d.count));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = body.trim();
    if (rating < 1 || trimmed.length < 12) {
      toast.error(t.required);
      return;
    }
    setPending(true);
    try {
      await createReview({
        data: {
          rating,
          kind,
          body: trimmed,
          displayName: name.trim() || t.nameDefault,
        },
      });
      setBody("");
      setName("");
      setRating(0);
      toast.success(t.submitOk);
      await router.invalidate({ sync: true });
    } catch {
      toast.error(t.submitErr);
    } finally {
      setPending(false);
    }
  }

  async function onHelpful(id: number) {
    if (voted.includes(id)) return;
    const next = [...voted, id];
    setVoted(next);
    window.localStorage.setItem(VOTED_KEY, JSON.stringify(next));
    try {
      await markHelpful({ data: { id } });
      await router.invalidate({ sync: true });
    } catch {
      /* keep optimistic flag */
    }
  }

  const kinds: { id: "all" | ReviewKind; label: string }[] = [
    { id: "all", label: t.filterAll },
    { id: "review", label: t.kindReview },
    { id: "feedback", label: t.kindFeedback },
    { id: "recommendation", label: t.kindIdea },
  ];

  return (
    <section id="reviews" className="scroll-mt-16 border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <p className="text-sm font-medium tracking-wide text-accent">
          {t.reviewsEyebrow}
        </p>
        <h2 className="mt-3 max-w-xl text-xl font-semibold md:text-2xl">
          {t.reviewsTitle}
        </h2>
        <p className="mt-3 max-w-xl text-muted">{t.reviewsBody}</p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="space-y-6">
            <div className="rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)]">
              <p className="text-xs text-subtle">{t.averageLabel}</p>
              <div className="mt-2 flex items-end gap-3">
                <span className="font-display text-4xl font-semibold leading-none tabular-nums">
                  {stats.average.toFixed(1)}
                </span>
                <div className="pb-1">
                  <StarRating value={Math.round(stats.average)} size="sm" />
                  <p className="mt-1 text-xs text-subtle">
                    {stats.reviewCount} {t.ratedBy}
                  </p>
                </div>
              </div>
              <ul className="mt-5 space-y-2">
                {dist.map((row) => (
                  <li key={row.star} className="flex items-center gap-2">
                    <span className="w-3 text-xs tabular-nums text-subtle">
                      {row.star}
                    </span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-raised">
                      <div
                        className="h-full rounded-full bg-accent"
                        style={{ width: `${(row.count / distMax) * 100}%` }}
                      />
                    </div>
                    <span className="w-6 text-right text-xs tabular-nums text-subtle">
                      {row.count}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <form
              onSubmit={onSubmit}
              className="rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)]"
            >
              <h3 className="font-display text-base font-semibold">
                {t.writeTitle}
              </h3>
              <div className="mt-4">
                <Label>{t.yourRating}</Label>
                <div className="-ml-1 mt-1">
                  <StarRating
                    value={rating}
                    onChange={setRating}
                    interactive
                    size="lg"
                    label={t.yourRating}
                  />
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {(
                  [
                    ["review", t.kindReview],
                    ["feedback", t.kindFeedback],
                    ["recommendation", t.kindIdea],
                  ] as const
                ).map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setKind(id)}
                    className={cn(
                      "h-9 rounded-full px-3 text-sm transition-colors duration-150",
                      kind === id
                        ? "bg-fg text-bg"
                        : "bg-raised text-muted hover:text-fg",
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="mt-4 space-y-2">
                <Label htmlFor="display-name">{t.nameLabel}</Label>
                <Input
                  id="display-name"
                  value={name}
                  maxLength={20}
                  placeholder={t.namePlaceholder}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mt-4 space-y-2">
                <Label htmlFor="review-body">{t.bodyLabel}</Label>
                <Textarea
                  id="review-body"
                  value={body}
                  maxLength={400}
                  placeholder={t.bodyPlaceholder}
                  onChange={(e) => setBody(e.target.value)}
                />
                <p className="text-right text-xs tabular-nums text-subtle">
                  {body.trim().length}/400 {t.chars}
                </p>
              </div>
              <Button type="submit" className="mt-2 w-full" disabled={pending}>
                {pending ? t.submitting : t.submit}
              </Button>
            </form>
          </div>

          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              {kinds.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setFilter(item.id)}
                  className={cn(
                    "h-9 rounded-full px-3 text-sm transition-colors duration-150",
                    filter === item.id
                      ? "bg-fg text-bg"
                      : "bg-surface text-muted shadow-[var(--shadow-border)] hover:text-fg",
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
            {visible.length === 0 ? (
              <p className="rounded-2xl bg-surface px-5 py-10 text-center text-sm text-muted shadow-[var(--shadow-border)]">
                {t.empty}
              </p>
            ) : (
              <ul className="space-y-3">
                {visible.map((review) => (
                  <li
                    key={review.id}
                    className="rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium">{review.displayName}</p>
                        <p className="mt-0.5 text-xs text-subtle">
                          {formatAgo(review.createdAt, locale, t)}
                        </p>
                      </div>
                      <KindBadge kind={review.kind} />
                    </div>
                    <div className="mt-3">
                      <StarRating value={review.rating} size="sm" />
                    </div>
                    <p className="mt-3 text-sm text-muted">{review.body}</p>
                    <button
                      type="button"
                      onClick={() => void onHelpful(review.id)}
                      disabled={voted.includes(review.id)}
                      className={cn(
                        "mt-4 inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-xs text-muted transition-colors duration-150",
                        voted.includes(review.id)
                          ? "text-accent"
                          : "hover:bg-raised hover:text-fg",
                      )}
                    >
                      <ThumbsUp className="size-3.5" />
                      {t.helpful}
                      <span className="tabular-nums">{review.helpful}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function KindBadge({ kind }: { kind: ReviewKind }) {
  const { t } = useLang();
  const label =
    kind === "feedback"
      ? t.kindFeedback
      : kind === "recommendation"
        ? t.kindIdea
        : t.kindReview;
  return <Badge variant={kind === "feedback" ? "accent" : "muted"}>{label}</Badge>;
}

function formatAgo(
  iso: string,
  locale: "zh" | "en",
  t: ReturnType<typeof useLang>["t"],
) {
  const delta = Date.now() - new Date(iso).getTime();
  const mins = Math.max(0, Math.round(delta / 60000));
  if (mins < 2) return t.justNow;
  if (mins < 60) {
    return locale === "zh" ? `${mins} ${t.minutesAgo}` : `${mins}${t.minutesAgo}`;
  }
  const hours = Math.round(mins / 60);
  if (hours < 24) {
    return locale === "zh" ? `${hours} ${t.hoursAgo}` : `${hours}${t.hoursAgo}`;
  }
  const days = Math.round(hours / 24);
  return locale === "zh" ? `${days} ${t.daysAgo}` : `${days}${t.daysAgo}`;
}
