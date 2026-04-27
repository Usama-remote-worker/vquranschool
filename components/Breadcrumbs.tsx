"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export function Breadcrumbs() {
  const pathname = usePathname();
  
  if (pathname === "/") return null;
  if (pathname.startsWith("/dashboard")) return null;

  const pathSegments = pathname.split("/").filter((segment) => segment !== "");
  
  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
    const label = segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
    
    return { label, href, active: index === pathSegments.length - 1 };
  });

  // Schema.org BreadcrumbList
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://vquranschool.com"
      },
      ...breadcrumbs.map((crumb, i) => ({
        "@type": "ListItem",
        "position": i + 2,
        "name": crumb.label,
        "item": `https://vquranschool.com${crumb.href}`
      }))
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="bg-slate-50 border-b border-slate-100 py-3">
        <div className="container mx-auto px-4 flex items-center gap-2 text-sm text-slate-500 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <Link 
            href="/" 
            className="flex items-center gap-1 hover:text-blue-600 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span className="sr-only">Home</span>
          </Link>
          
          {breadcrumbs.map((crumb, i) => (
            <div key={crumb.href} className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
              <Link
                href={crumb.href}
                className={cn(
                  "hover:text-blue-600 transition-colors",
                  crumb.active ? "text-blue-600 font-bold pointer-events-none" : ""
                )}
                aria-current={crumb.active ? "page" : undefined}
              >
                {crumb.label}
              </Link>
            </div>
          ))}
        </div>
      </nav>
    </>
  );
}
