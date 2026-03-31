'use client'

import { useEffect, useRef, useState } from 'react'
import { Link2, Layers, SplitSquareVertical, Palette, Zap, FileText, ArrowRight } from 'lucide-react'

function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.1) {
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

interface Feature {
  badge: { text: string; color: string }
  title: string
  description: string
  icon: React.ReactNode
  visual: React.ReactNode
  size: 'large' | 'small'
}

const features: Feature[] = [
  {
    badge: { text: 'CORE FEATURE', color: 'indigo' },
    title: 'Full Citation Trail',
    description: 'Every AI answer traces back through entity chains to source documents. Click any citation to see the exact graph path that led to each claim.',
    icon: <Link2 className="size-5" />,
    size: 'large',
    visual: (
      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#18181b] border border-[rgba(255,255,255,0.06)] w-fit">
          <FileText className="size-4 text-[#f59e0b]" />
          <span className="text-xs text-[#a1a1aa]">clinical_guidelines.pdf</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-full text-xs bg-[#6366f1]/10 text-[#6366f1] border border-[#6366f1]/20">GraphRAG</span>
          <ArrowRight className="size-3 text-[#52525b]" />
          <span className="px-2.5 py-1 rounded-full text-xs bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20">Knowledge Graph</span>
          <ArrowRight className="size-3 text-[#52525b]" />
          <span className="px-2.5 py-1 rounded-full text-xs bg-[#3b82f6]/10 text-[#3b82f6] border border-[#3b82f6]/20">Structured Grounding</span>
        </div>
        <p className="text-sm text-[#52525b] italic">{'"GraphRAG reduces hallucinations by grounding responses..."'}</p>
      </div>
    ),
  },
  {
    badge: { text: 'FLEXIBLE', color: 'blue' },
    title: '4 Search Modes',
    description: 'Hybrid, Local, Global, or Naive — choose how to traverse the knowledge graph for each query.',
    icon: <Layers className="size-5" />,
    size: 'small',
    visual: (
      <div className="mt-4 space-y-2">
        {['Hybrid', 'Local', 'Global', 'Naive'].map((mode, i) => (
          <div key={mode} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs ${
            i === 0 ? 'bg-[#6366f1]/10 text-[#6366f1] border border-[#6366f1]/20' : 'bg-[#18181b] text-[#52525b] border border-[rgba(255,255,255,0.06)]'
          }`}>
            <span className={`size-1.5 rounded-full ${i === 0 ? 'bg-[#6366f1]' : 'bg-[#52525b]'}`} />
            {mode}
          </div>
        ))}
      </div>
    ),
  },
  {
    badge: { text: 'COMPARISON', color: 'amber' },
    title: 'Side-by-Side',
    description: 'Compare naive vector search against graph-enhanced retrieval on the same question.',
    icon: <SplitSquareVertical className="size-5" />,
    size: 'small',
    visual: (
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="p-3 rounded-lg bg-[#18181b] border border-[rgba(255,255,255,0.06)] opacity-50">
          <div className="text-xs text-[#52525b] mb-1">RAG</div>
          <div className="h-1 w-full bg-[#52525b]/30 rounded" />
          <div className="h-1 w-3/4 bg-[#52525b]/30 rounded mt-1" />
        </div>
        <div className="p-3 rounded-lg bg-[#6366f1]/5 border border-[#6366f1]/20">
          <div className="text-xs text-[#6366f1] mb-1">GraphRAG</div>
          <div className="h-1 w-full bg-[#6366f1]/40 rounded" />
          <div className="h-1 w-3/4 bg-[#6366f1]/40 rounded mt-1" />
        </div>
      </div>
    ),
  },
  {
    badge: { text: 'VISUAL', color: 'violet' },
    title: '6 Entity Types',
    description: 'Concepts, technologies, organizations, regulations, persons, and documents — each color-coded in the graph.',
    icon: <Palette className="size-5" />,
    size: 'small',
    visual: (
      <div className="mt-4 flex flex-wrap gap-2">
        {[
          { color: '#6366f1', label: 'Concept' },
          { color: '#3b82f6', label: 'Tech' },
          { color: '#10b981', label: 'Org' },
          { color: '#ef4444', label: 'Reg' },
          { color: '#8b5cf6', label: 'Person' },
          { color: '#f59e0b', label: 'Doc' },
        ].map((type) => (
          <div key={type.label} className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full" style={{ backgroundColor: type.color }} />
            <span className="text-xs text-[#52525b]">{type.label}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    badge: { text: 'INSTANT', color: 'green' },
    title: 'Works Offline',
    description: 'Ships with sample graph data. No API keys needed to explore the UI.',
    icon: <Zap className="size-5" />,
    size: 'small',
    visual: (
      <div className="mt-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-[#10b981]/10 border border-[#10b981]/20 w-fit">
        <span className="size-2 rounded-full bg-[#10b981] animate-pulse" />
        <span className="text-xs text-[#10b981] font-medium">Demo Mode Active</span>
      </div>
    ),
  },
]

const badgeColors: Record<string, string> = {
  indigo: 'bg-[rgba(99,102,241,0.08)] text-[#6366f1] border-[rgba(99,102,241,0.2)]',
  blue: 'bg-[rgba(59,130,246,0.08)] text-[#3b82f6] border-[rgba(59,130,246,0.2)]',
  amber: 'bg-[rgba(245,158,11,0.08)] text-[#f59e0b] border-[rgba(245,158,11,0.2)]',
  violet: 'bg-[rgba(139,92,246,0.08)] text-[#8b5cf6] border-[rgba(139,92,246,0.2)]',
  green: 'bg-[rgba(16,185,129,0.08)] text-[#10b981] border-[rgba(16,185,129,0.2)]',
}

export function FeaturesBento() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef)

  return (
    <section ref={sectionRef} id="features" className="py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <div className={`max-w-2xl transition-all duration-700 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <span className="inline-block text-xs text-[#6366f1] uppercase tracking-widest font-medium mb-4">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#fafafa] tracking-tight">
            Everything you need to trace AI reasoning.
          </h2>
          <p className="mt-4 text-lg text-[#a1a1aa] leading-relaxed">
            From entity extraction to citation trails, TraceGraph provides the complete toolkit for explainable AI.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`card-hover p-6 rounded-2xl bg-[#111113] border border-[rgba(255,255,255,0.06)] transition-all duration-500 ${
                feature.size === 'large' ? 'md:col-span-2' : ''
              } ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
            >
              {/* Badge */}
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider border ${
                badgeColors[feature.badge.color]
              }`}>
                {feature.badge.text}
              </span>

              {/* Content */}
              <div className="mt-4 flex items-start gap-3">
                <div className="shrink-0 p-2 rounded-lg bg-[#18181b] text-[#a1a1aa]">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#fafafa]">{feature.title}</h3>
                  <p className="mt-1 text-sm text-[#a1a1aa] leading-relaxed">{feature.description}</p>
                </div>
              </div>

              {/* Visual */}
              {feature.visual}

              {/* Gradient glow for large card */}
              {feature.size === 'large' && (
                <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-[rgba(99,102,241,0.05)] to-transparent rounded-2xl pointer-events-none" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
