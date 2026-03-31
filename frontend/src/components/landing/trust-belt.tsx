'use client'

const techLogos = [
  { name: 'LightRAG', icon: 'L' },
  { name: 'FastAPI', icon: 'F' },
  { name: 'Next.js', icon: 'N' },
  { name: 'React', icon: 'R' },
  { name: 'OpenAI', icon: 'O' },
  { name: 'NetworkX', icon: 'X' },
  { name: 'TypeScript', icon: 'TS' },
  { name: 'Tailwind', icon: 'T' },
  { name: 'Docker', icon: 'D' },
  { name: 'Pydantic', icon: 'P' },
]

export function TrustBelt() {
  return (
    <section className="relative py-12 border-y border-[rgba(255,255,255,0.06)] overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 mb-6">
        <p className="text-xs text-[#52525b] uppercase tracking-widest text-center">
          Built with
        </p>
      </div>
      
      <div className="relative">
        {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#09090b] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#09090b] to-transparent z-10 pointer-events-none" />
        
        {/* Scrolling container */}
        <div className="flex animate-scroll-left">
          {/* Double the logos for seamless loop */}
          {[...techLogos, ...techLogos].map((tech, i) => (
            <div
              key={`${tech.name}-${i}`}
              className="flex items-center gap-3 px-8 shrink-0 group cursor-default"
            >
              <div className="size-10 rounded-lg bg-[#18181b] border border-[rgba(255,255,255,0.06)] flex items-center justify-center text-sm font-mono text-[#52525b] group-hover:text-[#a1a1aa] group-hover:border-[rgba(255,255,255,0.1)] transition-all">
                {tech.icon}
              </div>
              <span className="text-sm text-[#52525b] group-hover:text-[#a1a1aa] transition-colors whitespace-nowrap">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
