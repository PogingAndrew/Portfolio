"use client";

import * as React from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  TextStaggerHover,
  TextStaggerHoverActive,
  TextStaggerHoverHidden,
} from "@/components/ui/text-stagger-hover";

/* Adapted from the 21st.dev slideshow: "motion/react" -> "framer-motion" (the package this project has),
   and indicators also respond to click, focus and keyboard so touch and keyboard users can switch slides. */

interface SlideshowContextValue {
  activeSlide: number;
  changeSlide: (index: number) => void;
}

const SlideshowContext = React.createContext<SlideshowContextValue | undefined>(undefined);

export function useSlideshowContext() {
  const context = React.useContext(SlideshowContext);
  if (context === undefined) {
    throw new Error("useSlideshowContext must be used within a Slideshow");
  }
  return context;
}

export const Slideshow = ({ children, ...props }: React.ComponentProps<"div">) => {
  const [activeSlide, setActiveSlide] = React.useState<number>(0);
  const changeSlide = React.useCallback((index: number) => setActiveSlide(index), []);
  return (
    <SlideshowContext.Provider value={{ activeSlide, changeSlide }}>
      <div {...props}>{children}</div>
    </SlideshowContext.Provider>
  );
};

export const SlideshowIndicator = ({
  index,
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & { index: number; children: string }) => {
  const { activeSlide, changeSlide } = useSlideshowContext();
  const isActive = activeSlide === index;
  const select = () => changeSlide(index);
  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
      className={cn("relative inline-block origin-bottom overflow-hidden", className)}
      {...props}
      onMouseEnter={select}
      onFocus={select}
      onClick={select}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          select();
        }
      }}
    >
      <TextStaggerHover className="cursor-pointer text-4xl font-bold uppercase tracking-tighter">
        <TextStaggerHoverActive
          className="opacity-25"
          animation="top"
          animate={isActive ? "hovered" : "initial"}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {children}
        </TextStaggerHoverActive>
        <TextStaggerHoverHidden
          animation="bottom"
          animate={isActive ? "hovered" : "initial"}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {children}
        </TextStaggerHoverHidden>
      </TextStaggerHover>
    </div>
  );
};

/* The outgoing slide fades out quickly while the incoming one waits a moment and then wipes in, so the two
   never show their text on top of each other. */
export const clipPathVariants = {
  visible: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    opacity: 1,
    transition: { ease: [0.33, 1, 0.68, 1] as const, duration: 0.6, delay: 0.2 },
  },
  hidden: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0px)",
    opacity: 0,
    transition: { ease: "easeOut" as const, duration: 0.18 },
  },
};

export const SlideshowImageContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("grid overflow-hidden *:col-start-1 *:col-end-1 *:row-start-1 *:row-end-1 *:size-full", className)}
      {...props}
    />
  ),
);
SlideshowImageContainer.displayName = "SlideshowImageContainer";

export const SlideshowImageWrap = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div"> & { index: number }>(
  ({ index, className, ...props }, ref) => {
    const { activeSlide } = useSlideshowContext();
    return (
      <motion.div
        className={cn("inline-block align-middle", className)}
        variants={clipPathVariants}
        animate={activeSlide === index ? "visible" : "hidden"}
        aria-hidden={activeSlide !== index}
        ref={ref}
        {...props}
      />
    );
  },
);
SlideshowImageWrap.displayName = "SlideshowImageWrap";

export default Slideshow;
