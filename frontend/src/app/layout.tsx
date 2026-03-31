import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "TraceGraph — GraphRAG Citation Explorer",
  description:
    "Trace every AI answer back to its source. Interactive knowledge graph visualization with citation-grounded retrieval.",
  keywords: [
    "GraphRAG",
    "knowledge graph",
    "citation",
    "RAG",
    "AI traceability",
  ],
  authors: [{ name: "Pyae Sone" }],
  openGraph: {
    title: "TraceGraph — GraphRAG Citation Explorer",
    description:
      "Trace every AI answer back to its source. Interactive knowledge graph visualization with citation-grounded retrieval.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark`}
    >
      <body className="font-sans antialiased bg-[#09090b] text-[#fafafa]">
        {children}
      </body>
    </html>
  );
}
