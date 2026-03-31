'use client'

import { useEffect, useRef, useState } from 'react'
import { Heart, Shield, Scale, FlaskConical, FileText } from 'lucide-react'

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

const useCases = [
  {
    icon: <Heart className="size-5" />,
    iconColor: 'text-[#ef4444]',
    iconBg: 'bg-[#ef4444]/10',
    title: 'Healthcare Decision Support',
    description: 'Knowledge graphs over clinical guidelines, drug interactions, and patient data. UMLS and SNOMED CT entity support.',
    docs: 3,
  },
  {
    icon: <Shield className="size-5" />,
    iconColor: 'text-[#10b981]',
    iconBg: 'bg-[#10b981]/10',
    title: 'Pharmacovigilance',
    description: 'VAERS adverse event analysis with cross-document reasoning. Brighton Collaboration case definition support.',
    docs: 2,
  },
  {
    icon: <Scale className="size-5" />,
    iconColor: 'text-[#f59e0b]',
    iconBg: 'bg-[#f59e0b]/10',
    title: 'EU AI Act Compliance',
    description: 'Article 13 transparency and Article 14 human oversight requirements met through built-in citation traceability.',
    docs: 2,
  },
  {
    icon: <FlaskConical className="size-5" />,
    iconColor: 'text-[#3b82f6]',
    iconBg: 'bg-[#3b82f6]/10',
    title: 'Clinical Trial Analysis',
    description: 'Multi-hop reasoning across trial data, drug efficacy studies, and safety profiles. ClinicalTrials.gov integration.',
    docs: 2,
  },
]

export function UseCases() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef)

  return (
    <section ref={sectionRef} className="py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <div className={`text-center max-w-2xl mx-auto transition-all duration-700 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <span className="inline-block text-xs text-[#6366f1] uppercase tracking-widest font-medium mb-4">
            Use Cases
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#fafafa] tracking-tight">
            Built for domains where accuracy is non-negotiable.
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((useCase, index) => (
            <div
              key={useCase.title}
              className={`card-hover p-6 rounded-2xl bg-[#111113] border border-[rgba(255,255,255,0.06)] transition-all duration-500 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
            >
              {/* Icon */}
              <div className={`inline-flex items-center justify-center size-10 rounded-xl ${useCase.iconBg} ${useCase.iconColor}`}>
                {useCase.icon}
              </div>

              {/* Content */}
              <h3 className="mt-4 text-lg font-semibold text-[#fafafa]">{useCase.title}</h3>
              <p className="mt-2 text-sm text-[#a1a1aa] leading-relaxed">{useCase.description}</p>

              {/* Docs count */}
              <div className="mt-4 flex items-center gap-2 text-xs text-[#52525b]">
                <FileText className="size-3.5" />
                <span>{useCase.docs} corpus documents</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
