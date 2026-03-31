"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { GitHubIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it Works" },
  { href: "#api", label: "API" },
  {
    href: "https://github.com/soneeee22000/tracegraph",
    label: "GitHub",
    external: true,
  },
];

export function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass-nav border-b border-[rgba(255,255,255,0.06)]"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
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

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="text-sm text-[#a1a1aa] hover:text-[#fafafa] transition-colors duration-200 flex items-center gap-1.5"
            >
              {link.label === "GitHub" && <GitHubIcon className="size-4" />}
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Button
            asChild
            className="bg-[#6366f1] hover:bg-[#5558e8] text-white px-4 py-2 rounded-lg text-sm font-medium transition-all hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]"
          >
            <Link href="#demo">
              Get Started
              <svg
                viewBox="0 0 24 24"
                className="size-4 ml-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-[#a1a1aa] hover:text-[#fafafa] transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="size-5" />
          ) : (
            <Menu className="size-5" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-nav border-t border-[rgba(255,255,255,0.06)]">
          <div className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="text-sm text-[#a1a1aa] hover:text-[#fafafa] transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button
              asChild
              className="bg-[#6366f1] hover:bg-[#5558e8] text-white w-full mt-2"
            >
              <Link href="#demo">Get Started</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
