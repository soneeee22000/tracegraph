'use client'

import { useEffect, useRef, useState } from 'react'

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

const techStack = [
  { name: 'Python', icon: 'Py' },
  { name: 'FastAPI', icon: 'FA' },
  { name: 'LightRAG', icon: 'LR' },
  { name: 'OpenAI', icon: 'OA' },
  { name: 'Next.js', icon: 'Nx' },
  { name: 'React', icon: 'Re' },
  { name: 'TypeScript', icon: 'TS' },
  { name: 'Docker', icon: 'Dk' },
]

export function TechStack() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef)

  return (
    <section ref={sectionRef} className="py-16 lg:py-20 border-y border-[rgba(255,255,255,0.06)]">
      <div className="mx-auto max-w-4xl px-6">
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
          {techStack.map((tech, index) => (
            <div
              key={tech.name}
              className={`group flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-500 hover:bg-[#111113] ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="size-12 rounded-xl bg-[#18181b] border border-[rgba(255,255,255,0.06)] flex items-center justify-center text-sm font-mono text-[#52525b] group-hover:text-[#fafafa] group-hover:border-[rgba(255,255,255,0.1)] transition-all">
                {tech.icon}
              </div>
              <span className="text-xs text-[#52525b] group-hover:text-[#a1a1aa] transition-colors text-center">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
