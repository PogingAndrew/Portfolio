"use client";

import * as React from "react";
import { motion, type Transition } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Text that swaps with a copy of itself, one letter at a time.
 * <TextStaggerHover>
 *   <TextStaggerHoverActive>…</TextStaggerHoverActive>   the text visible at rest, it slides out
 *   <TextStaggerHoverHidden>…</TextStaggerHoverHidden>   the copy that slides in
 * </TextStaggerHover>
 * Drive both with `animate="hovered" | "initial"`. By default hovering the wrapper does it, and the
 * Slideshow passes `animate` explicitly to keep the active item switched on.
 */

type Direction = "top" | "bottom" | "left" | "right";

type Pose = { x: string | number; y: string | number };
const offset = (d: Direction): Pose =>
  d === "top"
    ? { x: 0, y: "-100%" }
    : d === "bottom"
      ? { x: 0, y: "100%" }
      : d === "left"
        ? { x: "-100%", y: 0 }
        : { x: "100%", y: 0 };

interface PartProps extends Omit<React.ComponentProps<"span">, "children"> {
  children: string;
  animation?: Direction;
  animate?: "initial" | "hovered";
  transition?: Transition;
  /** Seconds between each letter. */
  stagger?: number;
}

const HoverContext = React.createContext<boolean>(false);

export function TextStaggerHover({ className, children, ...props }: React.ComponentProps<"span">) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <HoverContext.Provider value={hovered}>
      <span
        className={cn("relative inline-block overflow-hidden align-bottom", className)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        {...props}
      >
        {children}
      </span>
    </HoverContext.Provider>
  );
}

function Letters({
  text,
  from,
  to,
  state,
  transition,
  stagger,
}: {
  text: string;
  from: Pose;
  to: Pose;
  state: "initial" | "hovered";
  transition?: Transition;
  stagger: number;
}) {
  return (
    <>
      {Array.from(text).map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block whitespace-pre"
          variants={{ initial: from, hovered: to }}
          initial="initial"
          animate={state}
          transition={{ ...transition, delay: i * stagger }}
        >
          {ch}
        </motion.span>
      ))}
    </>
  );
}

/** Visible at rest. Slides away in `animation` direction. */
export function TextStaggerHoverActive({
  children,
  className,
  animation = "top",
  animate,
  transition,
  stagger = 0.025,
  ...props
}: PartProps) {
  const hovered = React.useContext(HoverContext);
  const state = animate ?? (hovered ? "hovered" : "initial");
  return (
    <span className={cn("block", className)} {...props}>
      <span className="sr-only">{children}</span>
      <span aria-hidden="true">
        <Letters text={children} from={{ x: 0, y: 0 }} to={offset(animation)} state={state} transition={transition} stagger={stagger} />
      </span>
    </span>
  );
}

/** Waits off to the side, then slides into place. */
export function TextStaggerHoverHidden({
  children,
  className,
  animation = "bottom",
  animate,
  transition,
  stagger = 0.025,
  ...props
}: PartProps) {
  const hovered = React.useContext(HoverContext);
  const state = animate ?? (hovered ? "hovered" : "initial");
  return (
    <span aria-hidden="true" className={cn("absolute left-0 top-0 block", className)} {...props}>
      <Letters text={children} from={offset(animation)} to={{ x: 0, y: 0 }} state={state} transition={transition} stagger={stagger} />
    </span>
  );
}
