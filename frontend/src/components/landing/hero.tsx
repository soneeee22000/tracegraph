import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroGraph } from "./hero-graph";
import { GitHubIcon } from "@/components/icons";

export function Hero() {
  return (
    <section className="relative min-h-screen pt-40 pb-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 hero-glow pointer-events-none" />
      <div className="absolute inset-0 noise-bg pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Eyebrow badge */}
        <div
          className="flex justify-center mb-8 animate-fade-in-up"
          style={{ animationDelay: "0ms" }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono text-[#6366f1] bg-[rgba(99,102,241,0.08)] border border-[rgba(99,102,241,0.2)]">
            <span className="size-1.5 rounded-full bg-[#6366f1] animate-pulse" />
            Open Source · GraphRAG · MIT License
          </span>
        </div>

        {/* Headline */}
        <h1
          className="text-center text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#fafafa] max-w-4xl mx-auto leading-[1.05] animate-fade-in-up"
          style={{ animationDelay: "100ms" }}
        >
          <span className="text-balance">
            If you can&apos;t trace it,
            <br />
            you can&apos;t trust it.
          </span>
        </h1>

        {/* Subheadline */}
        <p
          className="text-center text-lg sm:text-xl text-[#a1a1aa] max-w-2xl mx-auto mt-6 leading-relaxed animate-fade-in-up"
          style={{ animationDelay: "200ms" }}
        >
          TraceGraph is a GraphRAG citation explorer that grounds every AI
          answer in a verifiable knowledge graph. See the entities, follow the
          relationships, trace the truth.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 animate-fade-in-up"
          style={{ animationDelay: "300ms" }}
        >
          <Button
            asChild
            size="lg"
            className="bg-[#6366f1] hover:bg-[#5558e8] text-white px-8 py-6 h-auto rounded-xl text-base font-medium transition-all hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] w-full sm:w-auto"
          >
            <Link href="/explorer">
              Try the Demo
              <svg
                viewBox="0 0 24 24"
                className="size-4 ml-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="bg-transparent text-[#a1a1aa] hover:text-[#fafafa] border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.16)] px-6 py-6 h-auto rounded-xl text-base font-medium w-full sm:w-auto"
          >
            <Link
              href="https://github.com/soneeee22000/tracegraph"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon className="size-4 mr-2" />
              View on GitHub
            </Link>
          </Button>
        </div>

        {/* Hero Visual - Knowledge Graph */}
        <div
          className="mt-20 max-w-5xl mx-auto animate-fade-in-up"
          style={{ animationDelay: "400ms" }}
        >
          <HeroGraph />
        </div>
      </div>
    </section>
  );
}
