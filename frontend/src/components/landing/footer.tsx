import Link from "next/link";
import { FileText, Book, Scale } from "lucide-react";
import { GitHubIcon } from "@/components/icons";

const footerLinks = [
  { label: "Documentation", href: "/docs", icon: <Book className="size-4" /> },
  {
    label: "API Reference",
    href: "/api",
    icon: <FileText className="size-4" />,
  },
  {
    label: "GitHub",
    href: "https://github.com/soneeee22000/tracegraph",
    icon: <GitHubIcon className="size-4" />,
    external: true,
  },
  { label: "License", href: "/license", icon: <Scale className="size-4" /> },
];

export function Footer() {
  return (
    <footer className="border-t border-[rgba(255,255,255,0.06)] bg-[#09090b]">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Logo & Description */}
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <div className="size-7 rounded-lg bg-[#6366f1] flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="size-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="3" />
                  <circle cx="6" cy="6" r="2" />
                  <circle cx="18" cy="6" r="2" />
                  <circle cx="6" cy="18" r="2" />
                  <circle cx="18" cy="18" r="2" />
                  <line x1="9" y1="9" x2="8" y2="8" />
                  <line x1="15" y1="9" x2="16" y2="8" />
                  <line x1="9" y1="15" x2="8" y2="16" />
                  <line x1="15" y1="15" x2="16" y2="16" />
                </svg>
              </div>
              <span className="font-semibold text-[#fafafa] text-lg tracking-tight">
                TraceGraph
              </span>
            </Link>
            <p className="mt-3 text-sm text-[#52525b]">
              GraphRAG Citation Explorer
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-x-8 gap-y-3 md:justify-center">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="flex items-center gap-2 text-sm text-[#52525b] hover:text-[#fafafa] transition-colors"
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </div>

          {/* Author */}
          <div className="md:text-right">
            <p className="text-sm text-[#52525b]">
              Built by{" "}
              <Link
                href="https://github.com/soneeee22000/tracegraph"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6366f1] hover:underline"
              >
                Pyae Sone
              </Link>
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[rgba(255,255,255,0.06)]">
          <p className="text-xs text-[#52525b] text-center">
            MIT License · 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
