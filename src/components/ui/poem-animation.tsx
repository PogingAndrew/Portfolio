"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * 3D "sliding letters" hero, adapted from the PoemAnimation snippet.
 * Instead of poem HTML on a cube, the visitor's name slides along three walls of a room that sways
 * gently in perspective, with a cut-out portrait standing in the middle. Styles live in styles.css (.pa-*).
 *
 * The room is a real 3D box (ceiling, floor, three walls). Its size is derived from the container, so the
 * corners of the walls stay in view on every screen shape.
 */

const ROWS = 3;

/** Slow drift, in stage units per second. Each row has its own speed; all three walls share it. */
const SPEEDS = [34, 26, 40];

/**
 * One wall's slice of a single text strip that runs left wall -> back wall -> right wall.
 * `offset` is where this wall starts along the strip and `unit` is the exact width of one repeat of the text,
 * so the three walls stay in step and a letter leaving one wall appears on the next with no gap or skip.
 */
function Rows({ text, offset, wallW, unit }: { text: string; offset: number; wallW: number; unit: number }) {
  const copies = Math.ceil(wallW / unit) + 2;
  return (
    <>
      {Array.from({ length: ROWS }, (_, r) => (
        <div key={r} className={cn("pa-row", r % 2 === 1 && "pa-outline")}>
          <div
            className="pa-track"
            style={
              {
                "--u": `${unit}px`,
                marginLeft: -(offset % unit),
                animationDuration: `${unit / SPEEDS[r % SPEEDS.length]}s`,
                animationDelay: `-${r * 9}s`,
                animationDirection: r % 2 === 1 ? "reverse" : "normal",
              } as React.CSSProperties
            }
          >
            {Array.from({ length: copies }, (_, k) => (
              <span key={k}>
                {text}
                <i>•</i>
              </span>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

export interface PoemAnimationProps {
  /** The text that slides across the walls. */
  text: string;
  /** Transparent PNG/WebP of the person. The bottom edge should fade out. */
  imageUrl: string;
  /** Accessible description of the whole graphic. */
  label: string;
  className?: string;
}

export function PoemAnimation({ text, imageUrl, label, className }: PoemAnimationProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  // s = px per stage unit, wu/hu = container size in stage units.
  const [dims, setDims] = React.useState({ s: 1, wu: 1000, hu: 562 });

  React.useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth || 1;
      const h = el.clientHeight || 1;
      const wu = w >= h * 1.3 ? 1000 : 640; // narrower reference width on tall/phone screens
      const s = w / wu;
      setDims({ s, wu, hu: h / s });
    };
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    measure();
    return () => ro.disconnect();
  }, []);

  const { s, wu, hu } = dims;
  const depth = wu * 0.65;
  const span = depth + 100; // side walls are 100 units longer than the room so they run past the screen edge
  const backW = wu * 1.12;

  // Exact width of one repeat of the text (sub-pixel), measured from a hidden copy, re-measured once fonts load.
  const measureRef = React.useRef<HTMLSpanElement>(null);
  const [unit, setUnit] = React.useState(1300);
  React.useEffect(() => {
    let alive = true;
    const measure = () => {
      const w = measureRef.current?.getBoundingClientRect().width;
      if (alive && w && s) setUnit(w / s);
    };
    measure();
    document.fonts?.ready.then(measure);
    return () => { alive = false; };
  }, [s, text]);
  const room = {
    "--rw": `${wu * 1.12}px`, // a little larger than the view, so the sway never shows a gap
    "--rh": `${hu * 1.12}px`,
    "--rd": `${depth}px`,
  } as React.CSSProperties;

  return (
    <div ref={wrapRef} className={cn("pa", className)} role="img" aria-label={label}>
      <div
        className="pa-stage"
        aria-hidden="true"
        style={{ ...room, width: wu, height: hu, transform: `translate(-50%, -50%) scale(${s})` }}
      >
        <div className="pa-scene" style={{ perspective: wu * 0.9 }}>
          <div className="pa-look">
          <div className="pa-room">
            <div className="pa-face pa-ceil" />
            <div className="pa-face pa-floor" />
            <div className="pa-face pa-wall pa-left"><Rows text={text} offset={0} wallW={span} unit={unit} /></div>
            <div className="pa-face pa-wall pa-back"><Rows text={text} offset={span} wallW={backW} unit={unit} /></div>
            <div className="pa-face pa-wall pa-right"><Rows text={text} offset={span + backW} wallW={span} unit={unit} /></div>
          </div>
          </div>
        </div>
        <div className="pa-glow" />
        <div className="pa-row pa-measure" aria-hidden="true"><div className="pa-track"><span ref={measureRef}>{text}<i>•</i></span></div></div>
      </div>
      <img className="pa-person" src={imageUrl} alt="" draggable={false} onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")} />
    </div>
  );
}

export default PoemAnimation;
