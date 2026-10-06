"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { HalomotButton } from "@/components/ui/project-showcase-utils/halomot-button";

/**
 * ProjectShowcase, adapted from the 21st.dev component for this Vite + React project:
 *  - next/image  -> plain <img> with a fallback chain
 *  - styled-jsx  -> CSS in styles.css (`.ps-shot`)
 *  - one image per slide -> a STACK of page screenshots per project (Home, About, Info...)
 * The carousel slides between projects; the stack fans the pages of the active project.
 */

export interface ShowcasePage {
  /** Short name shown on the page switcher, e.g. "Home". */
  label: string;
  src: string;
  /** Tried in order if `src` fails to load (e.g. a generated placeholder). */
  fallbacks?: string[];
  alt?: string;
}

export interface ShowcaseProject {
  title: string;
  subtitle?: string;
  description?: string;
  /** The screenshots that get stacked. The first one starts on top. */
  pages: ShowcasePage[];
  meta?: { label: string; value: string }[];
  /** First link is the primary action. */
  links?: { label: string; href: string }[];
}

export interface ProjectShowcaseProps {
  projects: ShowcaseProject[];
  label?: string;
  autoplay?: boolean;
  autoplayMs?: number;
  /** Container width (px) below which the layout switches to one column. */
  desktopVersionBottomThreshold?: number;
  /** Width / height of the screenshot frame. */
  imageAspectRatio?: number;
  outerRounding?: string;
  innerRounding?: string;
  outlineColor?: string;
  hoverOutlineColor?: string;
  buttonInscriptions?: { previousButton: string; nextButton: string };
  halomotButtonGradient?: string;
  halomotButtonBackground?: string;
  halomotButtonTextColor?: string;
  halomotButtonHoverTextColor?: string;
  halomotButtonOuterBorderRadius?: string;
  halomotButtonInnerBorderRadius?: string;
  primaryButtonBackground?: string;
  primaryButtonTextColor?: string;
}

const STACK_VISIBLE = 4;
const pad = (n: number) => String(n).padStart(2, "0");

/** <img> that walks through its fallbacks if a file is missing. */
function ShotImage({ page, eager }: { page: ShowcasePage; eager: boolean }) {
  const chain = React.useMemo(() => [page.src, ...(page.fallbacks ?? [])], [page]);
  const [tried, setTried] = React.useState(0);
  React.useEffect(() => setTried(0), [chain]);
  return (
    <img
      src={chain[Math.min(tried, chain.length - 1)]}
      alt={page.alt ?? page.label}
      draggable={false}
      loading={eager ? "eager" : "lazy"}
      onError={() => setTried((t) => (t < chain.length - 1 ? t + 1 : t))}
      className="absolute inset-0 h-full w-full object-cover object-top"
    />
  );
}

interface StackProps {
  pages: ShowcasePage[];
  front: number;
  setFront: (i: number) => void;
  aspect: number;
  outer: string;
  inner: string;
  outline: string;
  outlineHover: string;
  compact: boolean;
  reduce: boolean;
}

