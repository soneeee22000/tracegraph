'use client'

import { useEffect, useRef, useState } from 'react'

interface Metric {
  value: number
  label: string
  suffix?: string
}

const metrics: Metric[] = [
  { value: 177, label: 'Entities Extracted' },
  { value: 124, label: 'Relationships Discovered' },
  { value: 12, label: 'Documents Ingested' },
  { value: 4, label: 'Search Modes Available' },
]

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

function CounterNumber({ value, isInView }: { value: number; isInView: boolean }) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    if (!isInView) return
    
    const duration = 800
    const startTime = Date.now()
    
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Ease out curve
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(easeOut * value))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }, [isInView, value])
  
  return <span className="counter-number">{count}</span>
}

export function MetricsBar() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef)

  return (
    <section 
      ref={sectionRef}
      className="py-16 lg:py-20 bg-[#111113] border-y border-[rgba(255,255,255,0.06)]"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <div 
              key={metric.label}
              className={`text-center transition-all duration-500 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 60}ms` }}
            >
              <div className="text-4xl sm:text-5xl font-extrabold text-[#fafafa] tracking-tight">
                <CounterNumber value={metric.value} isInView={isInView} />
                {metric.suffix}
              </div>
              <div className="mt-2 text-xs sm:text-sm text-[#52525b] uppercase tracking-wider">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
