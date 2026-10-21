import { createFileRoute, ClientOnly } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
const Scene3D = lazy(() => import("@/components/portfolio/Scene3D"));
import { Hero } from "@/components/portfolio/Hero";
import { About, Contact, Cursor, Nav, Process, Services, Skills, Work, useScrollAnimations } from "@/components/portfolio/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Busthana Shirin — Digital Marketing Strategist, Calicut" },
      { name: "description", content: "Portfolio of Busthana Shirin, a digital marketer and creative thinker from Calicut specialising in SEO, Google Ads, Meta Ads and branding." },
      { property: "og:title", content: "Busthana Shirin — Digital Marketing Strategist" },
      { property: "og:description", content: "SEO, performance marketing, social media and branding that help businesses grow." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useScrollAnimations();
  return (
    <main className="overflow-x-clip">
      <ClientOnly>
        <Suspense fallback={null}>
          <div className="pointer-events-none fixed inset-0 z-30">
            <Scene3D />
          </div>
        </Suspense>
      </ClientOnly>
      <Cursor />
      <Nav />
      <Hero />
      <About />
      <Services />
      <Work />
      <Skills />
      <Process />
      <Contact />
    </main>
  );
}
