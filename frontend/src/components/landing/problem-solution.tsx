'use client'

import { useEffect, useRef, useState } from 'react'
import { AlertCircle, CheckCircle2, FileText, Database, Brain, Search, ArrowRight, Network } from 'lucide-react'

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

export function ProblemSolution() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef)

  return (
    <section ref={sectionRef} className="py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-0">
          {/* The Problem */}
          <div 
            className={`lg:pr-12 lg:border-r border-[rgba(255,255,255,0.06)] transition-all duration-700 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="inline-block text-xs text-[#ef4444] uppercase tracking-widest font-medium mb-4">
              Traditional RAG
            </span>
            
            <h2 className="text-2xl sm:text-3xl font-bold text-[#fafafa] tracking-tight leading-tight">
              Vector search finds text that looks like the answer.
            </h2>
            
            <p className="mt-4 text-base text-[#a1a1aa] leading-relaxed">
              Standard RAG retrieves document chunks based on semantic similarity. 
              It works for simple lookups but fails when questions require connecting 
              information across multiple documents, understanding entity relationships, 
              or providing auditable citation trails.
            </p>

            {/* Problem Diagram */}
            <div className="mt-8 p-6 rounded-xl bg-[#111113] border border-[rgba(255,255,255,0.06)]">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#18181b] border border-[rgba(255,255,255,0.06)]">
                  <Search className="size-4 text-[#a1a1aa]" />
                  <span className="text-sm text-[#a1a1aa]">Query</span>
                </div>
                <ArrowRight className="size-4 text-[#52525b]" />
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#18181b] border border-[rgba(255,255,255,0.06)]">
                  <Database className="size-4 text-[#a1a1aa]" />
                  <span className="text-sm text-[#a1a1aa]">Vector DB</span>
                </div>
                <ArrowRight className="size-4 text-[#52525b]" />
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#18181b] border border-[rgba(255,255,255,0.06)]">
                  <FileText className="size-4 text-[#a1a1aa]" />
                  <span className="text-sm text-[#a1a1aa]">Chunks</span>
                </div>
                <ArrowRight className="size-4 text-[#52525b]" />
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#18181b] border border-[rgba(255,255,255,0.06)]">
                  <Brain className="size-4 text-[#a1a1aa]" />
                  <span className="text-sm text-[#a1a1aa]">LLM</span>
                </div>
              </div>
              
              <div className="mt-4 flex items-center justify-center">
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#ef4444]/10 border border-[#ef4444]/20">
                  <AlertCircle className="size-5 text-[#ef4444]" />
                  <span className="text-sm text-[#ef4444]">Answer without source trail</span>
                </div>
              </div>
            </div>
          </div>

          {/* The Solution */}
          <div 
            className={`lg:pl-12 transition-all duration-700 delay-150 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="inline-block text-xs text-[#6366f1] uppercase tracking-widest font-medium mb-4">
              GraphRAG
            </span>
            
            <h2 className="text-2xl sm:text-3xl font-bold text-[#fafafa] tracking-tight leading-tight">
              Graph traversal finds information that is related to the answer.
            </h2>
            
            <p className="mt-4 text-base text-[#a1a1aa] leading-relaxed">
              GraphRAG builds a knowledge graph from your documents — entities, 
              relationships, and community structures. Every answer traces back 
              through the graph to its source, providing the citation chain that 
              regulated industries demand.
            </p>

            {/* Solution Diagram */}
            <div className="mt-8 p-6 rounded-xl bg-[#111113] border border-[rgba(255,255,255,0.06)]">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#18181b] border border-[rgba(255,255,255,0.06)]">
                  <Search className="size-4 text-[#6366f1]" />
                  <span className="text-sm text-[#a1a1aa]">Query</span>
                </div>
                <ArrowRight className="size-4 text-[#52525b]" />
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#6366f1]/10 border border-[#6366f1]/20">
                  <Network className="size-4 text-[#6366f1]" />
                  <span className="text-sm text-[#6366f1]">Graph + Vectors</span>
                </div>
                <ArrowRight className="size-4 text-[#52525b]" />
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#18181b] border border-[rgba(255,255,255,0.06)]">
                  <Brain className="size-4 text-[#a1a1aa]" />
                  <span className="text-sm text-[#a1a1aa]">LLM</span>
                </div>
              </div>
              
              <div className="mt-4 flex items-center justify-center">
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#10b981]/10 border border-[#10b981]/20">
                  <CheckCircle2 className="size-5 text-[#10b981]" />
                  <span className="text-sm text-[#10b981]">Answer + Citations + Entity Chain</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
