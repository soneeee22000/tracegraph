# TraceGraph Landing Page — Design Plan & Full Specification

> World-class, Apple-level landing page for TraceGraph.
> Design reference: Linear, Vercel, Raycast, Supabase, Resend.

---

## Table of Contents

1. [Design Philosophy](#1-design-philosophy)
2. [Design System](#2-design-system)
3. [Page Structure](#3-page-structure)
4. [Section-by-Section Specification](#4-section-by-section-specification)
5. [Animations & Interactions](#5-animations--interactions)
6. [Responsive Behavior](#6-responsive-behavior)
7. [Performance Requirements](#7-performance-requirements)
8. [Content Copy (Final)](#8-content-copy-final)
9. [Technical Implementation Notes](#9-technical-implementation-notes)

---

## 1. Design Philosophy

### Core Principles

| Principle                    | Rule                                                                       |
| ---------------------------- | -------------------------------------------------------------------------- |
| **Dark-first**               | Hero and primary sections on `#09090b`. Light accents create depth.        |
| **One concept per viewport** | Each scroll stop delivers exactly one idea. Never compete for attention.   |
| **Show > Tell**              | The knowledge graph IS the hero. Animate it. Let the product sell itself.  |
| **Restrained luxury**        | No gradients on buttons. No decorative elements. Whitespace IS the design. |
| **Technical credibility**    | Show real code, real data, real graph structure. This is for builders.     |

### Design References

| Reference    | What to take                                                  |
| ------------ | ------------------------------------------------------------- |
| **Linear**   | Dark palette, bold typography, confidence in whitespace       |
| **Vercel**   | Geist font, monochrome + single accent, bento grid            |
| **Supabase** | Code-first hero, electric accent on dark, trust belt          |
| **Raycast**  | Product-embedded hero, glassmorphism nav                      |
| **Apple**    | Scroll-triggered reveals, one idea per fold, cinematic pacing |

---

## 2. Design System

### Colors

```
Background:
  --bg-primary:     #09090b     /* zinc-950, page background */
  --bg-surface:     #111113     /* card/section surfaces */
  --bg-elevated:    #18181b     /* hover states, raised cards */

Borders:
  --border-subtle:  rgba(255, 255, 255, 0.06)
  --border-default: rgba(255, 255, 255, 0.10)
  --border-hover:   rgba(255, 255, 255, 0.16)

Text:
  --text-primary:   #fafafa     /* headings, primary content */
  --text-secondary: #a1a1aa     /* body text, descriptions */
  --text-muted:     #52525b     /* labels, captions */

Accent:
  --accent:         #6366f1     /* indigo-500, primary brand */
  --accent-glow:    rgba(99, 102, 241, 0.15)  /* hero glow, hover states */
  --accent-surface: rgba(99, 102, 241, 0.08)  /* badge backgrounds */

Semantic:
  --green:          #10b981     /* emerald-500, success/organization nodes */
  --blue:           #3b82f6     /* blue-500, technology nodes */
  --amber:          #f59e0b     /* amber-500, warning/highlight */
  --red:            #ef4444     /* red-500, regulation nodes */
  --violet:         #8b5cf6     /* violet-500, method nodes */
```

### Typography

```
Font Family:
  --font-sans:  'Geist', system-ui, -apple-system, sans-serif
  --font-mono:  'Geist Mono', 'JetBrains Mono', monospace

Scale (rem):
  --text-xs:    0.75rem / 1rem       /* 12px, labels */
  --text-sm:    0.875rem / 1.25rem   /* 14px, captions */
  --text-base:  1rem / 1.625rem      /* 16px, body */
  --text-lg:    1.125rem / 1.75rem   /* 18px, large body */
  --text-xl:    1.25rem / 1.75rem    /* 20px, card titles */
  --text-2xl:   1.5rem / 2rem        /* 24px, section intros */
  --text-3xl:   1.875rem / 2.375rem  /* 30px, subsection heads */
  --text-4xl:   2.25rem / 2.5rem     /* 36px, section heads */
  --text-5xl:   3rem / 1.15          /* 48px, hero subheadline */
  --text-6xl:   3.75rem / 1.1        /* 60px, hero headline mobile */
  --text-7xl:   4.5rem / 1.05        /* 72px, hero headline */
  --text-8xl:   6rem / 1.0           /* 96px, hero headline large */

Tracking:
  Headings:   letter-spacing: -0.03em
  Body:       letter-spacing: 0
  Mono:       letter-spacing: -0.01em

Weights:
  400 — body text
  500 — buttons, labels, nav
  600 — card titles, subheadings
  700 — section headlines
  800 — hero headline
```

### Spacing

```
Section padding:    120px vertical (desktop), 80px (tablet), 60px (mobile)
Container:          max-width: 1152px (72rem), centered
Card border-radius: 16px (large), 12px (medium), 8px (small)
Card padding:       32px (large), 24px (medium)
Gap (grid):         24px (desktop), 16px (mobile)
```

### Effects

```
Glassmorphism (nav only):
  background: rgba(9, 9, 11, 0.7)
  backdrop-filter: blur(12px) saturate(180%)
  border-bottom: 1px solid var(--border-subtle)

Noise texture (hero background):
  opacity: 0.04
  blend-mode: overlay
  size: 200px tile

Hero glow:
  radial-gradient(ellipse 80% 50% at 50% -20%, var(--accent-glow), transparent)

Card hover:
  transform: translateY(-2px)
  border-color: var(--border-hover)
  transition: all 200ms cubic-bezier(0.16, 1, 0.3, 1)
```

---

## 3. Page Structure

```
┌──────────────────────────────────────────────┐
│  NAV (sticky, glassmorphism)                 │
│  Logo | Features  How it Works  API  GitHub  │
│                              [Get Started →] │
├──────────────────────────────────────────────┤
│                                              │
│  HERO                                        │
│    Eyebrow badge                             │
│    Headline (2 lines max)                    │
│    Subheadline (1-2 lines, muted)            │
│    [Try Demo →]  [View on GitHub]            │
│                                              │
│    ┌────────────────────────────────┐        │
│    │  Animated Knowledge Graph     │        │
│    │  (live force-directed graph   │        │
│    │   with glowing nodes)         │        │
│    └────────────────────────────────┘        │
│                                              │
├──────────────────────────────────────────────┤
│  TRUST BELT                                  │
│  "Built with" + scrolling logos:             │
│  LightRAG  FastAPI  Next.js  OpenAI  Neo4j   │
├──────────────────────────────────────────────┤
│                                              │
│  PROBLEM → SOLUTION                          │
│  Left: "The Problem" (vector RAG fails)      │
│  Right: "The Solution" (GraphRAG traces)     │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  METRICS BAR                                 │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐       │
│  │ 177  │ │ 124  │ │  12  │ │  4   │       │
│  │ Ent. │ │ Rel. │ │ Docs │ │Modes │       │
│  └──────┘ └──────┘ └──────┘ └──────┘       │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  FEATURES (Bento Grid)                       │
│  ┌──────────────────┐ ┌─────────┐           │
│  │ Citation Trail   │ │ 4 Search│           │
│  │ (large, visual)  │ │  Modes  │           │
│  ├─────────┬────────┤ ├─────────┤           │
│  │ Compare │ Entity │ │  Demo   │           │
│  │ RAG vs  │ Types  │ │  Mode   │           │
│  │ GraphRAG│        │ │         │           │
│  └─────────┴────────┘ └─────────┘           │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  HOW IT WORKS (3-step flow)                  │
│    1. Ingest → 2. Extract → 3. Query        │
│    (with connecting lines/arrows)            │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  LIVE CODE EXAMPLE                           │
│    Tabbed: Python | cURL | TypeScript        │
│    Shows real API call + response             │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  ARCHITECTURE DIAGRAM                        │
│    Visual system overview                    │
│    Frontend → Backend → Storage → LLM        │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  TECH STACK BELT                             │
│    Grid of tech logos with labels            │
│    Python, FastAPI, LightRAG, Next.js,       │
│    React, TypeScript, Tailwind, Docker       │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  CORPUS / USE CASES                          │
│    "What can you explore?"                   │
│    Cards for each domain: Healthcare,        │
│    AI Safety, Regulation, Drug Discovery     │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  FINAL CTA                                   │
│    "Trace the truth."                        │
│    Radial glow background                    │
│    [Get Started →]  [Read the Docs]          │
│                                              │
├──────────────────────────────────────────────┤
│  FOOTER                                      │
│  Logo | GitHub | Docs | MIT License          │
│  "Built by Pyae Sone"                        │
└──────────────────────────────────────────────┘
```

---

## 4. Section-by-Section Specification

### 4.1 Navigation

```
Layout:     Sticky top, z-50, glassmorphism background
Height:     64px
Container:  max-w-6xl centered
Left:       Logo icon (24px) + "TraceGraph" wordmark
Center:     Links — Features | How it Works | API | GitHub
Right:      [Get Started →] button (primary, small)

Mobile:     Hamburger menu, slide-in panel

Style:
  - Background: rgba(9, 9, 11, 0.7) + blur(12px)
  - Border-bottom: 1px solid var(--border-subtle)
  - Links: text-secondary, hover → text-primary
  - CTA: bg-accent, text-white, px-4 py-2, rounded-lg
  - Transition: opacity on scroll (0 → 1 after 100px)
```

### 4.2 Hero

```
Layout:     Centered, text-align center
Padding:    160px top, 80px bottom (desktop)

Content:
  1. Eyebrow badge:
     "Open Source · GraphRAG · MIT License"
     Style: bg-accent-surface, text-accent, text-xs, font-mono,
            px-3 py-1, rounded-full, border border-accent/20

  2. Headline:
     "If you can't trace it,
      you can't trust it."
     Style: text-7xl (72px), font-extrabold, tracking-tight,
            text-primary, max-w-4xl mx-auto

  3. Subheadline:
     "TraceGraph is a GraphRAG citation explorer that grounds every AI
      answer in a verifiable knowledge graph. See the entities, follow
      the relationships, trace the truth."
     Style: text-xl (20px), text-secondary, max-w-2xl mx-auto,
            mt-6, leading-relaxed

  4. CTA group:
     [Try the Demo →]     Primary: bg-accent, text-white, px-8 py-3.5,
                          rounded-xl, text-base font-medium,
                          hover: shadow-[0_0_30px_var(--accent-glow)]

     [View on GitHub]     Secondary: bg-transparent, text-secondary,
                          border border-border-default, px-6 py-3.5,
                          rounded-xl, hover: text-primary border-border-hover
     Gap: 16px, mt-10

  5. Hero visual (below CTAs):
     The animated knowledge graph.
     Container: max-w-5xl mx-auto, mt-20, rounded-2xl,
                border border-border-subtle, overflow-hidden,
                bg-bg-surface, aspect-[16/9]

     Content: Embedded react-force-graph-2d with sample data (24 nodes).
              Auto-rotating, subtle glow on nodes.
              Overlay gradient at edges (fade to bg-primary).

Background:
  - Radial gradient glow: centered top, accent color at 15% opacity
  - Noise texture overlay at 4% opacity
  - Optional: subtle grid pattern at 3% opacity
```

### 4.3 Trust Belt

```
Layout:     Full-width, horizontal scroll (infinite)
Padding:    48px vertical
Border:     Top and bottom: 1px solid var(--border-subtle)

Content:    "Built with" label (text-muted, text-xs, uppercase, tracking-widest)
            Logos (grayscale, 40% opacity, hover → 80%):
              LightRAG | FastAPI | Next.js | React | OpenAI |
              NetworkX | TypeScript | Tailwind CSS | Docker | Pydantic

Animation:  CSS translateX scroll, 30s linear infinite
            Pause on hover
```

### 4.4 Problem → Solution

```
Layout:     Two-column, 50/50 split (stacks on mobile)
Padding:    120px vertical
Container:  max-w-6xl

Left column — "The Problem":
  Eyebrow:   "TRADITIONAL RAG" (text-red, text-xs, uppercase, tracking-widest)
  Headline:  "Vector search finds text that looks like the answer."
             text-3xl, font-bold, text-primary
  Body:      "Standard RAG retrieves document chunks based on semantic similarity.
              It works for simple lookups but fails when questions require connecting
              information across multiple documents, understanding entity relationships,
              or providing auditable citation trails."
             text-base, text-secondary, mt-4, leading-relaxed
  Visual:    Simple diagram showing: Query → Vector DB → Chunks → LLM → "Answer"
             with a red "?" on the answer (no source trail)

Right column — "The Solution":
  Eyebrow:   "GRAPHRAG" (text-accent, text-xs, uppercase, tracking-widest)
  Headline:  "Graph traversal finds information that is related to the answer."
             text-3xl, font-bold, text-primary
  Body:      "GraphRAG builds a knowledge graph from your documents — entities,
              relationships, and community structures. Every answer traces back
              through the graph to its source, providing the citation chain that
              regulated industries demand."
             text-base, text-secondary, mt-4, leading-relaxed
  Visual:    Diagram showing: Query → Graph + Vectors → LLM → "Answer + Citations"
             with green checkmarks and entity chain trail

Divider:    Vertical line between columns (desktop), horizontal (mobile)
            1px solid var(--border-subtle)
```

### 4.5 Metrics Bar

```
Layout:     4-column grid, centered
Padding:    80px vertical
Background: var(--bg-surface), full-width
Border:     Top and bottom: 1px solid var(--border-subtle)

Metrics:
  ┌────────────────┬────────────────┬────────────────┬────────────────┐
  │     177        │     124        │      12        │       4        │
  │   Entities     │  Relationships │   Documents    │  Search Modes  │
  │   Extracted    │   Discovered   │   Ingested     │   Available    │
  └────────────────┴────────────────┴────────────────┴────────────────┘

Number style:  text-5xl (48px), font-extrabold, text-primary
               Counter animation: 0 → value on scroll into view (800ms, ease-out)
Label style:   text-sm, text-muted, uppercase, tracking-wider, mt-2
Card style:    text-center, py-8
```

### 4.6 Features Bento Grid

```
Layout:     Asymmetric grid (bento)
Padding:    120px vertical
Container:  max-w-6xl

Section header:
  Eyebrow:  "FEATURES" (text-accent, text-xs, uppercase, tracking-widest)
  Headline: "Everything you need to trace AI reasoning."
            text-4xl, font-bold, text-primary, mt-4
  Body:     "From entity extraction to citation trails, TraceGraph provides
             the complete toolkit for explainable AI."
            text-lg, text-secondary, mt-4, max-w-2xl

Grid layout (desktop):
  Row 1:  [──── Large card (2/3) ────] [── Small card (1/3) ──]
  Row 2:  [── Small (1/3) ──] [── Small (1/3) ──] [── Small (1/3) ──]

Cards:

  1. CITATION TRAIL (large, 2/3 width)
     Badge:    "CORE FEATURE" — bg-accent-surface, text-accent
     Title:    "Full Citation Trail"
     Body:     "Every AI answer traces back through entity chains to source
                documents. Click any citation to see the exact graph path
                that led to each claim."
     Visual:   Mock citation trail UI — source doc badge, chunk text,
               entity chain pills (Entity A → Entity B → Entity C)
     BG:       Subtle accent gradient glow in bottom-right corner

  2. SEARCH MODES (small, 1/3 width)
     Badge:    "FLEXIBLE" — bg-blue/10, text-blue
     Title:    "4 Search Modes"
     Body:     "Hybrid, Local, Global, or Naive — choose how to traverse
                the knowledge graph for each query."
     Visual:   4 small mode pills stacked vertically with icons

  3. RAG vs GRAPHRAG (small, 1/3 width)
     Badge:    "COMPARISON" — bg-amber/10, text-amber
     Title:    "Side-by-Side"
     Body:     "Compare naive vector search against graph-enhanced retrieval
                on the same question."
     Visual:   Split panel mock — left (dim) vs right (bright with citations)

  4. ENTITY CLASSIFICATION (small, 1/3 width)
     Badge:    "VISUAL" — bg-violet/10, text-violet
     Title:    "6 Entity Types"
     Body:     "Concepts, technologies, organizations, regulations, persons,
                and documents — each color-coded in the graph."
     Visual:   Row of 6 colored dots with labels

  5. DEMO MODE (small, 1/3 width)
     Badge:    "INSTANT" — bg-green/10, text-green
     Title:    "Works Offline"
     Body:     "Ships with sample graph data. No API keys needed to explore
                the UI."
     Visual:   "Demo Mode" status indicator mock

Card style:
  Background:     var(--bg-surface)
  Border:         1px solid var(--border-subtle)
  Border-radius:  16px
  Padding:        32px
  Hover:          translateY(-2px), border-color → var(--border-hover),
                  shadow: 0 8px 30px rgba(0,0,0,0.3)
  Transition:     200ms cubic-bezier(0.16, 1, 0.3, 1)
```

### 4.7 How It Works

```
Layout:     3-step horizontal flow (stacks vertically on mobile)
Padding:    120px vertical
Container:  max-w-5xl

Section header:
  Eyebrow:  "HOW IT WORKS"
  Headline: "From documents to traceable answers in three steps."

Steps:

  STEP 1: INGEST
    Icon:     Document stack icon (24px, text-accent)
    Number:   "01" (text-muted, font-mono, text-sm)
    Title:    "Ingest Documents"
    Body:     "Upload PDFs, text files, or any document corpus. TraceGraph
               chunks and embeds them for retrieval."
    Visual:   File icons flowing into a funnel

  ──── connecting line (dashed, var(--border-default)) ────→

  STEP 2: EXTRACT
    Icon:     Graph/network icon
    Number:   "02"
    Title:    "Extract Knowledge Graph"
    Body:     "LLMs automatically extract entities and relationships, building
               a structured knowledge graph with community hierarchies."
    Visual:   Small animated graph forming from scattered dots

  ──── connecting line ────→

  STEP 3: QUERY
    Icon:     Search/magnifying glass icon
    Number:   "03"
    Title:    "Query with Citations"
    Body:     "Ask questions in natural language. Get answers grounded in the
               knowledge graph with full citation trails."
    Visual:   Chat bubble with citation chips below

Step card style:
  Background: transparent
  Text-align: center
  Max-width:  280px each
```

### 4.8 Live Code Example

````
Layout:     Centered code block with tabs
Padding:    120px vertical
Background: var(--bg-surface), full-width
Container:  max-w-4xl

Section header:
  Eyebrow:  "DEVELOPER EXPERIENCE"
  Headline: "Query the knowledge graph in three lines."

Tabs:       [Python]  [cURL]  [TypeScript]
            Active tab: bg-accent, text-white
            Inactive:   text-muted, hover text-secondary

Python tab content:
```python
import httpx

response = httpx.post("http://localhost:8000/query", json={
    "query": "How does GraphRAG reduce hallucinations?",
    "mode": "hybrid"
})

result = response.json()
print(result["answer"])                    # Grounded AI response
print(result["citations"][0]["entity_chain"])  # ['GraphRAG', 'Knowledge Graph', 'Structured Grounding']
print(f"Sources: {len(result['citations'])}")  # Sources: 10
````

cURL tab content:

```bash
curl -X POST http://localhost:8000/query \
  -H "Content-Type: application/json" \
  -d '{"query": "How does GraphRAG reduce hallucinations?", "mode": "hybrid"}'
```

TypeScript tab content:

```typescript
const response = await fetch("http://localhost:8000/query", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    query: "How does GraphRAG reduce hallucinations?",
    mode: "hybrid",
  }),
});

const { answer, citations, graph } = await response.json();
console.log(`Answer: ${answer}`);
console.log(`Citations: ${citations.length} sources traced`);
console.log(
  `Graph: ${graph.nodes.length} entities, ${graph.edges.length} relations`,
);
```

Code block style:
Background: #0d1117 (GitHub dark)
Border: 1px solid var(--border-subtle)
Border-radius: 16px
Padding: 24px
Font: var(--font-mono), 14px
Line-height: 1.7
Syntax colors: GitHub Dark theme

```

### 4.9 Architecture Diagram

```

Layout: Full-width visual, centered
Padding: 120px vertical
Container: max-w-5xl

Section header:
Eyebrow: "ARCHITECTURE"
Headline: "Designed for clarity, built for scale."

Visual: Custom SVG or animated diagram showing:

┌─────────────────────────────────────────────────────┐
│ │
│ [Browser] │
│ ↓ │
│ ┌──────────────┐ ┌──────────────────┐ │
│ │ Next.js 16 │────→│ FastAPI │ │
│ │ React 19 │←────│ LightRAG 1.4 │ │
│ │ Force Graph │ │ OpenAI API │ │
│ └──────────────┘ └──────────────────┘ │
│ ↕ │
│ ┌──────────────┐ │
│ │ GraphML │ │
│ │ Vector DB │ │
│ │ KV Stores │ │
│ └──────────────┘ │
│ │
└─────────────────────────────────────────────────────┘

Style:
Boxes: bg-surface, border-subtle, rounded-xl
Lines: animated dashed stroke (CSS)
Labels: font-mono, text-sm
Colors: Frontend=accent, Backend=green, Storage=muted

```

### 4.10 Tech Stack Belt

```

Layout: 4x2 grid of tech logos
Padding: 80px vertical
Container: max-w-4xl

Items (each):
Logo: 32px icon (SVG, monochrome white at 50% opacity)
Label: Tech name (text-sm, text-secondary)
Hover: Logo opacity → 100%, label → text-primary

Grid:
Row 1: Python | FastAPI | LightRAG | OpenAI
Row 2: Next.js | React | TypeScript | Docker

```

### 4.11 Corpus / Use Cases

```

Layout: 4-column card grid
Padding: 120px vertical
Container: max-w-6xl

Section header:
Eyebrow: "USE CASES"
Headline: "Built for domains where accuracy is non-negotiable."

Cards:

1. HEALTHCARE AI
   Icon: Heart/pulse icon (text-red)
   Title: "Healthcare Decision Support"
   Body: "Knowledge graphs over clinical guidelines, drug interactions,
   and patient data. UMLS and SNOMED CT entity support."
   Docs: 3 corpus documents

2. VACCINE SAFETY
   Icon: Shield icon (text-green)
   Title: "Pharmacovigilance"
   Body: "VAERS adverse event analysis with cross-document reasoning.
   Brighton Collaboration case definition support."
   Docs: 2 corpus documents

3. REGULATORY COMPLIANCE
   Icon: Scale/balance icon (text-amber)
   Title: "EU AI Act Compliance"
   Body: "Article 13 transparency and Article 14 human oversight
   requirements met through built-in citation traceability."
   Docs: 2 corpus documents

4. CLINICAL RESEARCH
   Icon: Flask icon (text-blue)
   Title: "Clinical Trial Analysis"
   Body: "Multi-hop reasoning across trial data, drug efficacy studies,
   and safety profiles. ClinicalTrials.gov integration."
   Docs: 2 corpus documents

Card style: Same as bento cards but uniform size

```

### 4.12 Final CTA

```

Layout: Full-width, centered text
Padding: 160px vertical
Background: Radial gradient glow (accent at 20% opacity, centered)

Content:
Headline: "Trace the truth."
text-6xl (60px), font-extrabold, text-primary, tracking-tight

Subheadline: "Open source. MIT licensed. Ready to deploy."
text-xl, text-secondary, mt-6

CTAs:
[Get Started →] Primary (same as hero)
[Read the Docs] Secondary (same as hero)
Gap: 16px, mt-10

Background effect:

- Large radial gradient: accent-glow, 40% wide, centered
- Noise texture at 4%
- Optional: subtle particle animation (very few, slow-moving dots)

```

### 4.13 Footer

```

Layout: 3-column grid
Padding: 48px vertical
Border: Top: 1px solid var(--border-subtle)
Background: var(--bg-primary)

Left:
Logo icon + "TraceGraph" (text-lg, font-semibold)
"GraphRAG Citation Explorer" (text-sm, text-muted)

Center:
Links: Documentation | API Reference | GitHub | License
Style: text-sm, text-muted, hover → text-primary

Right:
"Built by Pyae Sone" (text-sm, text-muted)
Portfolio link (text-accent, underline on hover)

Bottom:
Separator line
"MIT License · 2026" (text-xs, text-muted, centered)

```

---

## 5. Animations & Interactions

### Scroll-Triggered Reveals

```

Every section element enters with:
Initial: opacity: 0, transform: translateY(16px)
Animate: opacity: 1, transform: translateY(0)
Duration: 500ms
Easing: cubic-bezier(0.16, 1, 0.3, 1) /_ spring feel _/
Trigger: When element is 20% into viewport

Staggered groups (cards, metrics):
Each child delays by 60ms
Example: 4 metrics = 0ms, 60ms, 120ms, 180ms

```

### Counter Animation (Metrics)

```

Trigger: When metrics section enters viewport
Duration: 800ms
Easing: ease-out
Method: requestAnimationFrame, lerp from 0 to target
Format: Whole numbers, no decimal

```

### Hero Graph Animation

```

Initial: Graph loads with nodes at random positions
Physics: d3-force simulation running (alpha decay 0.02)
Nodes: Subtle pulse animation on random nodes (every 3-5s)
scale(1) → scale(1.3) → scale(1), 600ms, with glow
Edges: Animated dash offset (flowing data particles)
Interaction: No user interaction needed, auto-plays
Performance: requestAnimationFrame, canvas-based, max 30 nodes for landing page

```

### Button Interactions

```

Primary CTA hover:
box-shadow: 0 0 30px var(--accent-glow)
transform: translateY(-1px)
transition: 200ms ease

Secondary CTA hover:
border-color: var(--border-hover)
color: var(--text-primary)
transition: 150ms ease

```

### Trust Belt Scroll

```

Animation: CSS translateX, infinite loop
Duration: 30s linear
Direction: left-to-right
Pause: on hover
Method: Duplicate logo set for seamless loop

```

---

## 6. Responsive Behavior

```

Breakpoints:
sm: 640px
md: 768px
lg: 1024px
xl: 1280px

Mobile (<768px):

- Hero headline: text-5xl (48px)
- Section padding: 60px vertical
- Bento grid: single column, all cards full-width
- Problem/Solution: stacks vertically
- How it Works: vertical with connecting lines
- Metrics: 2x2 grid
- Code block: horizontal scroll
- Nav: hamburger menu

Tablet (768-1024px):

- Hero headline: text-6xl (60px)
- Section padding: 80px vertical
- Bento grid: 2-column
- Metrics: 4-column (stays)

Desktop (>1024px):

- Full layout as specified
- Hero visual: full-width within container

```

---

## 7. Performance Requirements

```

Target:
LCP: < 1.5s
FID: < 50ms
CLS: < 0.05
TTI: < 2.0s

Font loading:

- Geist Sans + Geist Mono via next/font/google
- font-display: swap
- Preload critical weights (400, 700)

Images:

- All SVG for icons and logos
- Screenshots: WebP with PNG fallback, srcset for 1x/2x
- Hero graph: canvas-based, no image

JS:

- Force graph: dynamically imported (next/dynamic, ssr: false)
- Scroll animations: Intersection Observer (no heavy library)
- Counter animation: vanilla JS, requestAnimationFrame

CSS:

- Tailwind CSS 4 with CSS variables
- No runtime CSS-in-JS
- Critical CSS inlined by Next.js

```

---

## 8. Content Copy (Final)

### Nav
```

Links: Features | How it Works | API | GitHub
CTA: Get Started →

```

### Hero
```

Eyebrow: Open Source · GraphRAG · MIT License
Headline: If you can't trace it,
you can't trust it.
Subheadline: TraceGraph is a GraphRAG citation explorer that grounds every AI
answer in a verifiable knowledge graph. See the entities, follow
the relationships, trace the truth.
CTA Primary: Try the Demo →
CTA Secondary: View on GitHub

```

### Problem/Solution
```

Problem eyebrow: TRADITIONAL RAG
Problem headline: Vector search finds text that looks like the answer.
Problem body: Standard RAG retrieves document chunks based on semantic
similarity. It works for simple lookups but fails when
questions require connecting information across multiple
documents, understanding entity relationships, or providing
auditable citation trails.

Solution eyebrow: GRAPHRAG
Solution headline: Graph traversal finds information that is related to the answer.
Solution body: GraphRAG builds a knowledge graph from your documents — entities,
relationships, and community structures. Every answer traces back
through the graph to its source, providing the citation chain that
regulated industries demand.

```

### Metrics
```

177 Entities Extracted
124 Relationships Discovered
12 Documents Ingested
4 Search Modes Available

```

### Features
```

Section eyebrow: FEATURES
Section headline: Everything you need to trace AI reasoning.
Section body: From entity extraction to citation trails, TraceGraph provides
the complete toolkit for explainable AI.

```

### How it Works
```

Section eyebrow: HOW IT WORKS
Section headline: From documents to traceable answers in three steps.

Step 1: Ingest Documents
Upload PDFs, text files, or any document corpus.
TraceGraph chunks and embeds them for retrieval.

Step 2: Extract Knowledge Graph
LLMs automatically extract entities and relationships,
building a structured knowledge graph with community hierarchies.

Step 3: Query with Citations
Ask questions in natural language. Get answers grounded in the
knowledge graph with full citation trails.

```

### Code Example
```

Section eyebrow: DEVELOPER EXPERIENCE
Section headline: Query the knowledge graph in three lines.

```

### Architecture
```

Section eyebrow: ARCHITECTURE
Section headline: Designed for clarity, built for scale.

```

### Use Cases
```

Section eyebrow: USE CASES
Section headline: Built for domains where accuracy is non-negotiable.

```

### Final CTA
```

Headline: Trace the truth.
Subheadline: Open source. MIT licensed. Ready to deploy.
CTA Primary: Get Started →
CTA Secondary: Read the Docs

```

### Footer
```

Left: TraceGraph — GraphRAG Citation Explorer
Center: Documentation | API Reference | GitHub | License
Right: Built by Pyae Sone
Bottom: MIT License · 2026

```

---

## 9. Technical Implementation Notes

### File Structure
```

frontend/src/app/
├── (landing)/
│ ├── page.tsx # Landing page (server component shell)
│ └── layout.tsx # Landing-specific layout (no app chrome)
├── (app)/
│ ├── page.tsx # Main app (existing graph explorer)
│ └── layout.tsx # App layout with sidebar

```

### Key Components
```

src/components/landing/
├── nav.tsx # Sticky glassmorphism nav
├── hero.tsx # Hero + animated graph
├── trust-belt.tsx # Scrolling logo carousel
├── problem-solution.tsx # Two-column comparison
├── metrics-bar.tsx # Animated counter stats
├── features-bento.tsx # Bento grid feature cards
├── how-it-works.tsx # 3-step flow
├── code-example.tsx # Tabbed code blocks
├── architecture.tsx # System diagram
├── tech-stack.tsx # Tech logo grid
├── use-cases.tsx # Domain cards
├── final-cta.tsx # Bottom CTA with glow
└── footer.tsx # Footer

```

### Dependencies to Add
```

framer-motion # Scroll animations (useInView, motion.div) # OR: use Intersection Observer + CSS for zero-dep

```

### Route Strategy
```

/ → Landing page (marketing)
/app → Graph explorer (the actual app)
/docs → API documentation (redirect to FastAPI /docs)

```

### SEO
```

title: "TraceGraph — GraphRAG Citation Explorer"
description: "Trace every AI answer back to its source. Interactive knowledge
graph visualization with citation-grounded retrieval."
og:image: Social card (1200x630) showing the graph visualization
keywords: GraphRAG, knowledge graph, citation, RAG, AI traceability

```

```
