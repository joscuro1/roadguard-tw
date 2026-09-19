import { createFileRoute } from "@tanstack/react-router";
import { DownloadPanel } from "@/components/download-panel";
import { Features } from "@/components/features";
import { Hero } from "@/components/hero";
import { PreviewSection } from "@/components/preview-section";
import { ReviewsSection } from "@/components/reviews-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StickyCta } from "@/components/sticky-cta";
import { getBoard } from "@/lib/reviews";

export const Route = createFileRoute("/")({
  loader: () => getBoard(),
  component: Home,
});

function Home() {
  const { reviews, stats } = Route.useLoaderData();

  return (
    <div className="min-h-dvh bg-bg pb-24 text-fg md:pb-0">
      <SiteHeader />
      <main>
        <Hero stats={stats} />
        <Features />
        <PreviewSection />
        <DownloadPanel />
        <ReviewsSection reviews={reviews} stats={stats} />
      </main>
      <SiteFooter />
      <StickyCta />
    </div>
  );
}
