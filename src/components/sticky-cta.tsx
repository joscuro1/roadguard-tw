import { Download, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/components/language-provider";

export function StickyCta() {
  const { t } = useLang();
  return (
    <div className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg p-3 md:hidden">
      <div className="mx-auto flex max-w-lg gap-2">
        <Button asChild className="flex-1">
          <a href="#download">
            <Download />
            {t.stickyDownload}
          </a>
        </Button>
        <Button asChild variant="secondary" className="flex-1">
          <a href="#reviews">
            <Star />
            {t.stickyRate}
          </a>
        </Button>
      </div>
    </div>
  );
}
