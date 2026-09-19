import { Camera, Gauge, MapPinned, Moon, Radio, Users } from "lucide-react";
import { useLang } from "@/components/language-provider";

const ICONS = {
  cameras: Camera,
  speed: Gauge,
  tw: MapPinned,
  night: Moon,
  buffer: Radio,
  community: Users,
} as const;

export function Features() {
  const { t } = useLang();

  return (
    <section id="features" className="scroll-mt-16 border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <p className="text-sm font-medium tracking-wide text-accent">
          {t.featureEyebrow}
        </p>
        <h2 className="mt-3 max-w-lg text-xl font-semibold md:text-2xl">
          {t.featureTitle}
        </h2>
        <p className="mt-3 max-w-xl text-muted">{t.featureBody}</p>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {t.features.map((feature) => {
            const Icon = ICONS[feature.key as keyof typeof ICONS];
            return (
              <li
                key={feature.key}
                className="rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)]"
              >
                <div className="flex size-10 items-center justify-center rounded-lg bg-raised text-accent">
                  <Icon className="size-4" strokeWidth={1.7} />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{feature.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
