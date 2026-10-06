import * as React from "react";

/**
 * Simplified one-colour marks for the technologies in the Skills section. They draw in `currentColor`
 * so they follow the black and white theme. To use an official logo instead, replace the matching
 * entry below with that logo's SVG paths (viewBox 0 0 48 48).
 */

const T = ({ x = 24, y = 31, size = 15, children }: { x?: number; y?: number; size?: number; children: string }) => (
  <text x={x} y={y} textAnchor="middle" fontFamily="Helvetica, Arial, sans-serif" fontWeight={800} fontSize={size} fill="var(--bg)">
    {children}
  </text>
);
const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 2.6, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const LOGOS: Record<string, React.ReactNode> = {
  React: (
    <>
      <circle cx="24" cy="24" r="3.6" fill="currentColor" />
      <ellipse cx="24" cy="24" rx="19" ry="7.5" {...stroke} />
      <ellipse cx="24" cy="24" rx="19" ry="7.5" transform="rotate(60 24 24)" {...stroke} />
      <ellipse cx="24" cy="24" rx="19" ry="7.5" transform="rotate(120 24 24)" {...stroke} />
    </>
  ),
  Vite: (
    <>
      <path d="M5 9l19 34L43 9z" {...stroke} />
      <path d="M28 4L17 25h7l-3 15 12-22h-8z" fill="currentColor" />
    </>
  ),
  Supabase: (
    <>
      <path d="M27 4L7 28h14l-1 16 21-25H27z" fill="currentColor" />
    </>
  ),
  "HTML & CSS": (
    <>
      <path d="M8 6h32l-3 31-13 5-13-5z" {...stroke} />
      <path d="M19 18l-5 5 5 5M29 18l5 5-5 5" {...stroke} />
    </>
  ),
  JavaScript: (
    <>
      <rect x="6" y="6" width="36" height="36" rx="5" fill="currentColor" />
      <T x={31} y={38} size={17}>JS</T>
    </>
  ),
  Angular: (
    <>
      <path d="M24 4l17 6-2.6 22.5L24 44 9.6 32.5 7 10z" fill="currentColor" />
      <T y={33} size={20}>A</T>
    </>
  ),
  Bootstrap: (
    <>
      <rect x="6" y="6" width="36" height="36" rx="9" {...stroke} />
      <path d="M19 14h8.5a5 5 0 010 10H19zm0 10h10a5.5 5.5 0 010 11H19z" fill="currentColor" />
    </>
  ),
  Dart: (
    <>
      <path d="M8 24L24 8h16v16L24 40 8 24z" fill="currentColor" />
      <path d="M16 24l8-8 8 8-8 8z" fill="var(--bg)" />
    </>
  ),
  PHP: (
    <>
      <ellipse cx="24" cy="24" rx="19" ry="12" {...stroke} />
      <text x="24" y="29" textAnchor="middle" fontFamily="Helvetica, Arial, sans-serif" fontWeight={800} fontSize="14" fill="currentColor">php</text>
    </>
  ),
  Python: (
    <>
      <path d="M24 5c-8 0-8 3.5-8 3.5V14h8v2H12S6 15.5 6 24s5 8.5 5 8.5h4v-5s0-5 5-5h8s5 .2 5-5V9s.8-4-9-4z" fill="currentColor" />
      <path d="M24 43c8 0 8-3.5 8-3.5V34h-8v-2h12s6 .5 6-8-5-8.5-5-8.5h-4v5s0 5-5 5h-8s-5-.2-5 5v8.5s-.8 4 9 4z" {...stroke} />
      <circle cx="19" cy="10.5" r="1.7" fill="var(--bg)" />
      <circle cx="29" cy="37.5" r="1.7" fill="currentColor" />
    </>
  ),
  Java: (
    <>
      <path d="M11 24h22v6a9 9 0 01-9 9h-4a9 9 0 01-9-9z" fill="currentColor" />
      <path d="M33 26h2a4 4 0 010 8h-3" {...stroke} />
      <path d="M17 19c-3-3 3-5 0-9M25 19c-3-3 3-5 0-9" {...stroke} />
      <path d="M8 43h28" {...stroke} />
    </>
  ),
  "Node.js": (
    <>
      <path d="M24 4l17 10v20L24 44 7 34V14z" {...stroke} />
      <path d="M17 31V17l14 14V17" {...stroke} />
    </>
  ),
  MySQL: (
    <>
      <ellipse cx="24" cy="12" rx="15" ry="6" {...stroke} />
      <path d="M9 12v12c0 3.3 6.7 6 15 6s15-2.7 15-6V12M9 24v12c0 3.3 6.7 6 15 6s15-2.7 15-6V24" {...stroke} />
    </>
  ),
  WordPress: (
    <>
      <circle cx="24" cy="24" r="19" {...stroke} />
      <path d="M12 16l7 18 5-14 5 14 7-18" {...stroke} />
    </>
  ),
  Figma: (
    <>
      <path d="M16 4h8v13h-8a6.5 6.5 0 010-13z" fill="currentColor" />
      <path d="M24 4h8a6.5 6.5 0 010 13h-8z" {...stroke} />
      <path d="M16 17h8v13h-8a6.5 6.5 0 010-13z" {...stroke} />
      <circle cx="30.5" cy="23.5" r="6.5" fill="currentColor" />
      <path d="M16 30h8v7a7 7 0 11-8-6.9z" fill="currentColor" />
    </>
  ),
  GitHub: (
    <>
      <circle cx="24" cy="24" r="19" {...stroke} />
      <circle cx="18" cy="16" r="3" {...stroke} />
      <circle cx="18" cy="33" r="3" {...stroke} />
      <circle cx="30" cy="20" r="3" {...stroke} />
      <path d="M18 19v11M30 23c0 5-7 3-12 7" {...stroke} />
    </>
  ),
  StackBlitz: <path d="M8 26L28 4l-5 16h17L20 44l5-18z" fill="currentColor" />,
  AWS: (
    <>
      <text x="24" y="25" textAnchor="middle" fontFamily="Helvetica, Arial, sans-serif" fontWeight={800} fontSize="21" fill="currentColor">aws</text>
      <path d="M8 33c10 7 22 7 32 0m-5-1.5l5 1.2-1.4 4.8" {...stroke} />
    </>
  ),
  "VS Code": (
    <>
      <path d="M34 5L15 22 8 17l-3 2v10l3 2 7-5 19 17 9-4V9z" fill="currentColor" />
      <path d="M34 15L22 24l12 9z" fill="var(--bg)" />
    </>
  ),
};

export function TechLogo({ name, size = 44, className }: { name: string; size?: number; className?: string }) {
  const art = LOGOS[name];
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} role="img" aria-label={`${name} logo`} className={className} style={{ color: "var(--ink)" }}>
      {art ?? (
        <>
          <rect x="6" y="6" width="36" height="36" rx="8" {...stroke} />
          <text x="24" y="30" textAnchor="middle" fontFamily="Helvetica, Arial, sans-serif" fontWeight={800} fontSize="18" fill="currentColor">{name.slice(0, 2)}</text>
        </>
      )}
    </svg>
  );
}

export default TechLogo;