/** The fanned pile of page screenshots. Click the top one (or a tab) to bring another forward. */
function PageStack({ pages, front, setFront, aspect, outer, inner, outline, outlineHover, compact, reduce }: StackProps) {
  const n = pages.length;
  const stepX = compact ? 14 : 24;
  const stepY = compact ? 12 : 20;
  return (
    <div className="ps-stage" style={{ paddingTop: stepY * (STACK_VISIBLE - 1), paddingRight: stepX * (STACK_VISIBLE - 1) }}>
      <div className="relative w-full" style={{ paddingTop: `${(1 / aspect) * 100}%` }}>
        {pages.map((page, i) => {
          const offset = (i - front + n) % n;
          const isFront = offset === 0;
          const side = offset % 2 === 1 ? 1 : -1;
          return (
            <motion.div
              key={page.src}
              className="absolute inset-0 origin-bottom-left"
              initial={false}
              animate={{
                x: offset * stepX,
                y: -offset * stepY,
                rotate: offset === 0 ? 0 : side * Math.min(offset, 3) * 1.6,
                scale: 1 - offset * 0.035,
                opacity: offset >= STACK_VISIBLE ? 0 : 1 - offset * 0.12,
              }}
              transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 230, damping: 26 }}
              style={{ zIndex: n - offset, pointerEvents: isFront ? "auto" : "none" }}
              aria-hidden={!isFront}
            >
              <button
                type="button"
                className="ps-shot"
                disabled={!isFront || n < 2}
                onClick={() => setFront((front + 1) % n)}
                aria-label={n > 1 ? `${page.label} page. Show the next page` : page.label}
                style={
                  {
                    "--ps-outline": outline,
                    "--ps-outline-hover": outlineHover,
                    borderRadius: outer,
                  } as React.CSSProperties
                }
              >
                <span className="ps-shot-inner" style={{ borderRadius: inner }}>
                  <ShotImage page={page} eager={offset < 2} />
                </span>
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export function ProjectShowcase({
  projects,
  label = "Projects",
  autoplay = false,
  autoplayMs = 7000,
  desktopVersionBottomThreshold = 880,
  imageAspectRatio = 1.37,
  outerRounding = "18.2px",
  innerRounding = "18px",
  outlineColor = "var(--line)",
  hoverOutlineColor = "var(--blue)",
  buttonInscriptions = { previousButton: "Previous", nextButton: "Next" },
  halomotButtonGradient = "linear-gradient(to right, #a123f4, #603dec)",
  halomotButtonBackground = "#111014",
  halomotButtonTextColor = "#fff",
  halomotButtonHoverTextColor,
  halomotButtonOuterBorderRadius = "6.34px",
  halomotButtonInnerBorderRadius = "6px",
  primaryButtonBackground,
  primaryButtonTextColor,
}: ProjectShowcaseProps) {
  const reduce = useReducedMotion() ?? false;
  const count = projects.length;

  // One state object so the slide direction and the index always change together.
  const [{ active, dir }, setSlide] = React.useState({ active: 0, dir: 1 });
  const [frontByProject, setFrontByProject] = React.useState<Record<number, number>>({});
  const [isMobileView, setIsMobileView] = React.useState(false);
  const [paused, setPaused] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);

  const go = React.useCallback(
    (to: number, direction?: number) =>
      setSlide((s) => {
        const next = ((to % count) + count) % count;
        if (next === s.active) return s;
        return { active: next, dir: direction ?? (next > s.active ? 1 : -1) };
      }),
    [count],
  );
  const next = React.useCallback(() => setSlide((s) => ({ active: (s.active + 1) % count, dir: 1 })), [count]);
  const prev = React.useCallback(() => setSlide((s) => ({ active: (s.active - 1 + count) % count, dir: -1 })), [count]);

  // Responsive layout is driven by the component's own width, not the viewport.
  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const measure = () => setIsMobileView(el.offsetWidth < desktopVersionBottomThreshold);
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    measure();
    return () => ro.disconnect();
  }, [desktopVersionBottomThreshold]);

  React.useEffect(() => {
    if (!autoplay || paused || reduce || count < 2) return;
    const id = setInterval(next, autoplayMs);
    return () => clearInterval(id);
  }, [autoplay, paused, reduce, count, next, autoplayMs]);

  if (count === 0) return null;
  const project = projects[active];
  const front = Math.min(frontByProject[active] ?? 0, project.pages.length - 1);
  const setFront = (i: number) => setFrontByProject((m) => ({ ...m, [active]: i }));
  const words = (project.description ?? "").split(" ");
  const primary = project.links?.[0];
  const rest = project.links?.slice(1) ?? [];

  const buttonCommon = {
    gradient: halomotButtonGradient,
    textColor: halomotButtonTextColor,
    hoverTextColor: halomotButtonHoverTextColor,
    outerBorderRadius: halomotButtonOuterBorderRadius,
    innerBorderRadius: halomotButtonInnerBorderRadius,
  };

  const slideVariants = {
    enter: (d: number) => ({ x: reduce ? 0 : d * 72, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: reduce ? 0 : d * -72, opacity: 0 }),
  };

  return (
    <div
      ref={rootRef}
      className="showcase w-full"
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.target !== e.currentTarget) return;
        if (e.key === "ArrowRight") { e.preventDefault(); next(); }
        if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="ps-viewport">
        <AnimatePresence mode="wait" initial={false} custom={dir}>
          <motion.div
            key={active}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: reduce ? 0 : 0.32, ease: "easeInOut" }}
            className="ps-slide"
            style={{ gridTemplateColumns: isMobileView ? "minmax(0,1fr)" : "minmax(0,1.15fr) minmax(0,1fr)", gap: isMobileView ? 28 : 56 }}
            aria-live="polite"
          >
            <div>
              <PageStack
                pages={project.pages}
                front={front}
                setFront={setFront}
                aspect={imageAspectRatio}
                outer={outerRounding}
                inner={innerRounding}
                outline={outlineColor}
                outlineHover={hoverOutlineColor}
                compact={isMobileView}
                reduce={reduce}
              />
              {project.pages.length > 1 && (
                <div className="ps-pages" role="tablist" aria-label={`${project.title} pages`}>
                  {project.pages.map((p, i) => (
                    <button
                      key={p.src}
                      type="button"
                      role="tab"
                      aria-selected={i === front}
                      className="ps-page-tab"
                      onClick={() => setFront(i)}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="ps-info">
              <div>
                <p className="ps-count mono">{pad(active + 1)} / {pad(count)}</p>
                <h3 className="ps-title">{project.title}</h3>
                {project.subtitle && <p className="ps-sub">{project.subtitle}</p>}
                {project.description && (
                  <p className="ps-desc">
                    {words.map((w, i) => (
                      <motion.span
                        key={`${active}-${i}`}
                        className="inline-block"
                        initial={reduce ? false : { filter: "blur(8px)", opacity: 0, y: 4 }}
                        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut", delay: 0.015 * i }}
                      >
                        {w}&nbsp;
                      </motion.span>
                    ))}
                  </p>
                )}
                {project.meta && project.meta.length > 0 && (
                  <dl className="ps-meta">
                    {project.meta.map((m) => (
                      <div key={m.label}>
                        <dt>{m.label}</dt>
                        <dd>{m.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="ps-controls" style={{ marginLeft: isMobileView ? 0 : undefined }}>
        <div className="ps-actions">
          {primary && (
            <HalomotButton
              inscription={primary.label}
              href={primary.href}
              newTab
              {...buttonCommon}
              backgroundColor={primaryButtonBackground ?? halomotButtonBackground}
              textColor={primaryButtonTextColor ?? halomotButtonTextColor}
              hoverTextColor={halomotButtonHoverTextColor ?? primaryButtonTextColor ?? halomotButtonTextColor}
            />
          )}
          {rest.map((l) => (
            <HalomotButton
              key={l.href}
              inscription={l.label}
              href={l.href}
              newTab
              {...buttonCommon}
              backgroundColor={halomotButtonBackground}
            />
          ))}
        </div>
        <div className="ps-nav">
          <HalomotButton inscription={`← ${buttonInscriptions.previousButton}`} onClick={prev} {...buttonCommon} backgroundColor={halomotButtonBackground} ariaLabel="Previous project" />
          <HalomotButton inscription={`${buttonInscriptions.nextButton} →`} onClick={next} {...buttonCommon} backgroundColor={halomotButtonBackground} ariaLabel="Next project" />
        </div>
      </div>

      <div className="ps-dots" role="group" aria-label="Choose a project">
        {projects.map((p, i) => (
          <button
            key={p.title}
            type="button"
            className="ps-dot"
            aria-label={p.title}
            aria-current={i === active}
            title={p.title}
            onClick={() => go(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default ProjectShowcase;
