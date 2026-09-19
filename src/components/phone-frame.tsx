import { type ReactNode } from "react";
import { Camera, MapPin, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLang } from "@/components/language-provider";

function Bezel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-device bg-raised p-2 shadow-[var(--shadow-device)]",
        className,
      )}
    >
      <div className="relative overflow-hidden rounded-bezel bg-bg">
        <div className="absolute top-2 left-1/2 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-raised" />
        <div className="aspect-phone min-h-0">{children}</div>
      </div>
    </div>
  );
}

export function PhoneSpeed({ className }: { className?: string }) {
  const { t } = useLang();
  return (
    <Bezel className={className}>
      <div className="flex h-full flex-col items-center px-5 pt-10 pb-6">
        <p className="text-xs font-medium tracking-wide text-subtle">
          {t.phoneRoad}
        </p>
        <div className="relative mt-8 flex size-44 items-center justify-center">
          <svg viewBox="0 0 120 120" className="absolute inset-0 text-accent" aria-hidden="true">
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke="currentColor"
              className="text-raised"
              strokeWidth="10"
            />
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray="215 327"
              transform="rotate(-90 60 60)"
            />
          </svg>
          <div className="relative flex flex-col items-center">
            <span className="font-display text-5xl font-semibold leading-none tabular-nums">
              72
            </span>
            <span className="mt-1 text-xs text-muted">{t.phoneSpeed}</span>
          </div>
        </div>
        <div className="mt-auto grid w-full grid-cols-2 gap-2">
          <div className="rounded-xl bg-raised px-3 py-3">
            <p className="text-xs text-subtle">{t.phoneLimit}</p>
            <p className="font-display text-xl font-semibold tabular-nums">
              110
            </p>
          </div>
          <div className="rounded-xl bg-raised px-3 py-3">
            <p className="text-xs text-subtle">GPS</p>
            <p className="font-display text-xl font-semibold tabular-nums">
              4.8
            </p>
          </div>
        </div>
      </div>
    </Bezel>
  );
}

export function PhoneAlert({ className }: { className?: string }) {
  const { t } = useLang();
  return (
    <Bezel className={className}>
      <div className="flex h-full flex-col items-center px-5 pt-12 pb-6 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-warn/15 text-warn">
          <Shield className="size-7" strokeWidth={1.6} />
        </div>
        <p className="mt-5 font-display text-2xl font-semibold">{t.phoneAlert}</p>
        <p className="mt-2 text-sm text-muted">{t.phoneAlertMeta}</p>
        <p className="mt-6 font-display text-5xl font-semibold tabular-nums leading-none">
          200
          <span className="ml-1 text-lg text-muted">m</span>
        </p>
        <div className="mt-auto flex w-full items-center justify-between rounded-xl bg-raised px-4 py-3 text-left">
          <div>
            <p className="text-xs text-subtle">{t.phoneSpeed}</p>
            <p className="font-display text-lg font-semibold tabular-nums">68</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-subtle">{t.phoneLimit}</p>
            <p className="font-display text-lg font-semibold tabular-nums">60</p>
          </div>
        </div>
      </div>
    </Bezel>
  );
}

export function PhoneNearby({ className }: { className?: string }) {
  const { t } = useLang();
  return (
    <Bezel className={className}>
      <div className="flex h-full flex-col px-4 pt-10 pb-5">
        <div className="mb-4 flex items-center gap-2 px-1">
          <Camera className="size-4 text-accent" />
          <p className="text-sm font-medium">{t.phoneNearby}</p>
        </div>
        <ul className="flex flex-col gap-2">
          {t.nearby.map((item) => (
            <li
              key={item.name}
              className="flex items-center gap-3 rounded-xl bg-raised px-3 py-3"
            >
              <MapPin className="size-4 shrink-0 text-accent" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{item.name}</p>
                <p className="text-xs text-subtle">{item.dist}</p>
              </div>
              <span className="font-display text-sm tabular-nums text-muted">
                {item.limit}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Bezel>
  );
}
