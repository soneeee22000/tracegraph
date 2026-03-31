'use client'

import { useEffect, useRef, useState } from 'react'
import { FileUp, Network, MessageSquare } from 'lucide-react'

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

const steps = [
  {
    number: '01',
    icon: <FileUp className="size-6 text-[#6366f1]" />,
    title: 'Ingest Documents',
    description: 'Upload PDFs, text files, or any document corpus. TraceGraph chunks and embeds them for retrieval.',
    visual: (
      <div className="mt-6 flex flex-col gap-2">
        {['clinical_guidelines.pdf', 'research_paper.txt', 'regulations.md'].map((file, i) => (
          <div 
            key={file}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#18181b] border border-[rgba(255,255,255,0.06)] text-xs text-[#a1a1aa]"
            style={{ opacity: 1 - i * 0.2 }}
          >
            <div className="size-1.5 rounded-full bg-[#6366f1]" />
            {file}
          </div>
        ))}
      </div>
    ),
  },
  {
    number: '02',
    icon: <Network className="size-6 text-[#6366f1]" />,
    title: 'Extract Knowledge Graph',
    description: 'LLMs automatically extract entities and relationships, building a structured knowledge graph with community hierarchies.',
    visual: (
      <div className="mt-6 relative h-32 flex items-center justify-center">
        {/* Animated graph visualization */}
        <svg viewBox="0 0 120 80" className="w-full h-full">
          {/* Edges */}
          <line x1="60" y1="40" x2="30" y2="20" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <line x1="60" y1="40" x2="90" y2="20" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <line x1="60" y1="40" x2="30" y2="60" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <line x1="60" y1="40" x2="90" y2="60" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <line x1="30" y1="20" x2="30" y2="60" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <line x1="90" y1="20" x2="90" y2="60" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          {/* Nodes */}
          <circle cx="60" cy="40" r="8" fill="#6366f1" />
          <circle cx="30" cy="20" r="5" fill="#3b82f6" />
          <circle cx="90" cy="20" r="5" fill="#10b981" />
          <circle cx="30" cy="60" r="5" fill="#f59e0b" />
          <circle cx="90" cy="60" r="5" fill="#8b5cf6" />
        </svg>
      </div>
    ),
  },
  {
    number: '03',
    icon: <MessageSquare className="size-6 text-[#6366f1]" />,
    title: 'Query with Citations',
    description: 'Ask questions in natural language. Get answers grounded in the knowledge graph with full citation trails.',
    visual: (
      <div className="mt-6 space-y-3">
        <div className="p-3 rounded-lg bg-[#18181b] border border-[rgba(255,255,255,0.06)]">
          <p className="text-xs text-[#a1a1aa]">How does GraphRAG reduce hallucinations?</p>
        </div>
        <div className="p-3 rounded-lg bg-[#6366f1]/5 border border-[#6366f1]/20">
          <p className="text-xs text-[#fafafa] mb-2">GraphRAG grounds responses in verified entity relationships...</p>
          <div className="flex gap-1.5">
            <span className="px-2 py-0.5 rounded text-[10px] bg-[#10b981]/10 text-[#10b981]">[1]</span>
            <span className="px-2 py-0.5 rounded text-[10px] bg-[#3b82f6]/10 text-[#3b82f6]">[2]</span>
            <span className="px-2 py-0.5 rounded text-[10px] bg-[#f59e0b]/10 text-[#f59e0b]">[3]</span>
          </div>
        </div>
      </div>
    ),
  },
]

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef)

  return (
    <section ref={sectionRef} id="how-it-works" className="py-24 lg:py-32">
      <div className="mx-auto max-w-5xl px-6">
        {/* Section Header */}
        <div className={`text-center max-w-2xl mx-auto transition-all duration-700 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <span className="inline-block text-xs text-[#6366f1] uppercase tracking-widest font-medium mb-4">
            How it Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#fafafa] tracking-tight">
            From documents to traceable answers in three steps.
          </h2>
        </div>

        {/* Steps */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 relative">
          {/* Connecting lines (desktop) */}
          <div className="hidden md:block absolute top-20 left-[20%] right-[20%] h-px border-t border-dashed border-[rgba(255,255,255,0.1)]" />
          
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`relative text-center transition-all duration-500 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Icon container */}
              <div className="relative inline-flex items-center justify-center size-16 rounded-2xl bg-[#111113] border border-[rgba(255,255,255,0.06)] mb-6">
                {step.icon}
                {/* Step number */}
                <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded text-[10px] font-mono text-[#52525b] bg-[#18181b] border border-[rgba(255,255,255,0.06)]">
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-[#fafafa]">{step.title}</h3>
              <p className="mt-2 text-sm text-[#a1a1aa] leading-relaxed max-w-[280px] mx-auto">
                {step.description}
              </p>

              {/* Visual */}
              {step.visual}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
