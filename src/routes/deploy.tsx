import { createFileRoute } from "@tanstack/react-router";
import { DeployGuide } from "@/components/deploy-guide";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/deploy")({
  head: () => ({
    meta: [
      { title: "Cloudflare Pages · RoadGuard TW" },
      {
        name: "description",
        content: "Free Cloudflare Pages deploy guide for the RoadGuard TW website.",
      },
    ],
  }),
  component: DeployPage,
});

function DeployPage() {
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <SiteHeader />
      <main>
        <DeployGuide />
      </main>
      <SiteFooter />
    </div>
  );
}
