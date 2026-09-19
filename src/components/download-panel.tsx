import { Download } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useLang } from "@/components/language-provider";
import { APP } from "@/lib/app-meta";
import { recordDownload } from "@/lib/reviews";

export function DownloadPanel() {
  const { t } = useLang();

  async function onDownload() {
    try {
      await recordDownload();
    } catch {
      /* still let the file download */
    }
  }

  function onSoon() {
    toast(t.comingSoon);
  }

  return (
    <section id="download" className="scroll-mt-16 border-t border-border">
      <div className="mx-auto grid max-w-6xl items-stretch gap-8 px-4 py-16 md:grid-cols-2 md:py-24">
        <div className="overflow-hidden rounded-2xl bg-surface shadow-[var(--shadow-border)]">
          <img
            src="/images/dash-phone.jpg"
            alt=""
            className="media h-full min-h-64 w-full object-cover"
          />
        </div>
        <div className="flex flex-col rounded-2xl bg-surface p-6 shadow-[var(--shadow-border)] md:p-8">
          <p className="text-sm font-medium tracking-wide text-accent">
            {t.downloadEyebrow}
          </p>
          <h2 className="mt-3 text-xl font-semibold md:text-2xl">
            {t.downloadTitle}
          </h2>
          <p className="mt-3 text-muted">{t.downloadBody}</p>

          <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl bg-raised p-3">
              <dt className="text-xs text-subtle">{t.version}</dt>
              <dd className="font-display font-semibold tabular-nums">
                {APP.version}
              </dd>
            </div>
            <div className="rounded-xl bg-raised p-3">
              <dt className="text-xs text-subtle">{t.requires}</dt>
              <dd className="font-medium">{t.androidReq}</dd>
            </div>
          </dl>
          <p className="mt-3 text-xs text-subtle">{t.packageNote}</p>

          <div className="mt-6 flex flex-col gap-3">
            <Button asChild size="lg">
              <a
                href={APP.apkHref}
                download={APP.apkFileName}
                onClick={() => void onDownload()}
              >
                <Download />
                {t.downloadApk}
              </a>
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <Button type="button" variant="secondary" onClick={onSoon}>
                {t.downloadPlay}
              </Button>
              <Button type="button" variant="secondary" onClick={onSoon}>
                {t.downloadIos}
              </Button>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-xs font-medium tracking-wide text-subtle">
              {t.changelogTitle}
            </p>
            <ul className="mt-3 space-y-2">
              {t.changelog.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-muted">
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
