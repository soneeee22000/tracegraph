'use client'

import { useEffect, useRef, useState } from 'react'
import { Monitor, Server, Database, ArrowDown, ArrowLeftRight } from 'lucide-react'

function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.2) {
  const [isInView, setIsInView] = useState(false)
  
  useEffect(() => {
    const element = ref.current
    if (!element) return
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold }
    )
    
    observer.observe(element)
    return () => observer.disconnect()
  }, [ref, threshold])
  
  return isInView
}

export function Architecture() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef)

  return (
    <section ref={sectionRef} className="py-24 lg:py-32">
      <div className="mx-auto max-w-5xl px-6">
        {/* Section Header */}
        <div className={`text-center max-w-2xl mx-auto transition-all duration-700 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <span className="inline-block text-xs text-[#6366f1] uppercase tracking-widest font-medium mb-4">
            Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#fafafa] tracking-tight">
            Designed for clarity, built for scale.
          </h2>
        </div>

        {/* Architecture Diagram */}
        <div 
          className={`mt-16 transition-all duration-700 delay-150 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="relative p-8 rounded-2xl bg-[#111113] border border-[rgba(255,255,255,0.06)]">
            {/* Browser */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-3 px-6 py-4 rounded-xl bg-[#18181b] border border-[rgba(255,255,255,0.06)]">
                <Monitor className="size-5 text-[#a1a1aa]" />
                <span className="text-sm font-mono text-[#a1a1aa]">Browser</span>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center mb-8">
              <ArrowDown className="size-5 text-[#52525b]" />
            </div>

            {/* Frontend & Backend */}
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {/* Frontend */}
              <div className="p-6 rounded-xl bg-[#6366f1]/5 border border-[#6366f1]/20">
                <div className="flex items-center gap-2 mb-4">
                  <Monitor className="size-4 text-[#6366f1]" />
                  <span className="text-xs text-[#6366f1] uppercase tracking-wider font-medium">Frontend</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-2 border-b border-[rgba(255,255,255,0.06)]">
                    <span className="text-sm font-mono text-[#fafafa]">Next.js 16</span>
                    <span className="text-xs text-[#52525b]">App Router</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-[rgba(255,255,255,0.06)]">
                    <span className="text-sm font-mono text-[#fafafa]">React 19</span>
                    <span className="text-xs text-[#52525b]">Server Components</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm font-mono text-[#fafafa]">Force Graph</span>
                    <span className="text-xs text-[#52525b]">Visualization</span>
                  </div>
                </div>
              </div>

              {/* Backend */}
              <div className="p-6 rounded-xl bg-[#10b981]/5 border border-[#10b981]/20">
                <div className="flex items-center gap-2 mb-4">
                  <Server className="size-4 text-[#10b981]" />
                  <span className="text-xs text-[#10b981] uppercase tracking-wider font-medium">Backend</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-2 border-b border-[rgba(255,255,255,0.06)]">
                    <span className="text-sm font-mono text-[#fafafa]">FastAPI</span>
                    <span className="text-xs text-[#52525b]">REST API</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-[rgba(255,255,255,0.06)]">
                    <span className="text-sm font-mono text-[#fafafa]">LightRAG 1.4</span>
                    <span className="text-xs text-[#52525b]">Graph Engine</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm font-mono text-[#fafafa]">OpenAI API</span>
                    <span className="text-xs text-[#52525b]">LLM Provider</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Connection arrows */}
            <div className="hidden md:flex justify-center my-4">
              <ArrowLeftRight className="size-5 text-[#52525b]" />
            </div>

            {/* Arrow to storage */}
            <div className="flex justify-center my-6">
              <ArrowDown className="size-5 text-[#52525b]" />
            </div>

            {/* Storage */}
            <div className="flex justify-center">
              <div className="p-6 rounded-xl bg-[#52525b]/10 border border-[rgba(255,255,255,0.06)] max-w-xs w-full">
                <div className="flex items-center gap-2 mb-4">
                  <Database className="size-4 text-[#a1a1aa]" />
                  <span className="text-xs text-[#a1a1aa] uppercase tracking-wider font-medium">Storage</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 rounded-lg bg-[#18181b] border border-[rgba(255,255,255,0.06)] text-xs font-mono text-[#a1a1aa]">GraphML</span>
                  <span className="px-3 py-1.5 rounded-lg bg-[#18181b] border border-[rgba(255,255,255,0.06)] text-xs font-mono text-[#a1a1aa]">Vector DB</span>
                  <span className="px-3 py-1.5 rounded-lg bg-[#18181b] border border-[rgba(255,255,255,0.06)] text-xs font-mono text-[#a1a1aa]">KV Stores</span>
                </div>
              </div>
            </div>

            {/* Animated dashed lines (decorative) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(99,102,241,0.2)" />
                  <stop offset="100%" stopColor="rgba(16,185,129,0.2)" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
