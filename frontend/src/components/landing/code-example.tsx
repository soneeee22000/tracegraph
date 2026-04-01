"use client";

import { useEffect, useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

const codeExamples = {
  python: `import httpx

response = httpx.post("https://tracegraph-ls2t.onrender.com/query", json={
    "query": "How does GraphRAG reduce hallucinations?",
    "mode": "hybrid"
})

result = response.json()
print(result["answer"])                    # Grounded AI response
print(result["citations"][0]["entity_chain"])  # ['GraphRAG', 'Knowledge Graph', 'Structured Grounding']
print(f"Sources: {len(result['citations'])}")  # Sources: 10`,

  curl: `curl -X POST https://tracegraph-ls2t.onrender.com/query \\
  -H "Content-Type: application/json" \\
  -d '{"query": "How does GraphRAG reduce hallucinations?", "mode": "hybrid"}'`,

  typescript: `const response = await fetch("https://tracegraph-ls2t.onrender.com/query", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    query: "How does GraphRAG reduce hallucinations?",
    mode: "hybrid",
  }),
});

const { answer, citations, graph } = await response.json();
console.log(\`Answer: \${answer}\`);
console.log(\`Citations: \${citations.length} sources traced\`);
console.log(\`Graph: \${graph.nodes.length} entities, \${graph.edges.length} relations\`);`,
};

function SyntaxHighlight({
  code,
  language,
}: {
  code: string;
  language: string;
}) {
  // Simple syntax highlighting
  const highlightCode = (code: string, lang: string) => {
    let html = code
      // Escape HTML
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Comments
    html = html.replace(/(#.*$)/gm, '<span class="text-[#6a737d]">$1</span>');
    html = html.replace(
      /(\/\/.*$)/gm,
      '<span class="text-[#6a737d]">$1</span>',
    );

    // Strings
    html = html.replace(/("[^"]*")/g, '<span class="text-[#9ecbff]">$1</span>');
    html = html.replace(/('[^']*')/g, '<span class="text-[#9ecbff]">$1</span>');
    html = html.replace(/(`[^`]*`)/g, '<span class="text-[#9ecbff]">$1</span>');

    // Keywords
    const keywords =
      lang === "python"
        ? ["import", "from", "def", "return", "print", "json", "await", "async"]
        : lang === "typescript"
          ? ["const", "let", "await", "async", "return", "function"]
          : ["curl"];

    keywords.forEach((kw) => {
      const regex = new RegExp(`\\b(${kw})\\b`, "g");
      html = html.replace(regex, '<span class="text-[#f97583]">$1</span>');
    });

    // Functions/methods
    html = html.replace(/(\w+)\(/g, '<span class="text-[#b392f0]">$1</span>(');

    // Numbers
    html = html.replace(/\b(\d+)\b/g, '<span class="text-[#79b8ff]">$1</span>');

    return html;
  };

  return (
    <pre className="text-sm font-mono leading-7 overflow-x-auto">
      <code
        dangerouslySetInnerHTML={{ __html: highlightCode(code, language) }}
      />
    </pre>
  );
}

export function CodeExample() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="api"
      className="py-24 lg:py-32 bg-[#111113] border-y border-[rgba(255,255,255,0.06)]"
    >
      <div className="mx-auto max-w-4xl px-6">
        {/* Section Header */}
        <div
          className={`text-center max-w-2xl mx-auto transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-block text-xs text-[#6366f1] uppercase tracking-widest font-medium mb-4">
            Developer Experience
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#fafafa] tracking-tight">
            Query the knowledge graph in three lines.
          </h2>
        </div>

        {/* Code Block */}
        <div
          className={`mt-12 transition-all duration-700 delay-150 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Tabs defaultValue="python" className="w-full">
            <TabsList className="w-full justify-start bg-[#0d1117] border border-[rgba(255,255,255,0.06)] rounded-t-2xl rounded-b-none p-1">
              <TabsTrigger
                value="python"
                className="data-[state=active]:bg-[#6366f1] data-[state=active]:text-white text-[#52525b] rounded-lg px-4 py-1.5 text-sm"
              >
                Python
              </TabsTrigger>
              <TabsTrigger
                value="curl"
                className="data-[state=active]:bg-[#6366f1] data-[state=active]:text-white text-[#52525b] rounded-lg px-4 py-1.5 text-sm"
              >
                cURL
              </TabsTrigger>
              <TabsTrigger
                value="typescript"
                className="data-[state=active]:bg-[#6366f1] data-[state=active]:text-white text-[#52525b] rounded-lg px-4 py-1.5 text-sm"
              >
                TypeScript
              </TabsTrigger>
            </TabsList>

            <div className="code-block rounded-t-none rounded-b-2xl border border-t-0 border-[rgba(255,255,255,0.06)] p-6">
              <TabsContent value="python" className="mt-0">
                <SyntaxHighlight code={codeExamples.python} language="python" />
              </TabsContent>
              <TabsContent value="curl" className="mt-0">
                <SyntaxHighlight code={codeExamples.curl} language="bash" />
              </TabsContent>
              <TabsContent value="typescript" className="mt-0">
                <SyntaxHighlight
                  code={codeExamples.typescript}
                  language="typescript"
                />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
