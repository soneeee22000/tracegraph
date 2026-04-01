"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.2) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return isInView;
}

export function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="demo"
      className="relative py-32 lg:py-40 overflow-hidden"
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 cta-glow pointer-events-none" />
      <div className="absolute inset-0 noise-bg pointer-events-none" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <h2
          className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#fafafa] tracking-tight transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Trace the truth.
        </h2>

        <p
          className={`mt-6 text-lg sm:text-xl text-[#a1a1aa] transition-all duration-700 delay-100 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Open source. MIT licensed. Ready to deploy.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 transition-all duration-700 delay-200 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Button
            asChild
            size="lg"
            className="bg-[#6366f1] hover:bg-[#5558e8] text-white px-8 py-6 h-auto rounded-xl text-base font-medium transition-all hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] w-full sm:w-auto"
          >
            <Link href="/explorer">
              Get Started
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
              href="https://tracegraph-ls2t.onrender.com/docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileText className="size-4 mr-2" />
              Read the Docs
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
