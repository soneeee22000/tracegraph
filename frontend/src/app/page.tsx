import { Nav } from "@/components/landing/nav";
import { Hero } from "@/components/landing/hero";
import { TrustBelt } from "@/components/landing/trust-belt";
import { ProblemSolution } from "@/components/landing/problem-solution";
import { MetricsBar } from "@/components/landing/metrics-bar";
import { FeaturesBento } from "@/components/landing/features-bento";
import { HowItWorks } from "@/components/landing/how-it-works";
import { CodeExample } from "@/components/landing/code-example";
import { Architecture } from "@/components/landing/architecture";
import { TechStack } from "@/components/landing/tech-stack";
import { UseCases } from "@/components/landing/use-cases";
import { FinalCTA } from "@/components/landing/final-cta";
import { Footer } from "@/components/landing/footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#09090b]">
      <Nav />
      <Hero />
      <TrustBelt />
      <ProblemSolution />
      <MetricsBar />
      <FeaturesBento />
      <HowItWorks />
      <CodeExample />
      <Architecture />
      <TechStack />
      <UseCases />
      <FinalCTA />
      <Footer />
    </main>
  );
}
