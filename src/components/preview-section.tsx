import { PhoneAlert, PhoneNearby } from "@/components/phone-frame";
import { useLang } from "@/components/language-provider";

export function PreviewSection() {
  const { t } = useLang();

  return (
    <section id="preview" className="scroll-mt-16 border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <p className="text-sm font-medium tracking-wide text-accent">
          {t.previewEyebrow}
        </p>
        <h2 className="mt-3 max-w-lg text-xl font-semibold md:text-2xl">
          {t.previewTitle}
        </h2>
        <p className="mt-3 max-w-xl text-muted">{t.previewBody}</p>
        <div className="mt-12 grid items-end gap-8 sm:grid-cols-2">
          <div className="mx-auto w-full max-w-xs">
            <PhoneAlert />
          </div>
          <div className="mx-auto w-full max-w-xs">
            <PhoneNearby />
          </div>
        </div>
      </div>
    </section>
  );
}
